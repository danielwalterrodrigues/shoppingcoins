import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Dashboard from '../Pages/Dashboard/Dashboard'
import Shop from '../Pages/Shop/Shop'
import MinhaConta from '../Pages/MinhaConta/MinhaConta';

const Stack = createNativeStackNavigator()

  const PosLogin = () => {
  
  return (
    <>
          <Stack.Navigator initialRouteName={'Dashboard'}>
            <Stack.Screen name="Dashboard" component={Dashboard} options={{headerShown: false}} />
            <Stack.Screen name="Shop" component={Shop} options={{headerShown: false}} />
            <Stack.Screen name="MinhaConta" component={MinhaConta} options={{headerShown: false}} />
          </Stack.Navigator>
    </> 
  )
}

export default PosLogin

const styles = StyleSheet.create({})