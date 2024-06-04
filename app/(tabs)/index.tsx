import React, { useEffect,useState } from 'react'
import { Image, StyleSheet, Platform, View ,TouchableOpacity,Text, Dimensions,} from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import { useNavigation } from '@react-navigation/native';
// import { View } from 'react-native-reanimated/lib/typescript/Animated';
import {GameEngine} from 'react-native-game-engine';
import { StatusBar } from 'expo-status-bar';
import entities from '@/entities/index2';
import Physics from '@/physics';
import Images from '@/assets/Images';

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width
const styles = StyleSheet.create({
  backgroundImage: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      // width: Constants.MAX_WIDTH,
      // height: Constants.MAX_HEIGHT
      width: windowWidth,
      height: windowHeight

  },
  gameOverText: {
      color: 'white',
      fontSize: 48,
      fontFamily: '04b_19'
  },
  // score: {
  //     position: 'absolute',
  //     color: 'white',
  //     fontSize: 72,
  //     top: 50,
  //     left: Constants.MAX_WIDTH / 2 - 20,
  //     textShadowColor: '#444444',
  //     textShadowOffset: { width: 2, height: 2},
  //     textShadowRadius: 2,
  //     fontFamily: '04b_19'
  // },
  
});
export default function App() {
  const [running, setRunning] = useState(false);
  const [gameEngine, setGameEngine] = useState(null);
  const [currentPoints, setCurrentPoints] = useState(0);
  const navigation = useNavigation();
  useEffect(() => { 
    const hideTabBar = () => navigation.setOptions({ tabBarStyle: { display: 'none' } });
    const showTabBar = () => navigation.setOptions({ tabBarStyle: { display: 'flex' } });

    // Hide tab bar when entering the screen
    hideTabBar();

    // Show tab bar when leaving the screen
    return () => showTabBar();
  }, [navigation]);
  useEffect(() => {
    setRunning(false)
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <Image source={Images.background2} style={styles.backgroundImage} resizeMode="stretch" />
      <Text style={{ textAlign: 'center', fontSize: 40, fontWeight: 'bold', margin: 20 }}>{currentPoints}</Text>
      <GameEngine
        ref={(ref) => { setGameEngine(ref) }}
        systems={[Physics]}
        entities={entities()}
        running={running}
        onEvent={(e) => {
          switch (e.type) {
            case 'game_over':
              setRunning(false)
              gameEngine.stop()
              break;
            case 'new_point':
              setCurrentPoints(currentPoints + 1)
              break;
          }
        }}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      >
        <StatusBar style="auto" hidden={true} />

      </GameEngine>

      {!running ?
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity style={{ backgroundColor: 'black', paddingHorizontal: 30, paddingVertical: 10 }}
            onPress={() => {
              setCurrentPoints(0)
              setRunning(true)
              gameEngine.swap(entities())
            }}>
            <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 30 }}>
              START GAME
            </Text>
          </TouchableOpacity>

        </View> : null}
    </View>
  );

}