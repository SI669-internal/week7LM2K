import { useContext } from 'react';
import { StyleSheet, View, FlatList } from "react-native";
import { FAB } from "@rneui/base";
import ListItem from "../components/ListItem";
import { ListContext } from '../context/ListContext';

function HomeScreen({navigation, route}) {
  const [ listItems, setListItems ] = useContext(ListContext);

  return(
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <FlatList
          data={listItems}
          renderItem={({item})=>{
            return (
              <ListItem 
                item={item} 
                navigation={navigation} 
              />
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
    backgroundColor: 'white'
  },
  listContainer: {
    flex: 0.6,
    width: '100%',
    paddingLeft: '10%',
    paddingTop: '10%'
  },
});

export default HomeScreen;