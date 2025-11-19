import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import CustomText from '../../Utilities/CustomText'
import UserProfile, { UserData, UserContextType } from '../../Contexts/UserContext';
import { estilos } from '../../Utilities/Estilos';

const Dashboard: React.FC = () => {
  const [userData, setUserData] = useContext<UserContextType>(UserProfile);

  return (
    <View style={estilos.container}>
      <CustomText>{userData?.name}</CustomText>
    </View>
  )
}

export default Dashboard

const styles = StyleSheet.create({})