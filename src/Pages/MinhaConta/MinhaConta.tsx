import { StyleSheet, TouchableOpacity, Image, View, Modal, TextInput } from 'react-native'
import React, { useContext, useEffect, useState} from 'react'
import { estilos } from '../../Utilities/Estilos'
import BoxFromBottom from '../../Utilities/BoxFromBottom'
import UserProfile, { UserData, UserContextType } from '../../Contexts/UserContext'
import ErrorProfile, { ErrorContextType } from '../../Contexts/ErrorContext';
import { launchCamera, CameraOptions, launchImageLibrary, ImageLibraryOptions, ImagePickerResponse } from 'react-native-image-picker';
import Botao from '../../Utilities/Button';
import CustomText from '../../Utilities/CustomText'
import { windowWidth } from '../../Utilities/Dimensions'
import { storage } from '../../../App'
import moment from 'moment'

type Item = {
  productId: string;
  qty: number;
  paymentDate: string;
  userId: string;
  amount: number;
  added: boolean;
};

type ResponseData = {
  items: Item[];
};

const MinhaConta = () => {
    const userAvatar = require('../../assets/userAccount.png');
    const [userData, setUserData] = useContext<UserContextType>(UserProfile);
    const [errorData, setErrorData] = useContext<ErrorContextType>(ErrorProfile);  
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [openContener, setOpenContener] = useState<string>('allButtons');
    const [history, setHistory] = useState<ResponseData>({ items: [] })


    const openCamera = (): void => {
        const options: CameraOptions = {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 2000,
        maxWidth: 2000,
        quality: 0.8, 
        cameraType: 'back',
        };

    launchCamera(options, (response: ImagePickerResponse) => {
            if (response.didCancel) {
                console.log('Câmera cancelada pelo usuário.');
                
            } else if (response.errorCode) {
                console.log('Erro de câmera:', response.errorCode, response.errorMessage);
            } else {
                let imageUri: string | undefined = response.assets?.[0]?.uri;
                if (imageUri) {
                    setUserData(prev => prev ? { ...prev, photoUrl: imageUri } : prev);
                    console.log('Selected image URI: ', imageUri);
                }
            }
        });
    }

    useEffect(() => {
        storage.set('userData', JSON.stringify(userData));
    }, [userData])

    useEffect(()=>{
        const data = storage.getString('cartData');
        if (data) {
            try {
                const parsed = JSON.parse(data) as ResponseData;
                setHistory(parsed);
            } catch (e) {
                console.warn('Falha ao parsear cartData:', e);
                setHistory({ items: [] });
            }
        } else {
            setHistory({ items: [] });
        }
    }, [])


    const openImagePicker = (): void => {
        const options: ImageLibraryOptions = {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 2000,
        maxWidth: 2000,
        };

        launchImageLibrary(options, (response: ImagePickerResponse) => {
        if (response.didCancel) {
                console.log('Image picker cancelled.');
            } else if (response.errorCode) {
                console.log('Image picker error message: ', response.errorMessage);
            } else {
                let imageUri: string | undefined = response.assets?.[0]?.uri;
                if (imageUri) {
                    setUserData({...userData, photoUrl: imageUri } as UserData);
                    console.log('Selected image URI: ', imageUri);
                }
            }
        });
    };

    console.log('Histo', history)
  return (
    <View style={estilos.container}>
      <TouchableOpacity onPress={()=>{setModalVisible(!modalVisible)}} style={styles.topArea}>
          {userData?.photoUrl? 
            <Image source={{ uri : userData?.photoUrl }} style={styles.photo} />
            :
            <Image source={userAvatar} style={styles.photo} />
            }
            <View style={styles.botaoPhoto}>
                <Image source={require('../../assets/camera.png')} style={{width: 23, height: 17}} />
            </View>
        </TouchableOpacity>

        <View style={styles.nameTitle}>
            <CustomText style={{color: '#ffffff'}}>Editar Perfil</CustomText>
        </View>
        <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible} 
                onRequestClose={()=>{setModalVisible(!modalVisible)}} 
            >
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{width: 350, borderWidth: 2, borderColor: '#00000033', backgroundColor: '#ffffff', borderRadius: 20, padding: 20, alignItems: 'center'}}>
                        <Botao type='blue' title='Abrir a câmera' onPress={() => {openCamera(); setModalVisible(!modalVisible)}} />
                        <Botao type='blue' title='Abrir Galeria' onPress={() => {openImagePicker(); setModalVisible(!modalVisible)}} />
                        <Botao color='#666666' title='Fechar' onPress={() => setModalVisible(!modalVisible)} />
                    </View>
                </View>  
          </Modal>

      <BoxFromBottom top={320}>
        <View style={{marginTop: 40, alignItems: 'center'}}>
            {openContener === 'allButtons' ?
            <>
                <TouchableOpacity onPress={() => {setOpenContener('profileDetails')}} style={styles.botaoDefault}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image source={require('../../assets/minha-conta2.png')} style={{ width: 45, height: 45, marginRight: 30 }} />
                        <CustomText type='bold' style={{fontSize: 20}}>Detalhes do Perfil</CustomText>
                    </View>
                    <Image source={require('../../assets/go-arrow.png')} style={{ width: 14, height: 16 }} />
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => {setOpenContener('accountDetails')}} style={styles.botaoDefault}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image source={require('../../assets/detalhes-conta.png')} style={{ width: 35, height: 35, marginRight: 30 }} />
                        <CustomText type='bold' style={{fontSize: 20}}>Detalhes da Conta</CustomText>
                    </View>
                    <Image source={require('../../assets/go-arrow.png')} style={{ width: 14, height: 16 }} />
                </TouchableOpacity>

                
                <TouchableOpacity onPress={() => {setOpenContener('history')}} style={styles.botaoDefault}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image source={require('../../assets/history.png')} style={{ width: 35, height: 35, marginRight: 30 }} />
                        <CustomText type='bold' style={{fontSize: 20}}>Histórico</CustomText>
                    </View>
                    <Image source={require('../../assets/go-arrow.png')} style={{ width: 14, height: 16 }} />
                </TouchableOpacity>

                <Botao type='blue' title='Sair' onPress={() => { setUserData(prev => prev ? { ...prev, logged: false } : prev); }} style={{marginTop: 20, marginBottom: 40}} />
            </>
            : null}
            {openContener === 'profileDetails' ?
                <View style={styles.contener}>
                    <CustomText type='bold' style={styles.contenerTitle}>Detalhes do Perfil</CustomText>
                    
                    <View style={estilos.lineHorizontal}>
                        <Image source={require('../../assets/user.png')} style={{ width: 24, height: 24, position: 'absolute', left: 20, zIndex: 1 }} />
                        <TextInput style={estilos.input} placeholder='Nome' value={userData?.name} onChangeText={(text) => setUserData(prev => prev ? { ...prev, name: text } : prev)} />
                    </View>
                    
                    <CustomText style={{marginBottom: 10}}>User ID: <CustomText type='bold'>{userData?.userId}</CustomText></CustomText>
                    <CustomText style={{marginBottom: 10}}>Email: <CustomText type='bold'>{userData?.username}</CustomText></CustomText>
                    
                    <View style={estilos.lineHorizontal}>
                        <Botao type='blue' title='Salvar' onPress={() => {setOpenContener('allButtons')}} style={{marginTop: 20, marginBottom: 40, marginLeft: 30}} />
                        <Botao title='Voltar' onPress={() => {setOpenContener('allButtons')}} style={{marginTop: 20, marginBottom: 40}} />
                    </View>
                </View>
            : null}
            {openContener === 'accountDetails' ?
                
                <View style={styles.contener}>
                    <CustomText type='bold' style={styles.contenerTitle}>Detalhes da Conta</CustomText>
                    
                    <CustomText style={{marginBottom: 10}}>Saldo: Lc <CustomText type='bold'>{(userData?.balance)?.toFixed(2)}</CustomText></CustomText>
                    <CustomText style={{marginBottom: 10}}>Cliente desde: <CustomText type='bold'>{moment(userData?.signupDate).format('DD/MM/YYYY - HH:mm')}</CustomText></CustomText>

                    <View style={estilos.lineHorizontal}>
                        <Botao title='Voltar' onPress={() => {setOpenContener('allButtons')}} style={{marginTop: 20, marginBottom: 40}} />
                    </View>
                </View>
            : null}
            {openContener === 'history' ?
                <View style={styles.contener}>
                    <CustomText type='bold' style={styles.contenerTitle}>Histórico de Pedidos</CustomText>
                    
                    {history?.items?.map((hist: Item, index)=>(
                        <View key={index} style={styles.boxProduct}>
                            <CustomText type='bold'>{moment(hist.paymentDate).format('DD/MM/YYYY - HH:mm:SS')}</CustomText>
                            <CustomText type='bold'>{hist.productName}</CustomText>
                            <CustomText>Produto: {hist.productId}</CustomText>
                            <CustomText>Preço: Lc {hist.amount.toFixed(2)}</CustomText>
                        </View>
                    ))}

                    <View style={estilos.lineHorizontal}>
                        <Botao title='Voltar' onPress={() => {setOpenContener('allButtons')}} style={{marginTop: 20, marginBottom: 40}} />
                    </View>
                </View>
            : null}
        </View>
      </BoxFromBottom>
    </View>
  )
}

