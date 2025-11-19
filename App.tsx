import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createMMKV } from 'react-native-mmkv'
import CustomText from './src/Utilities/CustomText';

import CartProfile, { CartContextType, CartData } from './src/Contexts/CartContext';
import UserProfile, { UserContextType, UserData } from './src/Contexts/UserContext';
import ErrorProfile, { ErrorContextType, ErrorData } from './src/Contexts/ErrorContext';
import { NavigationContainer } from '@react-navigation/native';

import TopMessage from './src/Utilities/Error';
import PosLogin from './src/Routes/posLogin';
import PreLogin from './src/Routes/preLogin';
import ProductProfile, { ProductContextType, ProductData } from './src/Contexts/ProductContext';
import notifee, { AndroidImportance, Notification } from '@notifee/react-native';
  
export const storage = createMMKV()
export const CANAL_ID = 'shopping_coins';

function App() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [cartData, setCartData] = useState<CartData | null>(null);
  const [errorData, setErrorData] = useState<ErrorData | null>(null);
  const [productData, setProductData] = useState<ProductData | null>(null);

  const userContextValue: UserContextType = [userData, setUserData];
  const cartContextValue: CartContextType = [cartData, setCartData];
  const errorContextValue: ErrorContextType = [errorData, setErrorData];
  const productContextValue: ProductContextType = [productData, setProductData];

  useEffect(()=>{
    setupNotificationChannel()
  }, [])

  async function setupNotificationChannel(): Promise<void> {
  
  await notifee.requestPermission(); 

  await notifee.createChannel({
    id: CANAL_ID,
    name: 'Alertas Locais de compras no Shopping Coins',
    importance: AndroidImportance.HIGH, 
  });
}

  return (
      <UserProfile.Provider value={userContextValue}>
        <CartProfile.Provider value={cartContextValue}>
          <ErrorProfile.Provider value={errorContextValue}>
            <ProductProfile.Provider value={productContextValue}>
              <NavigationContainer>
                <View style={styles.container}>
                  <TopMessage />
                  {userData?.logged ? <PosLogin /> : <PreLogin />}
                </View>
              </NavigationContainer>
            </ProductProfile.Provider>
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
