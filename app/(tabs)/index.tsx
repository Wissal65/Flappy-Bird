import React, { useEffect,useState } from 'react'
import { Image, StyleSheet, Platform, View } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import { useNavigation } from '@react-navigation/native';
// import { View } from 'react-native-reanimated/lib/typescript/Animated';
import {GameEngine} from 'react-native-game-engine';
import { StatusBar } from 'expo-status-bar';
import entities from '@/entities/index2';
import Physics from '@/physics';

export default function HomeScreen() {
  const [running, setRunning] = useState(false);
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
      const hideTabBar = () => navigation.setOptions({ tabBarStyle: { display: 'none' } });
      const showTabBar = () => navigation.setOptions({ tabBarStyle: { display: 'flex' } });
  
      // Hide tab bar when entering the screen
      hideTabBar();
  
      // Show tab bar when leaving the screen
      return () => showTabBar();
    }, [navigation]);

    useEffect(() => {

    setRunning(true);
    }, []);
    
  return (
<View style={{flex:1}}>
<GameEngine 
systems={[Physics]}
entities={entities()}
running={running}
style={{position:'absolute',
  top:0,left:0,right:0,bottom:0,
}}>

</GameEngine>
<StatusBar style='auto' hidden={true}/>
</View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
