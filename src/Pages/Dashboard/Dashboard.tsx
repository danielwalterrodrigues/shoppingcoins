import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import UserProfile, { UserData, UserContextType } from '../../Contexts/UserContext';
import { estilos } from '../../Utilities/Estilos';
import Header from '../../Utilities/Header';

const Dashboard: React.FC = () => {
  const [userData, setUserData] = useContext<UserContextType>(UserProfile);

  return (
    <View style={estilos.container}>
      <Header />
    </View>
  )
}

export default Dashboard

const styles = StyleSheet.create({})