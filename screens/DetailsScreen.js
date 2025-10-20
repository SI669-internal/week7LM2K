import { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button } from '@rneui/base';
import { ListContext } from "../context/ListContext";

function DetailsScreen({navigation, route}) {

  const [ listItems, setListItems ] = useContext(ListContext);
  const { item } = route.params;

  const [inputText, setInputText] = useState(item.text);

  const addItem = (newText) => {
    const newListItems = [...listItems, {text: newText, key: Date.now()}];
    setListItems(newListItems);
  }

  const updateItem = (item, newText) => {
    const newListItems = listItems.map(it => it.key === item.key ? {text: newText, key: it.key} : it);
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