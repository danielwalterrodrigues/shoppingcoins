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
                      case 'success': return '#15803dD1'
                      default:
                        return 'transparent'
                    }
                })()
            }]}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <CustomText style={[{color: '#ffffff', fontFamily: 'Astonpoliz', fontSize: 15}]}>{erro}</CustomText>
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
        top: 40,
        left: 30,
        width: Platform.OS === 'web' ? windowWidth-400 : windowWidth-60,
        padding: 30,
        borderRadius: 10
    }
})

export default TopMessage