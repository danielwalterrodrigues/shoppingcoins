import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const BottomMenu: React.FC = () => {
  return (
    <View>
      <TouchableOpacity>
        <Image source={require('../assets/home.png')} />
      </TouchableOpacity>
    </View>
  )
}

export default BottomMenu

const styles = StyleSheet.create({})