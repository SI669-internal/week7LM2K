import { useContext } from "react";
import { StyleSheet, View, Text, FlatList, Button } from "react-native";
import { FAB } from "@rneui/base";

import ListItem from "../components/ListItem";
import { ListContext } from "../context/ListContext";

function HomeScreen(props) {
  const [ listItems, setListItems ] = useContext(ListContext);
  const { navigation, route } = props;

  return(
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <FlatList
          data={listItems}
          renderItem={({item})=>{
            return (
              <ListItem appState={props.appState} item={item} navigation={navigation} />
            );
          }}
        />
      </View>
      <FAB
        title='Add'
        color='darkblue'
        onPress={()=>{
          navigation.navigate('Details', {
            itemKey:  -1
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