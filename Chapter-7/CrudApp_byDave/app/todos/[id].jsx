// // This is type of hook that is used to get the parameters from the url
// import { useLocalSearchParams } from "expo-router";

// import { Text , View , StyleSheet , Pressable , TextInput } from "react-native";

// import { useState , useEffect , useContext } from "react";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { StatusBar } from "expo-status-bar";
// import { ThemeContext } from "@/context/ThemeContext";
// import { Inter_500Medium , useFonts } from "@expo-google-fonts/inter";
// import { Octicons } from "@expo/vector-icons/Octicons";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useRouter } from "expo-router";

import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, Pressable, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ThemeContext } from '@/context/ThemeContext';
import { Inter_500Medium, useFonts } from '@expo-google-fonts/inter';
import { Octicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function editScreen() {
    const { id } = useLocalSearchParams();
    const [todo , setTodo] = useState({});
    const {colorScheme , setColorScheme , theme} = useContext(ThemeContext);

    const router = useRouter();

    const [loaded , error ] = useFonts({ 
        Inter_500Medium ,
    });

    useEffect(() => {

        const fetchData = async (id) => {
            try{
                const jsonValue = await AsyncStorage.getItem('TodoApp');
                const storageTodos = jsonValue != null ? JSON.parse(jsonValue) : null;
                if(storageTodos && storageTodos.length){
                    const todo = storageTodos.find(todo => todo.id.toString() === id);
                    setTodo(todo);
                }
            }catch(e){
                console.error(e);
            }
        }

        fetchData(id);

    } , [id]);

    if(!loaded && !error) return null;

    const styles = createStyles(theme , colorScheme);

    const handleSave = async () => {
        try {
            const saveTodo = { ...todo , title : todo.title };

            const jsonValue = await AsyncStorage.getItem('TodoApp');
            const storageTodos = jsonValue != null ? JSON.parse(jsonValue) : null;

            if(storageTodos && storageTodos.length){
                const otherTodos = storageTodos.filter(todo => todo.id !== saveTodo.id);
                const allTodos = [...otherTodos , saveTodo];

                await AsyncStorage.setItem('TodoApp' , JSON.stringify(allTodos));
            }else{
                // If no data in storage then create new one
                await AsyncStorage.setItem('TodoApp' , JSON.stringify([saveTodo]));
            }
            // Go back to home screen - Root
            router.push('/');
        }catch(e){
            console.error(e);
        }
    }

    return(
        <SafeAreaView style = {styles.container}>
            <View style = {styles.inputContainer}>
                <TextInput
                    style = {styles.input}
                    maxLength={30}
                    placeholder="Enter Todo"
                    placeholderTextColor = 'gray'
                    value = {todo.title || ''}
                    onChangeText = {text => setTodo(prev => ({...prev , title : text}))}
                />
                <Pressable onPress={() => setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')} 
                    style={{marginLeft : 10}}
                >
                    {colorScheme === 'dark' ? <Octicons name="moon" size={36} color={theme.text} selectable={undefined} style={{width : 36}} /> : <Octicons name="sun" size={36} color={theme.text} selectable={undefined} style={{width : 36}} />}
                </Pressable>
            </View>

            <View style = {styles.inputContainer}>
                <Pressable onPress={handleSave} style={styles.saveButton}>
                    <Text style={styles.saveButtonText} >Save</Text>

                </Pressable>

                <Pressable onPress={() => router.push('/') } style={[styles.saveButton , {backgroundColor : 'red'}]}>
                    <Text style={[styles.cancelButtonText , {color : 'white'}]} >Cancel</Text>

                </Pressable>
            </View>
            <StatusBar style =  { colorScheme === 'dark' ? 'light' : 'dark'} />
        </SafeAreaView>
    );
}

function createStyles( theme , colorScheme ){ 

    return StyleSheet.create({
        container : {
            flex : 1,
            width : '100%',
            backgroundColor : theme.background,
        },
        inputContainer : {
            flexDirection : 'row',
            alignItems : 'center',
            padding : 10 ,
            gap : 6 ,
            width : '100%',
            maxWidth : 1024,
            marginHorizontal : 'auto',
            pointerEvents : 'auto',
        },
        input : {
            flex : 1,
            borderColor : 'gray' ,
            borderWidth : 1,
            borderRadius : 5,
            padding : 10,
            marginRight : 10,
            fontSize : 18,
            fontFamily : 'Inter_500Medium',
            minWidth : 0,
            color : theme.text,
        },
        saveButton : {
            backgroundColor : theme.button,
            borderRadius : 5,
            padding : 10,
        },
        saveButtonText : {
            fontSize : 18,
            color : colorScheme === 'dark' ? 'black' : 'white',
        },
    });
}



// import React, { useState, useEffect, useContext } from 'react';
// import { Text, View, StyleSheet, Pressable, TextInput } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { StatusBar } from 'expo-status-bar';
// import { ThemeContext } from '@/context/ThemeContext';
// import { Inter_500Medium, useFonts } from '@expo-google-fonts/inter';
// import { Octicons } from '@expo/vector-icons';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useRouter, useLocalSearchParams } from 'expo-router';

// export default function EditScreen() {
//   const { id } = useLocalSearchParams();
//   const [todo, setTodo] = useState({});
//   const { colorScheme, setColorScheme, theme } = useContext(ThemeContext);

//   const router = useRouter();

//   const [fontsLoaded] = useFonts({
//     Inter_500Medium,
//   });

//   useEffect(() => {
//     // Fetch the todo item by id from AsyncStorage or any other source
//     const fetchTodo = async () => {
//       const todoItem = await AsyncStorage.getItem(id);
//       setTodo(JSON.parse(todoItem));
//     };

//     fetchTodo();
//   }, [id]);

//   if (!fontsLoaded) {
//     return null; // or a loading spinner
//   }

//   const styles = createStyles(theme, colorScheme);

//   return (
//     <SafeAreaView style={styles.container}>
//       <View>
//         <Pressable onPress={() => router.push('/')} style={[styles.saveButton, { backgroundColor: 'red' }]}>
//           <Text style={[styles.cancelButtonText, { color: 'white' }]}>Cancel</Text>
//         </Pressable>
//       </View>
//       <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
//     </SafeAreaView>
//   );
// }

// function createStyles(theme, colorScheme) {
//   return StyleSheet.create({
//     container: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       backgroundColor: colorScheme === 'dark' ? '#333' : '#fff',
//     },
//     saveButton: {
//       padding: 10,
//       borderRadius: 5,
//     },
//     cancelButtonText: {
//       fontFamily: 'Inter_500Medium',
//     },
//   });
// }