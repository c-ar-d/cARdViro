'use strict'

import React, { Component } from 'react'

import { StyleSheet } from 'react-native'

import { ViroARScene, ViroText, ViroConstants, ViroVideo } from 'react-viro'

const styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center'
  }
})

export default class HelloWorldSceneAR extends Component {
  constructor() {
    super()

    // Set initial state here
    this.state = {
      text: 'Initializing AR...'
    }

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this)
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized}>
        <ViroText
          text={this.state.text}
          scale={[0.5, 0.5, 0.5]}
          position={[0, 0, -1]}
          style={styles.helloWorldTextStyle}
        />
        <ViroVideo
    source={require('../assets/Pears.mp4')}
    loop={true}
    position={[0, 2, -5]}
    scale={[2, 2, 0]}
 />
      </ViroARScene>
    )
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text: 'Hello World!'
      })
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
}

module.exports = HelloWorldSceneAR
