// ImageBackground - for set a background image
// Pressable - for a clickable component
// StyleSheet - This is for styling our components - like CSS but they are two things
import { View, Text, StyleSheet , ImageBackground ,Pressable } from 'react-native'
import React from 'react'

// Link - for navigation between screens(or pages)
import { Link } from 'expo-router'

import iceCoffeeImage from "../../assets/images/ice-coffee.jpg"

const App = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={iceCoffeeImage}
        resizeMode='cover'
        style={styles.image}
      >
        <Text style={styles.tittle} >Coffee Shop</Text>
        <Link href="/contact" style={{marginHorizontal : 'auto'}} asChild>
        <Pressable style={styles.button}> 
          <Text style={styles.buttonText}>Contact Us</Text>
        </Pressable>
        </Link>

      </ImageBackground>
      
    </View>
  )
}

export default App

// This will be our styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  tittle: {
    fontSize: 42,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    marginBottom: 120,
  },
  link: {
    fontSize: 42,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    textDecorationLine: 'underline',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 4,
  },
  button:{
    height: 60,
    borderRadius: 20,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.75)',
    padding: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    padding: 4,
  },
  image:{ 
    width: '100%',
    height: '100%',
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  }

})