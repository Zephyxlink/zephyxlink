import React, { useCallback, memo, useRef, useState } from "react";
import {
  FlatList,
  View,
  Dimensions,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  TouchableHighlight,
} from "react-native";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
  slide: {
    height: windowHeight,
    width: windowWidth,
    justifyContent: "center",
    alignItems: "center",
  },
  slideImage: { width: windowWidth * 0.9, height: windowHeight * 0.7 },
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


export default function Score() {

  return (
    <View style={styles.container}>
    <TouchableHighlight onPress={ () => {  }} underlayColor="white">
    <View style={styles.button}>
        <Text style={styles.buttonText}>Score</Text>
    </View>
    </TouchableHighlight>       
  </View>
  );
}
