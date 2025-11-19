import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import CartProfile, { CartContextType, CartData} from '../../Contexts/CartContext';
import UserProfile, {UserContextType, UserData} from '../../Contexts/UserContext';
import ErrorProfile, { ErrorContextType } from '../../Contexts/ErrorContext';
import notifee,{ Notification } from '@notifee/react-native';
import { windowWidth } from '../../Utilities/Dimensions';
import CustomText from '../../Utilities/CustomText';
import { estilos } from '../../Utilities/Estilos';
import { storage } from '../../../App';
import { CANAL_ID } from '../../../App';


const ProductComponent = (props: any) => {
    const product = props.data;
    const [cartData, setCartData] = useContext<CartContextType>(CartProfile);
    const [userData, setUserData] = useContext<UserContextType>(UserProfile);
    const [errorData, setErrorData] = useContext<ErrorContextType>(ErrorProfile);
    const [cartCheck, setCartCheck] = useState<any[]>([]);

    async function sendLocalNotification(title: string, body: string): Promise<void> {
      
      const notification: Notification = {
        title: title,
        body: body,
        android: {
          channelId: CANAL_ID, 
          pressAction: {
            id: 'default', 
          },
          smallIcon: 'ic_launcher',
        },
        ios: {

        }
      };
      await notifee.displayNotification(notification);
    }

    function addToCart(data: any) {
        cartCheck.push(data.Id);
        let date = new Date();
        setCartData({
            ...cartData,
            items: [
                ...((cartData as any)?.items || []),
                {
                    productId: data.Id,
                    productName: product.name,
                    qty: 1,
                    paymentDate: date,
                    userId: userData?.userId || 0,
                    amount: product.price,
                    added: true
                }
            ]
        } as CartData);
        setErrorData({...errorData, erro : `${product.name} está a caminho!`, typeError : 'success'})
        sendLocalNotification(`Parabéns pela sua compra!`, `${product.name} está a caminho!`);
    }


    useEffect(() => {
            storage.set('cartData', JSON.stringify(cartData));
    }, [cartData]);

    return (
    <View style={styles.cartBox}>
        <Image source={{uri: product.imageUri}} style={styles.image} resizeMode='cover' />
        <View style={{paddingTop:15, paddingHorizontal:20}}>
            <CustomText type='bold' style={{fontSize: 16}}>{product.name}</CustomText>
            <CustomText style={{fontSize: 13, color: '#9B9B9B'}}>{product.category}</CustomText>
        </View>
        <View style={[estilos.lineHorizontal, {paddingHorizontal:20, paddingBottom:15, justifyContent: 'space-between', alignItems: 'flex-end'}]}>
            <View>
                <CustomText type='bold' style={{fontSize: 14, color: '#7B22D3'}}>Lc</CustomText>
                <CustomText type='bold' style={{fontSize: 18, color: '#7B22D3'}}>{(product.price).toFixed(2)}</CustomText>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => {cartCheck?.includes(product.Id) ? null : addToCart(product)}}>
                <Image source={cartCheck?.includes(product.Id) ? require('../../assets/check-circle.png') : require('../../assets/shopping-cart.png')} style={{ width: 18, height: 18 }} />
            </TouchableOpacity>
        </View>
    </View>
    )
}

export default ProductComponent

const styles = StyleSheet.create({
    cartBox: {
        marginRight: 20,
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: (windowWidth / 2) - 30,
        height: 235,
        justifyContent: 'space-between',
        marginBottom: 20
    },
    image: {
        width: '100%',
        height: 100, 
        borderTopLeftRadius: 20, 
        borderTopRightRadius: 20, 
        overflow: 'hidden'
    },
    button: {
        backgroundColor: '#7B22D3',
        padding: 10,
        borderRadius: 12
    }
})