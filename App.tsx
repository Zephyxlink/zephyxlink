import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Carousel from './Game';


import {
  FlatList,
  Button,
  View,
  Dimensions,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
} from "react-native";
import Game from './Game';
import Score from './Score';


const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
const styles = StyleSheet.create({
  slide: {
    height: windowHeight,
    width: windowWidth,
    justifyContent: "center",
    alignItems: "center",
  },
  // slideImage: { width: windowWidth * 0.9, height: windowHeight * 0.7 },
  slideImage: { width: 197, height: 61 },
  slideTitle: { fontSize: 24 },
  slideSubtitle: { fontSize: 18 },

  pagination: {
    position: "absolute",
    bottom: 8,
    width: "100%",
    justifyContent: "center",
    flexDirection: "row",
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 2,
  },
  paginationDotActive: { backgroundColor: "lightblue" },
  paginationDotInactive: { backgroundColor: "gray" },

  carousel: { flex: 1 },


  container: {
    // paddingTop: 60,
    marginTop: 240,
    alignItems: 'center',
  },
  button: {
    marginBottom: 10,
    // width: 260,
    alignItems: 'center',
    backgroundColor: '#2196F3',
    height: 40,
    width: 150,
  },
  buttonText: {
    textAlign: 'center',
    padding: 10,
    color: 'white',
  },
  topTitle: {
    width: windowWidth * 0.9,
    alignItems: 'center',
    backgroundColor: '#f3d021',
    justifyContent: "center",
    height: 40
  },  
});

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Game'}}
        />        
        <Stack.Screen name="Category" component={CategoryScreen} />
        <Stack.Screen name="Game" component={Game} />
        <Stack.Screen name="Score" component={Score} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const HomeScreen = ({navigation}) => {
  return (
    // <Button
    //   title="Start"
    //   onPress={() =>
    //     navigation.navigate('Category', {name: 'category'})
    //   }
    // />
    <View>
      <View style={styles.container}>      
        <Image source={require('./assets/logo.png')} style={styles.slideImage}></Image>      
        <TouchableHighlight onPress={ () => { navigation.navigate('Category', {name: 'category'}) }} underlayColor="white">
        <View style={styles.button}>
            <Text style={styles.buttonText}>Start Game</Text>
        </View>
        </TouchableHighlight>       
      </View>    
    </View>    
  );
};



const CategoryScreen = ({navigation, route}) => {
  return (
    // <Button
    //   title="Movies"
    //   onPress={() =>
    //     navigation.navigate('Game', {name: 'Movies'})
    //   }
    // />
    <View style={styles.container}>
      <TouchableHighlight onPress={ () => { navigation.navigate('Game', {name: 'Movies'}) }} underlayColor="white">
      <View style={styles.button}>
          <Text style={styles.buttonText}>Movies</Text>
      </View>
      </TouchableHighlight>       
    </View>
  );
};


export default App;
