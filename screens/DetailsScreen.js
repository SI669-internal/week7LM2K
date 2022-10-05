import { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button } from '@rneui/themed';
import { ListContext } from "../context/ListContext";

function DetailsScreen(props) {

  const [ listItems, setListItems ] = useContext(ListContext);
  const { navigation, route } = props;
  const { itemKey } = route.params;
  const item = itemKey===-1 ? 
    { text: '', key: -1 } :
    listItems.find(elem=>elem.key === itemKey);

  const [inputText, setInputText] = useState(item.text);

  const addItem = (newText) => {
    let newItem = {
      text: newText,
      key: Date.now()
    }
    let newListItems = listItems.concat(newItem);
    setListItems(newListItems);
  }

  const updateItem = (item, newText) => {
    let newItem = {
      text: newText,
      key: item.key
    };
    let newListItems = listItems.map(elem=>elem.key===item.key?newItem:elem);
    setListItems(newListItems);
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Input
          placeholder='New Item'
          value={inputText}
          onChangeText={(text)=>setInputText(text)}
          style={styles.inputStyle}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title='Cancel'
          onPress={()=>{
            navigation.navigate('Home');
          }}
        />
        <Button
          title='Save'
          onPress={()=>{
            if (item.key === -1) {
              addItem(inputText);
            } else {
              updateItem(item, inputText);
            }
            navigation.goBack();
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    paddingTop: '20%'
  }, 
  inputContainer: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%'
  },
  buttonContainer: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '80%'
  }
});

export default DetailsScreen;