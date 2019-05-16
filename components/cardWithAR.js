'use strict'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet } from 'react-native'
import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroARTrackingTargets,
  ViroARImageMarker,
  ViroVideo,
  ViroNode,
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
      isTracking: false,
      initialized: false
    }
  }

  getNoTrackingUI(){
    const { initialized } = this.state
    return (
      <ViroText
        text={ initialized ? 'No Tracking' : 'Initializing AR...'}
        style={styles.helloWorldTextStyle}
        position={[0, 0, -3]}
        scale={[0.5, 0.5, 0.5]}
      />
    )
  }
  getARScene() {
    const card = this.props.card
    return (
      <ViroNode>
        <ViroARImageMarker target="targetCard">
          <ViroVideo
            source={{ uri: card.video }}
            loop={true}
            position={[0, -1, 0]}
            rotation={[-90, 0, 0]}
            scale={[0.5, 0.5, 0.5]}
          />
        </ViroARImageMarker>
      </ViroNode>
    )
  }

  render() {
    const card = this.props.card
    ViroARTrackingTargets.createTargets({
      targetCard: {
        source: {uri: card.link},
        orientation: 'Up',
        physicalWidth: 0.2,
        type: 'Image'
      }
    })
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        { this.state.isTracking ? this.getARScene() : this.getNoTrackingUI()}
      </ViroARScene>
    )
  }
  _onInitialized = (state) => {
    if (state === ViroConstants.TRACKING_NORMAL) {
      this.setState({
        isTracking: true
      })
    } else if (state === ViroConstants.TRACKING_NONE) {
      this.setState({
        isTracking: false
      })
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
