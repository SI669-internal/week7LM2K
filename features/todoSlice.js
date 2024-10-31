import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { firebaseConfig } from "../Secrets";
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query,
  doc, getDocs, updateDoc, addDoc, deleteDoc,
} from "firebase/firestore";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const addItemThunk = createAsyncThunk(
  'todofirebase/addItem',
  async (todoText) => {
    const todoCollRef = collection(db, 'todos');
    const todoSnap = await addDoc(todoCollRef, {text: todoText});
    return {key: todoSnap.id, text: todoText};
  }
)

export const getTodosThunk = createAsyncThunk(
 'todofirebase/getItems',
  async () => {
    const initList = [];
    const collRef = collection(db, 'todos');
    const q = query(collRef);
    const querySnapshot = await getDocs(q);
    querySnapshot.docs.forEach((docSnapshot)=>{
      const todo = docSnapshot.data();
      todo.key = docSnapshot.id;
      initList.push(todo);
    });
    return initList;
  }
)

export const deleteItemThunk = createAsyncThunk(
  'todofirebase/deleteItem',
  async (todo) => {
    return todo
  }
)

export const updateItemThunk = createAsyncThunk(
  'todofirebase/updateItem',
  async ({item, inputText}) => {
    const newTodo = { ...item, text: inputText};
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
  reducers: {
    // addItem: (state, action) => {
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the Immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes.
    //   // Also, no return statement is required from these functions.
    //   const newListItem = {
    //     text: action.payload,
    //     key: Date.now() + Math.random()
    //   };
    //
    //   state.value = [
    //     ...state.value,
    //     newListItem
    //   ];
    // },
    // updateItem: (state, action) => {
    //     const {item, inputText} = action.payload
    //   const newItem = {
    //     text: inputText,
    //     key: item.key
    //   };
    //
    //   state.value = state.value.map(
    //     elem => elem.key === newItem.key ? newItem : elem
    //   )
    // },
    // deleteItem: (state, action) => {
    //   const itemId = action.payload.key
    //   state.value = state.value.filter(elem=>elem.key !== itemId);
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(updateItemThunk.fulfilled, (state, action) => {
      const newItem = action.payload
      state.value = state.value.map(
        elem => elem.key === newItem.key ? newItem : elem
      )
    })

    builder.addCase(addItemThunk.fulfilled, (state, action) => {
      state.value = [
        ...state.value,
        action.payload,
      ];
    })

    builder.addCase(deleteItemThunk.fulfilled, (state, action) => {
      const itemId = action.payload.key
      state.value = state.value.filter(elem=>elem.key !== itemId);
    })
    // builder.addCase(updateItemThunk.fulfilled, (state, action) => {
    //   const newItem = action.payload
    //   state.value = state.value.map(
    //     elem => elem.key === newItem.key ? newItem : elem
    //   )
    // })
    builder.addCase(getTodosThunk.fulfilled, (state, action) => {
      state.value = action.payload
    })
  }
})

export const { addItem, updateItem, deleteItem } = todoSlice.actions
export default todoSlice.reducer