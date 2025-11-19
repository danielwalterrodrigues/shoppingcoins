import { StyleSheet } from 'react-native';
import React from 'react';
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from '@react-navigation/native'; // Necessário para tipar props de rota/screen

import Login from '../Pages/Auth/Login';

// 1. Defina o tipo para as rotas e seus parâmetros
// Onde a chave é o nome da rota (Screen name) e o valor é o tipo dos parâmetros.
// 'undefined' significa que a rota não aceita parâmetros.
export type PreLoginStackParamList = {
    Login: undefined; 
    // Exemplo de outra rota que aceita parâmetros:
    // ForgotPassword: { email: string };
};

// 2. Defina os tipos para as Props de Navegação
// Útil se você precisar injetar o tipo de navegação em um componente (como o 'Login')
export type PreLoginNavigationProp = NativeStackNavigationProp<
    PreLoginStackParamList,
    'Login' // Rota inicial ou padrão
>;

// 3. Crie o Stack Navigator tipado
const LoginStack = createNativeStackNavigator<PreLoginStackParamList>();

// 4. Componente principal tipado
const PreLogin: React.FC = () => {
    return (
        // O Navigator agora usa o tipo PreLoginStackParamList
        <LoginStack.Navigator initialRouteName={'Login'}>
            <LoginStack.Screen 
                name="Login" 
                component={Login} 
                options={{ headerShown: false }} 
            />
        </LoginStack.Navigator>
    );
}

export default PreLogin;

const styles = StyleSheet.create({})