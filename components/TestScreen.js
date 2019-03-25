import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  title: {
    fontSize: 100
  }
})

const TestScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={styles.title}>Test</Text>
    </View>
  )
}

export default TestScreen
