import { 
  Text, View ,TextInput , Pressable , StyleSheet , FlatList
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { data } from "../data/todos";

export default function Index() {

  const [todos , setTodos] = useState(data.sort((a,b) => b.id - a.id));
  const [text , setText] = useState("");

  const addTodo = () => { 
    if(text.trim()){ 
      const newID = todos.length ? todos[0].id + 1 : 1;
      setTodos([{id : newID , title : text , completed : false} , ...todos]);
      setText('');
    }
  }

  const toggleTodo = (id) => { 
    setTodos(todos.map(todo => todo.id === id ? {...todo , completed : !todo.completed} : todo));
  }

  /*
    Above todos.map(todo => todo.id === id ? {...todo , completed : !todo.completed} : todo) line is
    same as below code:

    todos.map(todo => {
    if (todo.id === id) {
      return { ...todo, completed: !todo.completed }; // Update the task
    } else {
      return todo; // Keep it the same
    }
  });
  */


  const removeTodo = (id) => { 
    setTodos(todos.filter(todo => todo.id !== id));
  }

  const renderItem = ({item}) => (
    <View style={styles.todoItem} >
      <Text 
        style={[styles.todoText , item.completed && styles.completedText]} 
        onPress={() => toggleTodo(item.id)}
      >{item.title}</Text>
      <Pressable onPress={() => removeTodo(item.id)} >
        <MaterialCommunityIcons name="delete-circle" size={36} color="red" selectable={undefined}/>
      </Pressable>
    </View>

  );

  return (
    <SafeAreaView style = {styles.container} >
      <View style = {styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new todo"
          placeholderTextColor='gray'
          value={text}
          onChangeText={setText}
        />
        <Pressable onPress={addTodo} style={styles.addButton}>
          <Text style={styles.addButtonText} >Add</Text>
        </Pressable>
      </View>
      <FlatList
        data={todos}
        renderItem = {renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle = {{flexGrow : 1}}
      >
      </FlatList>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex : 1,
    backgroundColor : 'rgb(0, 46, 91)',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    width: '100%',
    maxWidth : 1024 ,
    marginHorizontal : 'auto',
    pointerEvents: 'auto',
  },
  input: {
    flex : 1 ,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    fontSize: 18,
    minWidth: 0,
    color: 'white',

  },
  addButton: {
    backgroundColor : 'white',
    padding : 10 , 
    borderRadius : 5
  },
  addButtonText: {
    fontSize : 18,
    color : 'rgb(0, 46, 91)',
    fontWeight : 'bold'
  },
  todoItem : {
    margin : 10,
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'space-between',
    gap : 4,
    padding : 10,
    borderColor : 'gray',
    borderWidth : 1,
    borderRadius : 5 ,
    maxWidth : 1024 ,
    pointerEvents : 'auto' ,
  },
  todoText : { 
    flex : 1 ,
    fontSize : 18 ,
    color : 'white' ,
  },
  completedText : { 
    textDecorationLine : 'line-through' ,
    color : 'gray'
  }
});
