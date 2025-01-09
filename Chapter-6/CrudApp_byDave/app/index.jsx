import { 
  Text, View ,TextInput , Pressable , StyleSheet , FlatList
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState , useContext , useEffect } from "react";

// To make some animaions
import  Animated , { LinearTransition } from "react-native-reanimated";

import { ThemeContext } from "@/context/ThemeContext"; 

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Octicons from '@expo/vector-icons/Octicons';

// Import some fonts : in order to work it need to install npm i @expo-google-fonts/<font name - look at web site>
import { Inter_500Medium , useFonts } from "@expo-google-fonts/inter"

import { data } from "../data/todos";

// Let's use some storage : need to install thorugh npm install @react-native-async-storage/async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

// When mobile is on dark mode notification bar is white so we need to change it to black
import { StatusBar } from "expo-status-bar";


export default function Index() {

  const [todos , setTodos] = useState([]);
  const [text , setText] = useState("");

  // Need to learn about useContext more ...
  const { colorScheme , setColorScheme , theme } = useContext(ThemeContext);

  // if font loaded successfully then loaded will be true otherwise false
  const [loaded , error ] = useFonts({ 
    Inter_500Medium ,
  });

  // This will save data in storage whenever todos change
  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('TodoApp');
        const storageTodos = jsonValue != null ? JSON.parse(jsonValue) : null;
        if(storageTodos && storageTodos.length){
          setTodos(storageTodos.sort((a,b) => b.id - a.id));
        } else {
          setTodos(data.sort((a,b) => b.id - a.id));
        }
        
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [data]);

  // This will save data in storage whenever todos change
  useEffect(() => {
      const storeData =  async () => {
        try {
          const jsonValue = JSON.stringify(todos);
          await AsyncStorage.setItem('TodoApp', jsonValue);
        } catch (error) {
          console.error(error);
        }
      
    }
    storeData();
  }, [todos]);  

  if(!loaded && !error) return null;

  const styles = createStyles(theme , colorScheme);

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
        {/* Create button to toggle between light and dark modes */}
        <Pressable onPress={() => setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')} 
          style={{marginLeft : 10}}
        >
          {colorScheme === 'dark' ? <Octicons name="moon" size={36} color={theme.text} selectable={undefined} style={{width : 36}} /> : <Octicons name="sun" size={36} color={theme.text} selectable={undefined} style={{width : 36}} />}
        </Pressable>

      </View>
      {/* Use Animated.FlatList instead of just FlatList to make it bit animate */}
      <Animated.FlatList
        data={todos}
        renderItem = {renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle = {{flexGrow : 1}}
        itemLayoutAnimation={LinearTransition}
        keyboardDismissMode={'on-drag'}
      >
      </Animated.FlatList>
      
      {/* Just add below line now notificatio bar will see fine */}
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </SafeAreaView>
  );
}

function createStyles(theme , colorScheme){
  return StyleSheet.create({
    container: {
      flex : 1,
      backgroundColor : theme.background,
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
      fontFamily : 'Inter_500Medium',
      minWidth: 0,
      color: theme.text,
  
    },
    addButton: {
      backgroundColor : theme.button,
      padding : 10 , 
      borderRadius : 5
    },
    addButtonText: {
      fontSize : 18,
      color : colorScheme === 'dark' ? 'black' : 'white',
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
      fontFamily : 'Inter_500Medium',
      color : theme.text ,
    },
    completedText : { 
      textDecorationLine : 'line-through' ,
      color : 'gray'
    },
  });
}
