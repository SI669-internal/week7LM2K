import { useState } from 'react';
import { StyleSheet, View, FlatList } from "react-native";
import { FAB } from "@rneui/base";
import ListItem from "../components/ListItem";

function HomeScreen(props) {
  
  const initListItems = [
    { text: 'Get costume', key: Date.now() },
    { text: 'Get candy', key: Date.now() + 1}
  ];

  const [listItems, setListItems] = useState(initListItems);

  const { navigation, route } = props;

  return(
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <FlatList
          data={listItems}
          renderItem={({item})=>{
            return (
              <ListItem item={item} navigation={navigation} />
            );
          }}
        />
      </View>
      <FAB
        title='Add'
        color='darkblue'
        onPress={()=>{
          navigation.navigate('Details', {
            item: {key: -1, text: ''}
          });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  listContainer: {
    flex: 0.6,
    width: '100%',
    paddingLeft: '10%',
    paddingTop: '10%'
  },
});

export default HomeScreen;