'use strict'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet } from 'react-native'
import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroVideo,
  ViroNode,
  ViroImage
} from 'react-viro'

const styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 15,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center'
  }
})

class cardWithAR extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: 'Initializing AR...'
    }
    this._onInitialized = this._onInitialized.bind(this)
  }

  render() {
    const card = this.props.card
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized}>
        <ViroText
          text={this.state.text}
          scale={[0.5, 0.5, 0.5]}
          position={[0, 0, -3]}
          style={styles.helloWorldTextStyle}
        />
        <ViroNode
          position={[0, 0, -3]}
          rotation={[0, 0, 0]}
          scale={[1.5, 1.5, 1.5]}
        >
          <ViroVideo
            source={{ uri: card.video }}
            loop={true}
            position={[0, 0, -3]}
            scale={[2, 2, 0]}
          />
          <ViroImage
            height={1}
            width={1}
            position={[0, -2, -3]}
            rotation={[-45, 0, 0]}
            scale={[2, 2, 2]}
            source={{ uri: card.link }}
          />
        </ViroNode>
      </ViroARScene>
    )
  }

  _onInitialized(state) {
    if (state === ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text: ''
      })
    } else if (state === ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
}

const mapStateToProps = state => ({
  card: state.card
})

export default connect(
  mapStateToProps,
  null
)(cardWithAR)
