import { Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext, useState } from 'react'
import Animated, {SlideInDown, SlideOutDown} from 'react-native-reanimated';
import UserProfile, { UserData, UserContextType } from '../../Contexts/UserContext';
import api from '../../Connection/Axios';
import ErrorProfile, { ErrorContextType } from '../../Contexts/ErrorContext';
import CustomText from '../../Utilities/CustomText';
import { estilos } from '../../Utilities/Estilos';
import Botao from '../../Utilities/Button';

const Login: React.FC = () => {
    const logo = require('../../assets/logo.png');
    const [userData, setUserData] = useContext<UserContextType>(UserProfile);
    const [errorData, setErrorData] = useContext<ErrorContextType>(ErrorProfile);

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    function ValidateEmail(): void {
        var re = /\S+@\S+\.\S+/;
        if (re.test(username) === true) {
            GoLogin()
        } else {
            setErrorData({ ...errorData, erro: 'Digite um email válido', typeError: 'error' });
        }
    }

    async function GoLogin(): Promise<void> {
        setLoading(true);
        try {
            await api.post('/login', {
                username: username,
                password: password
            }).then((response) => {
                const data: UserData = response.data.user;
                setUserData(data);
            });

        } catch (error: any) {
            setLoading(false);
            let errorMessage = 'Ocorreu um erro ao fazer login. Por favor, tente novamente.';    
            setErrorData({...errorData, erro : errorMessage, typeError : 'error'})
        } finally {
            setLoading(false);
        }
    }

    console.log('User Data:', userData);

  return (
    <View style={estilos.container}>
      <Image source={logo} style={{ width: 312, height: 157, marginTop:140 }} />
      <Animated.View entering={SlideInDown.delay(300)} exiting={SlideOutDown} style={styles.loginBox}>
        <CustomText type='bold' style={{fontSize: 25}}>Login</CustomText>
        <View style={styles.lineInput}>
            <Image source={require('../../assets/user.png')} style={{ width: 24, height: 24, position: 'absolute', left: 20, zIndex: 1 }} />
            <TextInput style={estilos.input} placeholder='Email' placeholderTextColor='#000000' keyboardType='email-address' autoCapitalize='none' value={username} onChangeText={(text) => setUsername(text)} />
        </View>
        <View style={styles.lineInput}>
            <Image source={require('../../assets/lock.png')} style={{ width: 24, height: 24, position: 'absolute', left: 20, zIndex: 1 }} />
            <TextInput style={estilos.input} placeholder='Senha' placeholderTextColor='#7a7a7a' secureTextEntry={true} value={password} onChangeText={(text) => setPassword(text)} />
        </View>
        <Botao type='blue' title={loading ? 'Carregando...' : 'Entrar'} onPress={ValidateEmail} style={{marginVertical: 30}} />
        <View style={[styles.lineInput, {marginBottom: 50}]}>
            <CustomText type='regular' style={{fontSize: 14, color: '#9B9B9B'}}>Registrar-se | Resetar senha</CustomText>
        </View>
      </Animated.View>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#7B22D3',
    },
    loginBox: { 
        width: '100%', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        position: 'absolute',
        bottom: 0,
        left: 0,
        paddingHorizontal: 20,
        paddingTop: 30,
        paddingBottom: 50
    },
    lineInput: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})