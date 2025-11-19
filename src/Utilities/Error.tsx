import React, {useState, useContext, useEffect, useRef} from 'react'
import { Animated, View, Text, StyleSheet, TouchableOpacity, Platform } from "react-native"

import { windowWidth, windowHeight } from './Dimensions'
import CustomText from './CustomText'
import ErrorProfile from '../Contexts/ErrorContext'

const TopMessage = () => {
    const [errorData, setErrorData] = useContext(ErrorProfile)
    const [showErro, setShowErro] = useState(false)
    const erro = errorData?.erro
    const erroType = errorData?.typeError
    const fadeAnim = useRef(new Animated.Value(0)).current

    useEffect(()=>{
        if(erro != '') {
            setShowErro(true)
        }
       setTimeout(() => {setShowErro(false), setErrorData({...errorData, erro: '', typeError: ''})}, 4000)
    }, [erro])

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);


    return(
        <View>
        {showErro ? 
            <Animated.View style={[styles.container, {opacity: fadeAnim, backgroundColor:
                (() => {
                    switch (erroType) {
                      case 'error': return '#810000D1'
                      case 'warning': return '#ffb900D1'
                      case 'display': return '#008432D1'
                      case 'success': return '#ffffff'
                      default:
                        return 'transparent'
                    }
                })()
            }]}>
                <View style={{flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>
                    <CustomText style={[{color: erroType === 'success' ? '#000000' : '#ffffff', fontSize: 18}]}>{erro}</CustomText>
                    {erroType === 'success' ?
                        <CustomText style={{color: '#9B9B9B', fontSize: 12}}>
                            Parabéns, sua compra foi confirmada! 🎉
                        </CustomText>
                    : null}
                </View>
            </Animated.View>
        : null}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        position:'absolute',
        zIndex: 9,
        top: 340,
        left: 30,
        width: Platform.OS === 'web' ? windowWidth-400 : windowWidth-60,
        padding: 30,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
})

export default TopMessage