'use strict'

import React, { Component } from 'react'

import { StyleSheet } from 'react-native'

import {
  ViroScene,
  ViroText,
  ViroNode,
  ViroVideo,
  Viro360Image,
  ViroImage,
} from 'react-viro'

export default class HelloWorldScene extends Component {
  constructor(props) {
    super(props)

    this.state = {} // Set initial state here
  }

  render() {
    return (
      <ViroScene>
        <Viro360Image source={require('../assets/guadalupe_360.jpg')} />
        {/* <ViroText
          text="Hello World!"
          width={2}
          height={2}
          position={[0, 0, -2]}
          style={styles.helloWorldTextStyle}
        /> */}
        <ViroNode
          position={[0, 0, -3]}
          rotation={[0, 0, 0]}
          scale={[1.5, 1.5, 1.5]}
        >
          <ViroVideo
            source={require('../assets/Pears.mp4')}
            loop={true}
            position={[0, 0]}
            scale={[2, 2, 0]}
          />
          <ViroImage
            height={1}
            width={1}
            position={[0, -1.5]}
            rotation={[-45, 0, 0]}
            source={{
              uri:
                'https://banner2.kisspng.com/20171207/48a/vector-cartoon-balloons-birthday-background-5a29b42bce1a04.9804184615126825398442.jpg'
            }}
          />
        </ViroNode>
      </ViroScene>
    );
  }
}

const styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: "Arial",
    fontSize: 60,
    color: "#ffffff",
    textAlignVertical: "center",
    textAlign: "center"
  }
});

module.exports = HelloWorldScene
