import Matter from "matter-js"
import Bird from "../components/Bird";
import Floor from "../components/Floor";
import Obstacle from "../components/Obstacle";

import { Dimensions } from 'react-native'
import { getPipeSizePosPair } from "../utils/random";
import Images from '../assets/Images';

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width


const restart =()=> {
    let engine = Matter.Engine.create({ enableSleeping: false })

    let world = engine.world

    world.gravity.y = 1.2;

    const pipeSizePosA = getPipeSizePosPair()
    const pipeSizePosB = getPipeSizePosPair(windowWidth * 0.9)
    return {
        physics: { engine, world },

        Bird: Bird(world, Images.bird1, { x: 50, y: 300 }, { height: 40, width: 40 }),

        ObstacleTop1: Obstacle(world, 'ObstacleTop1', 'red', pipeSizePosA.pipeTop.pos, pipeSizePosA.pipeTop.size),
        ObstacleBottom1: Obstacle(world, 'ObstacleBottom1', 'blue', pipeSizePosA.pipeBottom.pos, pipeSizePosA.pipeBottom.size),

        ObstacleTop2: Obstacle(world, 'ObstacleTop2', 'red', pipeSizePosB.pipeTop.pos, pipeSizePosB.pipeTop.size),
        ObstacleBottom2: Obstacle(world, 'ObstacleBottom2', 'blue', pipeSizePosB.pipeBottom.pos, pipeSizePosB.pipeBottom.size),

        Floor: Floor(world,Images.floor, { x: windowWidth / 2, y: windowHeight }, { height: 50, width: windowWidth })
    }
}
export default restart