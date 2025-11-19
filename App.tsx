import React, { useState } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createMMKV } from 'react-native-mmkv'
import CustomText from './src/Utilities/CustomText';

import CartProfile, { CartContextType, CartData } from './src/Contexts/CartContext';
import UserProfile, { UserContextType, UserData } from './src/Contexts/UserContext';
import ErrorProfile, { ErrorContextType, ErrorData } from './src/Contexts/ErrorContext';
import NotificationProfile, { NotificationContextType } from './src/Contexts/NotificationContext';
import { NavigationContainer } from '@react-navigation/native';

import TopMessage from './src/Utilities/Error';
import PosLogin from './src/Routes/posLogin';
import PreLogin from './src/Routes/preLogin';
  
export const storage = createMMKV()

function App() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [cartData, setCartData] = useState<CartData | null>(null);
  const [errorData, setErrorData] = useState<ErrorData | null>(null);

  const userContextValue: UserContextType = [userData, setUserData];
  const cartContextValue: CartContextType = [cartData, setCartData];
  const errorContextValue: ErrorContextType = [errorData, setErrorData];
  const notificationContextValue: NotificationContextType = [null, () => {}];
  

  return (
      <UserProfile.Provider value={userContextValue}>
        <CartProfile.Provider value={cartContextValue}>
          <ErrorProfile.Provider value={errorContextValue}>
            <NavigationContainer>
              <View style={styles.container}>
                <TopMessage />
                {userData?.logged ? <PosLogin /> : <PreLogin />}
              </View>
            </NavigationContainer>
          </ErrorProfile.Provider>
        </CartProfile.Provider>
      </UserProfile.Provider>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
