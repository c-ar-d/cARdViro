/**
 * Copyright (c) 2017-present, Viro, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  Button,
  StatusBar,
  Image
} from 'react-native'

import {
  ViroVRSceneNavigator,
  ViroARSceneNavigator,
  ViroUtils
} from 'react-viro'

const isARSupportedOnDevice = ViroUtils.isARSupportedOnDevice

// Insert your API key below!
var sharedProps = {
  apiKey: '53F859C6-0996-417C-8CC3-CDDF2775C41C'
}

// Sets the default scene you want for AR and VR
const InitialARScene = require('./components/cardWithAR')
const InitialVRScene = require('./components/cardWithVR')
const QRScanner = require('./components/qrScanner')

const GET_WELCOME_SCREEN = 'GET_WELCOME_SCREEN'
const GET_SCAN_A_CARD = 'GET_SCAN_A_CARD'
const NO_AR_SUPPORT = 'NO_AR_SUPPORT'
const SCAN_QRCODE = 'SCAN_QRCODE'
const QR_SCANNER = 'QR_SCANNER'
const SELECT_AR_OR_VR = 'SELECT_AR_OR_VR'
const VR_NAVIGATOR_TYPE = 'VR'
const AR_NAVIGATOR_TYPE = 'AR'
const SELECT_SEND_OR_SCAN = 'SELECT_SEND_OR_SCAN'
const SELECT_CATEGORY = 'SELECT_CATEGORY'

// This determines which type of experience to launch in, or UNSET, if the user should
// be presented with a choice of AR or VR. By default, we offer the user a choice.
let defaultNavigatorType = GET_WELCOME_SCREEN

export default class App extends Component {
  constructor() {
    super()

    this.state = {
      navigatorType: defaultNavigatorType,
      sharedProps: sharedProps
    }
    this._getWelcomeScreen = this._getWelcomeScreen.bind(this)
    this._getScanACardScreen = this._getScanACardScreen.bind(this)
    this._getNonARSCanQRScreen = this._getNonARSCanQRScreen.bind(this)
    this._getQRScanner = this._getQRScanner.bind(this)
    this._getExperienceSelector.bind(this)
    this._getARNavigator = this._getARNavigator.bind(this)
    this._getVRNavigator = this._getVRNavigator.bind(this)
    this._getExperienceButtonOnPress = this._getExperienceButtonOnPress.bind(
      this
    )
    this._exitViro = this._exitViro.bind(this)
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        navigatorType: GET_SCAN_A_CARD
      })
    }, 3000)
  }
  // Replace this function with the contents of _getVRNavigator() or _getARNavigator()
  // if you are building a specific type of experience.
  render() {
    if (this.state.navigatorType == GET_WELCOME_SCREEN) {
      return this._getWelcomeScreen()
    } else if (this.state.navigatorType == GET_SCAN_A_CARD) {
      return this._getScanACardScreen()
    } else if (this.state.navigatorType == NO_AR_SUPPORT) {
      return this._getNonARSCanQRScreen()
    } else if (this.state.navigatorType == QR_SCANNER) {
      return this._getQRScanner()
    } else if (this.state.navigatorType == SELECT_AR_OR_VR) {
      return this._getExperienceSelector()
    } else if (this.state.navigatorType == AR_NAVIGATOR_TYPE) {
      return this._getARNavigator()
    } else if (this.state.navigatorType == VR_NAVIGATOR_TYPE) {
      return this._getVRNavigator()
    }
  }

  // Presents the user with a choice of an AR or VR experience
  _getWelcomeScreen() {
    return (
      <View style={localStyles.container}>
        <StatusBar hidden = {true} />
        <Image
          style={localStyles.welcome}
          source={require('./assets/forScreens/welcome.jpg')}
        />
        <Image
          style={localStyles.centerLogo}
          source={require('./assets/forScreens/cARd-logo.jpg')}
        />
      </View>
    )
  }


  _getScanACardScreen() {
    return (
      <View style={localStyles.container}>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor="#fff"
          translucent={false}
          networkActivityIndicatorVisible={true}
        />
        <TouchableOpacity onPress={ () => isARSupportedOnDevice(
          () => this.setState({ navigatorType: NO_AR_SUPPORT}),
          () => this.setState({ navigatorType: QR_SCANNER})
        )}>
          <Image
          style={localStyles.scanButton}
          source={require('./assets/forScreens/scanQR.jpg')}
          />
        </TouchableOpacity>
      </View>
    )
  }

  _getQRScanner() {
    return (
      <React.Fragment>
        <QRScanner />
        <Button
          onPress={this._getExperienceButtonOnPress(SELECT_AR_OR_VR)}
          style={localStyles.enterBarcodeManualButton}
          title='Enter Barcode'
        />
      </React.Fragment>
    )
  }
  _getNonARSCanQRScreen() {
    return (
      <View style={localStyles.container}>
        <Text style={localStyles.titleText}>QR scanner screen</Text>
      </View>
    )
  }


  _getExperienceSelector() {
    return (
      <View style={localStyles.container}>
          <Image
            style={localStyles.selectMessage}
            source={require('./assets/forScreens/selectAROrVR.jpg')}
          />
        <View style={localStyles.inner}>
          <TouchableOpacity onPress={this._getExperienceButtonOnPress(AR_NAVIGATOR_TYPE)}>
            <Image
            style={localStyles.ARVRButton}
            source={require('./assets/forScreens/AR.jpg')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={this._getExperienceButtonOnPress(VR_NAVIGATOR_TYPE)}>
            <Image
            style={localStyles.ARVRButton}
            source={require('./assets/forScreens/VR.jpg')}
            />
          </TouchableOpacity>
        </View>
      </View>
    )
  }


  // Returns the ViroARSceneNavigator which will start the AR experience
  _getARNavigator() {
    return (
      <ViroARSceneNavigator
        {...this.state.sharedProps}
        initialScene={{ scene: InitialARScene }}
      />
    )
  }

  // Returns the ViroSceneNavigator which will start the VR experience
  _getVRNavigator() {
    return (
      <ViroVRSceneNavigator
        {...this.state.sharedProps}
        initialScene={{ scene: InitialVRScene }}
        onExitViro={this._exitViro}
      />
    )
  }

  // This function returns an anonymous/lambda function to be used
  // by the experience selector buttons
  _getExperienceButtonOnPress(navigatorType) {
    return () => {
      this.setState({
        navigatorType: navigatorType
      })
    }
  }

  // This function "exits" Viro by setting the navigatorType to UNSET.
  _exitViro() {
    this.setState({
      navigatorType: GET_SCAN_A_CARD
    })
  }
}



const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  centerLogo: {
    width: 320,
    height: 100
  },
  welcome: {
    justifyContent: 'center',
    width: 350,
    height: 100
  },
  scanButton: {
    width: 350,
    height: 350
  },
  selectMessage: {
    width: 250,
    height: 250
  },
  outer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  inner: {
    flexDirection: 'row',
  },
  ARVRButton: {
    width: 180,
    height: 120
  },
  titleText: {
    paddingTop: 30,
    paddingBottom: 20,
    color: '#222',
    textAlign: 'center',
    fontSize: 25
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20
  },
  buttons: {
    height: 80,
    width: 150,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  exitButton: {
    height: 50,
    width: 100,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  enterBarcodeManualButton: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 40
  }
})

module.exports = App

