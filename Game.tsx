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
  Alert,
} from "react-native";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
  bg: {
    height: windowHeight,
    width: windowWidth,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'green',
  },    
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


const slideList = [
    {
        id: 1, 
        image: require('./assets/01.png'), 
        title: 'What is the movie name?', 
        subtitle: '', 
        answers: [
            {id: 1, name: 'Jurrasic Park'},
            {id: 2, name: 'Home Alone'},
            {id: 3, name: 'Gremilins'}
        ],
        answer : 2,
        uanswer : 0,
        score : 10 
    },
    {
        id: 2, 
        image: require('./assets/02.png'), 
        title: 'What is the movie name?', 
        subtitle: '', 
        answers: [
            {id: 1, name: 'Jurrasic Park'},
            {id: 2, name: 'Home Alone'},
            {id: 3, name: 'Gremilins'}
        ],
        answer : 2,
        uanswer : 0,
        score : 10 
    },
    {
        id: 3, 
        image: require('./assets/03.png'), 
        title: 'What is the movie name?', 
        subtitle: '', 
        answers: [
            {id: 1, name: 'Jurrasic Park'},
            {id: 2, name: 'Home Alone'},
            {id: 3, name: 'Gremilins'}
        ],
        answer : 2,
        uanswer : 0,
        score : 10 
    },         
];


// const Slide = memo(function Slide({ data }) {
//   return (
//     <View style={styles.slide}>
//       <Image source={{ uri: data.image }} style={styles.slideImage}></Image>
//       <Text style={styles.slideTitle}>{data.title}</Text>
//       <Text style={styles.slideSubtitle}>{data.subtitle}</Text>
//     </View>
//   );
// });


// score = []
// function handleClick(data, answer){    
//     // console.log(data);
//     // data.uanswer = 1;

//     score.push({question: data.id, answer : answer});
//     alert('score!'+ score.length);
//   }


const Slide = memo(function Slide({ data, click }) {
    return (
      <View style={styles.slide}>
        
        <View style={styles.bg}>
            <View style={styles.topTitle}>
                <Text style={styles.slideTitle}>{data.title}</Text>
            </View>
                    
            <ImageBackground source={data.image} style={styles.slideImage}>
                
                <View style={styles.container}>

                    <TouchableHighlight onPress={ () => { click(data, 1) }} underlayColor="white">
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>{data.answers[0].name}</Text>
                    </View>
                    </TouchableHighlight>        

                    <TouchableHighlight onPress={ () => { click(data, 2)}} underlayColor="white">
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>{data.answers[1].name}</Text>
                    </View>
                    </TouchableHighlight>          

                    <TouchableHighlight onPress={ () => { click(data, 3) }} underlayColor="white">
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>{data.answers[2].name}</Text>
                    </View>
                    </TouchableHighlight>                      

                </View>     
            </ImageBackground>

            <Text style={styles.slideSubtitle}>{data.subtitle}</Text>
        </View>

      </View>
    );
  });


function Pagination({ index }) {
  return (
    <View style={styles.pagination} pointerEvents="none">
      {slideList.map((_, i) => {
        return (
          <View
            key={i}
            style={[
              styles.paginationDot,
              index === i
                ? styles.paginationDotActive
                : styles.paginationDotInactive,
            ]}
          />
        );
      })}
    </View>
  );
}

export default function Game(navigation) {
  const [index, setIndex] = useState(0);
  const indexRef = useRef(index);
//   const indexRef = useRef<FlatList>(null);
  indexRef.current = index;
  const onScroll = useCallback((event) => {
    
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);

    // alert('index_test!'+ index);

    const distance = Math.abs(roundIndex - index);

    // Prevent one pixel triggering setIndex in the middle
    // of the transition. With this we have to scroll a bit
    // more to trigger the index change.
    const isNoMansLand = 0.4 < distance;

    if (roundIndex !== indexRef.current && !isNoMansLand) {
      setIndex(roundIndex);
    }
  }, []);

  const flatListOptimizationProps = {
    initialNumToRender: 0,
    maxToRenderPerBatch: 1,
    removeClippedSubviews: true,
    scrollEventThrottle: 16,
    windowSize: 2,
    keyExtractor: useCallback(s => String(s.id), []),
    getItemLayout: useCallback(
      (_, index) => ({
        index,
        length: windowWidth,
        offset: index * windowWidth,
      }),
      []
    ),
  };
  


  const handleClick2 = function handleClick(data, answer){    

    if(data.id < 3){
        this.flatListRef.scrollToIndex({animated: true, index: data.id});
    }

    // navigation.navigate('Category', {name: 'category'})
    
  }


  const renderItem = useCallback(function renderItem({ item, index }) {
    return <Slide data={item} click={handleClick2} />;
  }, []);

  return (
    <>
      <FlatList
        ref={(ref) => { this.flatListRef = ref; }}
        data={slideList}
        style={styles.carousel}
        renderItem={renderItem}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onScroll={onScroll}
        {...flatListOptimizationProps}
      />
      {/* <Pagination index={index}></Pagination> */}
    </>
  );
}
