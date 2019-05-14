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
      isTracking: false,
      initialized: false
    }
  }

  getNoTrackingUI(){
    const { initialized } = this.state
    return (
      <ViroText
        text={ initialized ? 'Initializing AR...' : 'No Tracking'}
        style={styles.helloWorldTextStyle}
        position={[0, 0, -3]}
        scale={[0.5, 0.5, 0.5]}
      />
    )
  }

  getARScene() {
    return (
      <ViroNode>
        <ViroARImageMarker target="targetCard">
          <ViroVideo
            source={require('../assets/Pears.mp4')}
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
    // const card = this.props.card
    // imageLink = card.link
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        { this.state.isTracking ? this.getARScene() : this.getNoTrackingUI()}
      </ViroARScene>
      // <ViroARScene onTrackingUpdated={this._onInitialized}>
      //   <ViroARImageMarker target="targetCard">
      //     <ViroVideo
      //       source={require('../assets/Pears.mp4')}
      //       loop={true}
      //       // position={[0, 0, -3]}
      //       scale={[2, 2, 0]}
      //     />
      //   </ViroARImageMarker>

      //   <ViroText
      //     text={this.state.text}
      //     style={styles.helloWorldTextStyle}
      //     position={[0, 0, -3]}
      //     scale={[0.5, 0.5, 0.5]}
      //   />
      //   <ViroNode
      //     position={[0, 0, -3]}
      //     rotation={[0, 0, 0]}
      //     scale={[1.5, 1.5, 1.5]}
      //   >
      //     <ViroVideo
      //       source={{ uri: card.video }}
      //       loop={true}
      //       position={[0, 0, -3]}
      //       scale={[2, 2, 0]}
      //     />
      //     <ViroImage
      //       height={1}
      //       width={1}
      //       position={[0, -2, -3]}
      //       rotation={[-45, 0, 0]}
      //       scale={[2, 2, 2]}
      //       source={{ uri: card.link }}
      //     />
      //   </ViroNode>
      // </ViroARScene>
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

ViroARTrackingTargets.createTargets({
  targetCard: {
    source: require('../assets/cardimagetest.png'),
    orientation: 'Up',
    physicalWidth: 0.14,
    type: 'Image'
  }
})

const mapStateToProps = state => ({
  card: state.card
})

export default connect(
  mapStateToProps,
  null
)(cardWithAR)
