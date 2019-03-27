import React, { Component } from 'react'
import {
  Text,
  View,
  Alert
} from 'react-native'
// import { ViroUtils } from 'react-viro'
import { RNCamera } from 'react-native-camera'
import { connect } from 'react-redux'
import { fetchScannedCard } from '../store'

// const isARSupportedOnDevice = ViroUtils.isARSupportedOnDevice

class QRScanner extends Component {
  constructor(props) {
    super(props)
    this.camera = null
    this.barcodeCodes = []
    this.state = {
      camera: {
        type: RNCamera.Constants.Type.back,
        flashMode: RNCamera.Constants.FlashMode.auto,
        barcodeFinderVisible: true
      }
    }
  }
  onBarCodeRead(scanResult) {
    const cardURL = scanResult.data
    if (cardURL !== null) {
      if (!this.barcodeCodes.includes(cardURL)) {
        this.barcodeCodes.push(cardURL)
        Alert.alert('QR code scanned')
      }
      this.props.getCard(cardURL)

    } else {
      Alert.alert('Invalid QR code')
    }
  }
  // && cardURL.includes('https://c-ar-d-server.herokuapp.com/api/cards/scan/')

  async takePicture() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true }
      const data = await this.camera.takePictureAsync(options)
      console.log(data.uri)
    }
  }

  pendingView() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'lightgreen',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Text>Waiting</Text>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref
          }}
          barcodeFinderVisible={this.state.camera.barcodeFinderVisible}
          barcodeFinderWidth={280}
          barcodeFinderHeight={220}
          barcodeFinderBorderColor="white"
          barcodeFinderBorderWidth={2}
          defaultTouchToFocus
          flashMode={this.state.camera.flashMode}
          mirrorImage={false}
          onBarCodeRead={this.onBarCodeRead.bind(this)}
          onFocusChanged={() => {}}
          onZoomChanged={() => {}}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={'We need your permission to use your camera phone'}
          style={styles.preview}
          type={this.state.camera.type}
        />
        <View style={[styles.overlay, styles.topOverlay]}>
          <Text style={styles.scanScreenMessage}>Please scan your card!</Text>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  card: state.card
})

const mapDispatchToProps = dispatch => {
  return {
    getCard: cardURL => dispatch(fetchScannedCard(cardURL))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QRScanner)


const styles = {
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  overlay: {
    position: 'absolute',
    padding: 16,
    right: 0,
    left: 0,
    alignItems: 'center'
  },
  topOverlay: {
    top: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  bottomOverlay: {
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  enterBarcodeManualButton: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 40
  },
  scanScreenMessage: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  }
}
