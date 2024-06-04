import Matter from 'matter-js'
import React from 'react'
import { View,Image } from 'react-native'



const Floor = props => {
    const widthBody = props.body.bounds.max.x - props.body.bounds.min.x
    const heightBody = props.body.bounds.max.y - props.body.bounds.min.y

    const xBody = props.body.position.x - widthBody /2
    const yBody = props.body.position.y - heightBody /2

    // const color = props.color;
    // const image=props.image;
    const { body, image } = props;
    const imageIterations = Math.ceil(widthBody / heightBody);

    return(
        <View style={{
            // backgroundColor: color,
            position: 'absolute',
            left: xBody,
            top: yBody,
            width: widthBody,
            height: heightBody,
            overflow: 'hidden',
            flexDirection: 'row',
        //   top: 623,
        }}>
            {/* {Array.apply(null, Array(imageIterations)).map(( el, idx) => {
                    return <Image style={{ width: heightBody, height: heightBody }} key={idx} resizeMode="stretch" source={image} />
                })}
            </View> */}
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
   const initialFloor = Matter.Bodies.rectangle(
       pos.x,
       pos.y,
       size.width,
       size.height,
       {
           label: 'Floor',
           isStatic: true

        }
   )
   Matter.World.add(world, initialFloor)

   return {
       body: initialFloor,
       image,
       pos,
       renderer: <Floor/>
   }
}
