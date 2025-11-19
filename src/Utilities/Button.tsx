import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CustomText from './CustomText'
import { windowWidth } from './Dimensions'

interface BotaoProps {
    type?: 'blue' | 'transparent' | 'google' | 'apple';
    title: string;
    onPress: () => void;
    style?: object;
    color?: string;
}

const Botao: React.FC<BotaoProps> = (props) => {
    
    
        switch(props.type) {            
            case 'blue':
                return (
                    <TouchableOpacity onPress={props.onPress} style={[styles.button, props.style, {backgroundColor: '#7B22D3'}]}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <CustomText type='bold' style={{color: '#ffffff', fontFamily: 'Sora-Regular', fontSize: 20}}>{props.title}</CustomText>
                        </View>
                    </TouchableOpacity>
                )               
            case 'transparent':
                return (
                    <TouchableOpacity onPress={props.onPress} style={[styles.buttonTransparent, props.style, {borderColor: props.color}]}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>                           
                            <CustomText type='bold' style={{color: props.color, fontFamily: 'Sora-Regular', fontSize: 20}}>{props.title}</CustomText>
                        </View>
                    </TouchableOpacity>
                )
            default:
                return (
                    <TouchableOpacity onPress={props.onPress} style={[styles.button, props.style]}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <CustomText type='bold' style={{color: '#000000', fontFamily: 'Sora-Regular', fontSize: 20}}>{props.title}</CustomText>
                        </View>
                    </TouchableOpacity>
                  )
          }
  
}

export default Botao

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        paddingVertical: 15,
        marginVertical: 10,
        paddingHorizontal: 40,
        fontFamily: 'Sora-Bold'
    },

    buttonTransparent: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        paddingVertical: 15,
        marginVertical: 10,
        paddingHorizontal: 40,
        fontFamily: 'Sora-Bold'
    }
})