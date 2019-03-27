'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  ViroScene,
  ViroNode,
  ViroVideo,
  Viro360Image,
  ViroImage,
} from 'react-viro'

 class cardWithVR extends Component {
  render() {
    console.warn('this is from viro component', this.props.card)
    const card = this.props.card
    return (
      <ViroScene>
        <Viro360Image source={require('../assets/aurora_360.jpg')} />
        <ViroNode
          position={[0, 0, -3]}
          rotation={[0, 0, 0]}
          scale={[1.5, 1.5, 1.5]}
        >
          <ViroVideo
            source={{uri: card.video}}
            loop={true}
            position={[0, 0, 0]}
            scale={[2, 2, 0]}
          />
          <ViroImage
            height={1}
            width={1}
            position={[0, -1.5, 0]}
            rotation={[-45, 0, 0]}
            source={{uri: card.link}}
          />
        </ViroNode>
      </ViroScene>
    )
  }
}

const mapStateToProps = state => ({
  card: state.card
})

export default connect(mapStateToProps, null)(cardWithVR)
