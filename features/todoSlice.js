import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { firebaseConfig } from "../Secrets";

import { initializeApp } from 'firebase/app';

import { getFirestore, collection, query,
  doc, getDocs, updateDoc, addDoc, deleteDoc,
} from "firebase/firestore";


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const addItemPlusFirebase = createAsyncThunk(
  'todofirebase/addItem',
  async (todoText) => {
    try {
      const newTodo = {
        text: todoText,
      }

      const todoCollRef = collection(db, 'todos');
      const todoSnap = await addDoc(todoCollRef, newTodo);
      newTodo.key = todoSnap.id;
      return newTodo;
    } catch (error) {
      throw error;
    }
  }
)

export const getItemsFromFirebase = createAsyncThunk(
 'todofirebase/getItems',
  async () => {
   console.log('GET ITEMS!')
   try {
     const initList = [];
     const collRef = collection(db, 'todos');
     const q = query(collRef);
     const querySnapshot = await getDocs(q);
     querySnapshot.docs.forEach((docSnapshot)=>{
       const todo = docSnapshot.data();
       console.log(todo);
       todo.key = docSnapshot.id;
       initList.push(todo);
     });
     console.log('INIT LIST', initList)
     return initList;
   } catch (error) {
     throw error;
   }

  }
)

export const deleteItemFromFirebase = createAsyncThunk(
  'todofirebase/deleteItem',
  async (todo) => {
    try {
      const docToDelete = doc(db, 'todos', todo.key);
      await deleteDoc(docToDelete);
      return todo;
    } catch (error) {
      throw error;
    }
  }
)

export const updateItemFromFirebase = createAsyncThunk(
  'todofirebase/updateItem',
  async ({item, inputText}) => {
    const newTodo = { ...item, text: inputText};
    const doctoUpdate = doc(db, 'todos', todo.key);
    await updateDoc(doctoUpdate, {text: newText});
    return newTodo;
  }

)

export const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    value: [
      { text: 'Get costume', key: Date.now() },
      { text: 'Get candy', key: Date.now() + 1}
    ],
  },

  extraReducers: (builder) => {
    builder.addCase(addItemPlusFirebase.fulfilled, (state, action) => {
      state.value = [
        ...state.value,
        action.payload,
      ];
    })
    builder.addCase(getItemsFromFirebase.fulfilled, (state, action) => {
      state.value = action.payload
    })

    builder.addCase(deleteItemFromFirebase.fulfilled, (state, action) => {
      const itemId = action.payload.key
      state.value = state.value.filter(elem=>elem.key !== itemId);
    })
    builder.addCase(updateItemFromFirebase.fulfilled, (state, action) => {
      const newItem = action.payload
      state.value = state.value.map(
        elem => elem.key === newItem.key ? newItem : elem
      )
    })

  }
})

export const { addItem, updateItem, deleteItem } = todoSlice.actions
export default todoSlice.reducer