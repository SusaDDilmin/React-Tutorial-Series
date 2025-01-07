import { View, Text, StyleSheet , ImageBackground } from 'react-native'
import React from 'react'

import iceCoffeeImage from "../../assets/images/ice-coffee.jpg"

const App = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={iceCoffeeImage}
        resizeMode='cover'
        style={styles.image}
      >
        <Text style={styles.text}>Coffee Shop</Text>
      </ImageBackground>
      
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  text: {
    fontSize: 42,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  image:{ 
    width: '100%',
    height: '100%',
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  }
})