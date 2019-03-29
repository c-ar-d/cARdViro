import React, { Component } from 'react'
import {
  View,
  TouchableOpacity,
  Button,
  StatusBar,
  Image
} from 'react-native'

import styles from './Public/appStyle'

import {
  ViroVRSceneNavigator,
  ViroARSceneNavigator,
  ViroUtils
} from 'react-viro'

import QRScanner from './components/qrScanner'
import InitialARScene from './components/cardWithAR'
import InitialVRScene from './components/cardWithVR'

const isARSupportedOnDevice = ViroUtils.isARSupportedOnDevice

// Insert your API key below!
var sharedProps = {
  apiKey: '53F859C6-0996-417C-8CC3-CDDF2775C41C'
}

// Sets the default scene you want for AR and VR
// const InitialARScene = require('./components/cardWithAR')
// const InitialVRScene = require('./components/cardWithVR')

const GET_WELCOME_SCREEN = 'GET_WELCOME_SCREEN'
const GET_SCAN_A_CARD = 'GET_SCAN_A_CARD'
const NO_AR_SUPPORT = 'NO_AR_SUPPORT'
const QR_SCANNER = 'QR_SCANNER'
const SELECT_AR_OR_VR = 'SELECT_AR_OR_VR'
const VR_NAVIGATOR_TYPE = 'VR'
const AR_NAVIGATOR_TYPE = 'AR'

const defaultNavigatorType = GET_WELCOME_SCREEN

export default class App extends Component {
  constructor(props) {
    super(props)

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

    this._getExperienceButtonOnPress = this._getExperienceButtonOnPress.bind(this)
    this._exitViro = this._exitViro.bind(this)
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        navigatorType: GET_SCAN_A_CARD
      })
    }, 3000)
  }

  render() {
    if (this.state.navigatorType === GET_WELCOME_SCREEN) {
      return this._getWelcomeScreen()
    } else if (this.state.navigatorType === GET_SCAN_A_CARD) {
      return this._getScanACardScreen()
    } else if (this.state.navigatorType === NO_AR_SUPPORT) {
      return this._getNonARSCanQRScreen()
    } else if (this.state.navigatorType === QR_SCANNER) {
      return this._getQRScanner()
    } else if (this.state.navigatorType === SELECT_AR_OR_VR) {
      return this._getExperienceSelector()
    } else if (this.state.navigatorType === AR_NAVIGATOR_TYPE) {
      return this._getARNavigator()
    } else if (this.state.navigatorType === VR_NAVIGATOR_TYPE) {
      return this._getVRNavigator()
    }
  }

  _getWelcomeScreen() {
    return (
      <View style={styles.container}>
        <StatusBar hidden = {true} />
        <Image
          style={styles.welcome}
          source={require('./assets/forScreens/welcome.jpg')}
        />
        <Image
          style={styles.centerLogo}
          source={require('./assets/forScreens/cARd-logo.jpg')}
        />
      </View>
    )
  }


  _getScanACardScreen() {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor="#fff"
          translucent={false}
          networkActivityIndicatorVisible={true}
        />
        <TouchableOpacity
          onPress={ () => isARSupportedOnDevice(
          () => this.setState({ navigatorType: NO_AR_SUPPORT}),
          () => this.setState({ navigatorType: QR_SCANNER})
        )}>
          <Image
          style={styles.scanButton}
          source={require('./assets/forScreens/scanQR.jpg')}
          />
        </TouchableOpacity>
      </View>
    )
  }

  _getNonARSCanQRScreen() {
    return (
      <React.Fragment>
      <QRScanner />
        <Button
          style={styles.enterBarcodeManualButton}
          title="Go to VR View"
          onPress={this._getExperienceButtonOnPress(VR_NAVIGATOR_TYPE)}
        />
      </React.Fragment>
    )
  }

  _getQRScanner() {
    return (
      <React.Fragment>
       <QRScanner />
        <Button
          style={styles.enterBarcodeManualButton}
          title="Go Select AR/VR"
          onPress={this._getExperienceButtonOnPress(SELECT_AR_OR_VR)}
        />
      </React.Fragment>
    )
  }


  _getExperienceSelector() {
    return (
      <View style={styles.container}>
          <Image
            style={styles.selectMessage}
            source={require('./assets/forScreens/selectAROrVR.jpg')}
          />
        <View style={styles.inner}>
          <TouchableOpacity onPress={this._getExperienceButtonOnPress(AR_NAVIGATOR_TYPE)}>
            <Image
            style={styles.ARVRButton}
            source={require('./assets/forScreens/AR.jpg')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={this._getExperienceButtonOnPress(VR_NAVIGATOR_TYPE)}>
            <Image
            style={styles.ARVRButton}
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
        onExitViro={this._exitViro}
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
      navigatorType: SELECT_AR_OR_VR
    })
  }
}

