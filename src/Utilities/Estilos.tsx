import React from "react";
import { Platform, StyleSheet } from "react-native";
import { windowHeight, windowWidth } from "./Dimensions";

export const estilos = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: windowWidth,
        height: windowHeight,
        backgroundColor: '#7B22D3',
        paddingTop: Platform.OS === 'android' ? 35 : 0
    },
    input: {
        color: '#000000',
        paddingHorizontal: 20,
        paddingVertical: 30,
        paddingLeft: 60,
        backgroundColor: '#ffffff',
        marginVertical: 10,
        width: '100%',
        fontFamily: 'Sora-bold',
        fontSize: 20,
        borderRadius: 20,
        shadowColor: "#666666",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,

        elevation: 15,
    },
    textinput: {
        borderWidth: 1,
        color: '#000000',
        borderColor: '#d9d9d9',
        paddingHorizontal: 15,
        paddingVertical: 6,
        backgroundColor: '#ffffff',
        marginVertical: 5,
        width: windowWidth-40,
        fontFamily: 'Sora-Regular',
        fontSize: 14
    },
    botoMiniOn: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ab0600',
        borderRadius: 12,
        paddingHorizontal: 15,
        paddingVertical: 8,
        marginVertical: 5,
        width: 'auto',
        color: '#ffffff'
    },
    botoSimpleOn: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ab0600',
        borderRadius: 30,
        paddingHorizontal: 25,
        paddingVertical: 12,
        marginVertical: 5,
        width: 'auto',
        color: '#ffffff'
    },
    botoSimpleOff: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#dfdfdf',
        borderRadius: 30,
        paddingHorizontal: 25,
        paddingVertical: 15,
        marginVertical: 5,
        width: 'auto'
    },
    botoSimpleNot: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ab0600',
        borderRadius: 30,
        paddingHorizontal: 25,
        paddingVertical: 15,
        marginVertical: 5,
        width: 'auto'
    }
})