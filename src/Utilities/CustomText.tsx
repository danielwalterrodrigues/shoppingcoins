import { StyleSheet, Text } from 'react-native'
import React from 'react'

interface CustomTextProps {
    children: React.ReactNode,
    type?: 'regular' | 'bold' | 'light' | 'medium',
    style?: object
}

const CustomText = (props: CustomTextProps) => {

  const type = () => {
    switch (props.type) {
      case 'regular':
        return 'Sora-Regular'
      case 'bold':
        return 'Sora-Bold'
      case 'light':
        return 'Sora-Light'
      case 'medium':
        return 'Sora-Medium'
      default:
        return 'Sora-Regular'
    }
  }
  return (
      <Text style={[styles.text, props.style, {fontFamily: type()}]}>
        {props.children}
      </Text>

  )
}

export default CustomText

const styles = StyleSheet.create({
    text: {
        fontSize: 17,
        letterSpacing: 0.3,
        color: '#000000'
    }
})