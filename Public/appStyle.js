import {StyleSheet} from 'react-native'

export default StyleSheet.create({
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
    backgroundColor: '#fff',
    borderRadius: 40
  }
})