export default MinhaConta

const styles = StyleSheet.create({
    photo: { 
        width: 120, 
        height: 110, 
        borderRadius: 20,
        backgroundColor: '#ffffff',
        borderWidth: 6,
        borderColor: '#ffffff4D',
        shadowColor: "#666666",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,

        elevation: 15,
},
  nameTitle: {
    marginTop: 35,
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderRadius: 50,
    backgroundColor: '#000000E6',
  },
  topArea: {
    marginTop: 45,
    alignItems: 'center',
  },
  botaoPhoto: {
    marginTop: -15,
    backgroundColor: '#ffffff',
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    shadowColor: "#666666",
    shadowOffset: {
        width: 0,
        height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 15,
  },
  botaoDefault: {
    marginBottom: 20,
    backgroundColor: '#ffffff',
    width: windowWidth-40,
    height: 100,
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 40,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderRadius: 40,
    shadowColor: "#666666",
    shadowOffset: {
        width: 0,
        height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 15,
  },
    contener: {
        width: windowWidth-60,
        justifyContent: 'center',
    },
    contenerTitle: {
        fontSize: 22,
        marginBottom: 20
    },
    boxProduct: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 15,
        shadowColor: "#666666",
        shadowOffset: {
            width: 0,
            height: 7,
        },
    }
})