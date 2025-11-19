import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';

interface BoxFromBottomProps {
    children: React.ReactNode,
    top: number
}

const BoxFromBottom = (props: BoxFromBottomProps) => {
    const page = useRoute().name;
    const navigation = useNavigation();

  return (
    
    <Animated.View entering={SlideInDown} exiting={SlideOutDown} style={[styles.box, {top: props.top}]}>
        <ScrollView showsVerticalScrollIndicator={false} style={{flexGrow: 1}}>
            {props.children}
        </ScrollView>

        <View style={styles.bottomMenu}>
            <TouchableOpacity style={styles.bottomButton} onPress={()=>{navigation.navigate('Dashboard' as never)}}>
                <Image source={require('../assets/home.png')} style={{tintColor: page === 'Dashboard' ? '#7B22D3' : '#8D8D8D'}} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottomButton} onPress={()=>{navigation.navigate('Shop' as never)}}>
                <Image source={require('../assets/bag2.png')} style={{tintColor: page === 'Shop' ? '#7B22D3' : '#8D8D8D'}} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottomButton} onPress={()=>{navigation.navigate('MinhaConta' as never)}}>
                <Image source={require('../assets/minha-conta.png')} style={{tintColor: page === 'MinhaConta' ? '#7B22D3' : '#8D8D8D'}} />
            </TouchableOpacity>
        </View>
    </Animated.View>
  )
}

export default BoxFromBottom

const styles = StyleSheet.create({
    box: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: '#F9F9F9',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
    },
    bottomMenu: {
        position: 'absolute', 
        bottom: 0, 
        left: 0,
        backgroundColor: '#ffffff',
        width: '100%',
        height: 90,
        alignItems: 'center',
        borderTopColor: '#E0E0E0',
        borderTopWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'  
    },
    bottomButton: {
        padding: 10
    }
})