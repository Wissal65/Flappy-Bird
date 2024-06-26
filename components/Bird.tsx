import Matter, { World, Bodies, Body } from 'matter-js';
import React from 'react';
import { View, Image } from 'react-native';

const Bird = props => {
    // const widthBody = props.body.bounds.max.x - props.body.bounds.min.x
    // const heightBody = props.body.bounds.max.y - props.body.bounds.min.y
    const widthBody = 30
    const heightBody = 40

    const xBody = props.body.position.x - widthBody /2
    const yBody = props.body.position.y - heightBody /2

    const color = props.color;
    const image = props.image;
    const imageIterations = Math.ceil(widthBody / heightBody);

    return(
        <View style={{
            // borderWidth: 1,
            // borderColor: color,
            // borderStyle: 'solid',
            position: 'absolute',
            left: xBody,
            top: yBody,
            width: widthBody,
            height: heightBody
        }}>
                        {Array.from({ length: imageIterations }).map((_, idx) => {
                return (
                    <Image
                        style={{ width: heightBody, height: heightBody }}
                        key={idx}
                        resizeMode="stretch"
                        source={image}
                    />
                );
            })}
        </View> 
    )
}

export default (world, image, pos, size) => {
   const initialBird = Matter.Bodies.rectangle(
       pos.x,
       pos.y,
       size.width,
       size.height,
       {label: 'Bird'}
   )
   Matter.World.add(world, initialBird)

   return {
       body: initialBird,
       image,
       pos,
       renderer: <Bird/>
   }
}