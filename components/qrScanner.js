import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Text, View, Alert } from 'react-native'
import { RNCamera } from 'react-native-camera'
import store, { fetchSelectedCard } from '../store'
import axios from 'axios'

class QRScanner extends Component {
  constructor(props) {
    super(props)
    this.camera = null
    this.barcodeCodes = []
    this.cardUUID = ''
    this.loadCard = this.loadCard.bind(this)
    this.state = {
      camera: {
        type: RNCamera.Constants.Type.back,
        flashMode: RNCamera.Constants.FlashMode.auto,
        barcodeFinderVisible: true
      }
    }
  }

  async loadCard() {
    // const { data } = await axios.get(this.cardurl)
    const { data } = await axios.get(`http://localhost:8080/api/cards/c10b00ae-370f-42a0-ad4b-74ed181ec00c`)

    // console.log(data)
    return data
  }

  onBarCodeRead(scanResult) {
    this.cardurl = scanResult.data
    // console.warn(scanResult.type)
    Alert.alert(this.cardurl)
    // this.props.fetchCard(this.carduuid);
    // fetchSelectedCard('c10b00ae-370f-42a0-ad4b-74ed181ec00c'); //placeholder
    // const {data} = await axios.get(`http://localhost:8080/api/cards/${uuid}`)

    if (scanResult.data !== null) {
      if (!this.barcodeCodes.includes(scanResult.data)) {
        this.barcodeCodes.push(scanResult.data)
        // console.warn('new card scanned') //this saves an array of all the QR Code Values! In this, we store a bunch of cards!
      }
    }
    this.loadCard()
    return
  }

  async takePicture() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true }
      const data = await this.camera.takePictureAsync(options)
      // console.log(data.uri)
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
          barcodeFinderBorderColor='white'
          barcodeFinderBorderWidth={2}
          defaultTouchToFocus
          flashMode={this.state.camera.flashMode}
          mirrorImage={false}
          onBarCodeRead={this.onBarCodeRead.bind(this)}
          onFocusChanged={() => {}}
          onZoomChanged={() => {}}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={
            'We need your permission to use your camera phone'
          }
          style={styles.preview}
          type={this.state.camera.type}
        />
        <View style={[styles.overlay, styles.topOverlay]}>
          <Text style={styles.scanScreenMessage}>Please scan your card!</Text>
        </View>
        <View style={[styles.overlay, styles.bottomOverlay]}>
          {/* <Button
            onPress={this._getExperienceButtonOnPress(CHOOSE_AR_OR_VR)}
            style={styles.enterBarcodeManualButton}
            title="Enter Barcode"
           /> */}
        </View>
      </View>
    )
  }
}

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
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  }
}

//export default QRScanner

const mapStateToProps = state => ({
  card: state.card
})

const mapDispatchToProps = dispatch => ({
  fetchCard: uuid => fetchSelectedCard(uuid)
})

// const GroceryListToExport = connect(mapStatetoProps);
// export default GroceryListToExport(GroceryList);

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(QRScanner);

//================

// //This is an example code to Scan QR code//
// import React, { Component } from "react";
// //import react in our code.
// import {
//   Text,
//   View,
//   Linking,
//   TouchableHighlight,
//   PermissionsAndroid,
//   Platform,
//   StyleSheet
// } from "react-native";
// // import all basic components
// import { CameraKitCameraScreen } from "react-native-camera-kit";
// //import CameraKitCameraScreen we are going to use.

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor:'white'
//   },
//   button: {
//     alignItems: "center",
//     backgroundColor: "#2c3539",
//     padding: 10,
//     width: 300,
//     marginTop: 16
//   },
//   heading: {
//     color: "black",
//     fontSize: 24,
//     alignSelf: "center",
//     padding: 10,
//     marginTop: 30
//   },
//   simpleText: {
//     color: "black",
//     fontSize: 20,
//     alignSelf: "center",
//     padding: 10,
//     marginTop: 16
//   }
// });

// export default class QRScanner extends Component {
//   constructor() {
//     super();
//     this.state = {
//       //variable to hold the qr value
//       qrvalue: "",
//       opneScanner: false
//     };
//   }
//   onOpenlink() {
//     //Function to open URL, If scanned
//     Linking.openURL(this.state.qrvalue);
//     //Linking used to open the URL in any browser that you have installed
//   }
//   onBarcodeScan(qrvalue) {
//     //called after te successful scanning of QRCode/Barcode
//     this.setState({ qrvalue: qrvalue });
//     this.setState({ opneScanner: false });
//   }
//   onOpneScanner() {
//     var that = this;
//     //To Start Scanning
//     if (Platform.OS === "android") {
//       async function requestCameraPermission() {
//         try {
//           const granted = await PermissionsAndroid.request(
//             PermissionsAndroid.PERMISSIONS.CAMERA,
//             {
//               title: "CameraExample App Camera Permission",
//               message: "CameraExample App needs access to your camera "
//             }
//           );
//           if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//             //If CAMERA Permission is granted
//             that.setState({ qrvalue: "" });
//             that.setState({ opneScanner: true });
//           } else {
//             alert("CAMERA permission denied");
//           }
//         } catch (err) {
//           alert("Camera permission err", err);
//           console.warn(err);
//         }
//       }
//       //Calling the camera permission function
//       requestCameraPermission();
//     } else {
//       that.setState({ qrvalue: "" });
//       that.setState({ opneScanner: true });
//     }
//   }
//   render() {
//     let displayModal;
//     //If qrvalue is set then return this view
//     if (!this.state.opneScanner) {
//       return (
//         <View style={styles.container}>
//           <Text style={styles.heading}>React Native QR Code Example</Text>
//           <Text style={styles.simpleText}>
//             {this.state.qrvalue ? "Scanned QR Code: " + this.state.qrvalue : ""}
//           </Text>
//           {this.state.qrvalue.includes("http") ? (
//             <TouchableHighlight
//               onPress={() => this.onOpenlink()}
//               style={styles.button}
//             >
//               <Text style={{ color: "#FFFFFF", fontSize: 12 }}>Open Link</Text>
//             </TouchableHighlight>
//           ) : null}
//           <TouchableHighlight
//             onPress={() => this.onOpneScanner()}
//             style={styles.button}
//           >
//             <Text style={{ color: "#FFFFFF", fontSize: 12 }}>
//               Open QR Scanner
//             </Text>
//           </TouchableHighlight>
//         </View>
//       );
//     }
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <CameraKitCameraScreen
//           actions={{ rightButtonText: 'Done', leftButtonText: 'Cancel' }}
//           onBottomButtonPressed={(event) => this.onBottomButtonPressed(event)}
//           scanBarcode={true}
//           laserColor={"blue"}
//           frameColor={"yellow"}

//           onReadQRCode={((event) => Alert.alert("Qr code found"))} //optional
//           hideControls={false}           //(default false) optional, hide buttons and additional controls on top and bottom of screen
//           showFrame={true}   //(default false) optional, show frame with transparent layer (qr code or barcode will be read on this area ONLY), start animation for scanner,that stoped when find any code. Frame always at center of the screen
//           offsetForScannerFrame = {10}   //(default 30) optional, offset from left and right side of the screen
//           heightForScannerFrame = {300}  //(default 200) optional, change height of the scanner frame
//           colorForScannerFrame = {'red'} //(default white) optional, change colot of the scanner frame

//         />
//       </View>
//     );
//   }
// }

module.exports = QRScanner
