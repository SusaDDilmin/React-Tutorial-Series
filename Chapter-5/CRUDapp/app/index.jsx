import { 
  Text, View, Platform, ScrollView, SafeAreaView , FlatList , Appearance , StyleSheet , Button , TextInput
} from "react-native";

import React , { useState } from "react";

import { TODO_ITEMS } from "../data/ToDoItems";

export default function Index() {

  const colorScheme = Appearance.getColorScheme();

  const styles = createStyles(colorScheme);

  const Container = Platform.OS === 'web' ? ScrollView : SafeAreaView

  const [ToDoItems, setToDoItems] = useState(TODO_ITEMS);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const AddItem = () => {
    const newItem = { 'title':title, 'description':description };
    setToDoItems(prevItems => [...prevItems, newItem]);
    TODO_ITEMS.push(newItem[0]);
    setTitle('');
    setDescription('');
  };

  return (
    <ScrollView style={{ backgroundColor: colorScheme === 'dark' ? 'rgb(25, 33, 45)' : 'white' }}>
      <View style={ styles.header } >
        <Text style={ styles.headerText }>
          My To-Do List
        </Text>
      </View>
      <FlatList
        data={ToDoItems}
        contentContainerStyle={styles.container}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item , index }) => (
          <View style={styles.itemContainer}>
            <View>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
            
            <Button title="Delete" onPress={() => {
              setToDoItems(prevItems => prevItems.filter((_, i) => i !== index));
              TODO_ITEMS.splice(index, 1);
            }} style={styles.deleteButton} />
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyListText}> + Add Items</Text>}
      ></FlatList>
      <View style={styles.AddItem}>
        <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={text => setTitle(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={text => setDescription(text)}
        />
        <Button title="Add" onPress={() => {
          AddItem();
        }}/>
      </View>
      
    </ScrollView>
  );
}

function createStyles(colorScheme) {
  return StyleSheet.create({
    itemContainer: {
      margin: 10,
      padding: 10,
      backgroundColor: colorScheme === 'dark' ? 'rgb(96, 96, 96)' : 'rgb(255, 255, 255)',
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(6, 81, 186, 1)',
      borderRadius: 10,
      justifyContent: 'space-between',
    },
    input: {
      margin: 10,
      padding: 10,
      borderWidth: 1,
      borderColor: colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(6, 81, 186, 1)',
      borderRadius: 5,
      color: colorScheme === 'dark' ? 'white' : 'black',
      backgroundColor: colorScheme === 'dark' ? 'rgb(124, 124, 124)' : 'rgb(255, 255, 255)',
    },
    AddItem: {
      margin: 10,
      padding: 10,
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(6, 81, 186, 1)',
      borderRadius: 10,
      backgroundColor: colorScheme === 'dark' ? 'rgb(60, 60, 60)' : 'rgb(255, 255, 255)',
    },
    header: {
      backgroundColor: 'rgba(6, 81, 186, 1)',
      padding: 15,
      margin: 10,
      borderRadius: 10,
    },
    headerText: {
      fontSize: 25,
      fontWeight: 'bold',
      color: colorScheme === 'dark' ? 'black' : 'white',
      textAlign: 'center',
    },
    deleteButton: {
      backgroundColor: 'red',
      color: 'white',
      padding: 10,
      borderRadius: 10,
    },
    title: {
      paddingLeft: 10,
      paddingVertical: 5,
      fontSize: 20,
      fontWeight: 'bold',
      color: colorScheme === 'dark' ? 'white' : 'black',
    },
    description: {
      paddingLeft: 10,
      paddingVertical: 10,
      fontSize: 15,
      color: colorScheme === 'dark' ? 'white' : 'black',
    },
    emptyListText: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
      color: colorScheme === 'dark' ? 'white' : 'black',
    },
  });
}

// function AddItem(title, description) {
//   TODO_ITEMS.push({'title' : title , 'description' : description});
//   setToDoItems(TODO_ITEMS);
// }
