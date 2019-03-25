import React, { Component } from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'


const styles = StyleSheet.create({
  title: {
    fontSize: 100
  }
})

export default class HomeScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.title}>cARd</Text>
        <Button
          title="Go To Test Page"
          onPress={() => this.props.navigation.navigate('Test')}
        />
      </View>
    )
  }
}
