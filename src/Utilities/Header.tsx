import { Image, StyleSheet, Platform, View, TouchableOpacity, Modal, Text } from 'react-native'
import type { ModalProps } from 'react-native';
import React, { useContext, useState } from 'react'
import UserProfile, { UserData, UserContextType } from '../Contexts/UserContext'
import api from '../Connection/Axios';
import ErrorProfile, { ErrorContextType } from '../Contexts/ErrorContext';
import CustomText from './CustomText';
import { estilos } from './Estilos';
import { launchCamera, CameraOptions, launchImageLibrary, ImageLibraryOptions, ImagePickerResponse } from 'react-native-image-picker';
import Botao from './Button';


const Header: React.FC = () => {
  const userAvatar = require('../assets/userAccount.png');
  const [userData, setUserData] = useContext<UserContextType>(UserProfile);
  const [errorData, setErrorData] = useContext<ErrorContextType>(ErrorProfile);  
  const [photo, setPhoto] = useState<String>()
  const [hasImage, setHasImage] = useState<Boolean>()
  const [modalVisible, setModalVisible] = useState<boolean>(false);


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
                setUserData({...userData, photoUrl: imageUri } as UserData);
                console.log('Selected image URI: ', imageUri);
            }
        }
    });
  }

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

  return (
    <>
    <View style={styles.header}>
      <View style={[estilos.lineHorizontal, {alignItems: 'center', justifyContent: 'space-between', width: '100%'}]}>
        <TouchableOpacity onPress={()=>{setModalVisible(!modalVisible)}}>
          {userData?.photoUrl? 
            <Image source={{ uri : userData?.photoUrl }} style={styles.photo} />
            :
            <Image source={userAvatar} style={styles.photo} />
            }
        </TouchableOpacity>
        <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible} 
                onRequestClose={()=>{setModalVisible(!modalVisible)}} 
            >
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{width: 300, backgroundColor: '#ffffff', borderRadius: 20, padding: 20, alignItems: 'center'}}>
                        <Botao type='blue' title='Abrir a câmera' onPress={() => {openCamera(); setModalVisible(!modalVisible)}} />
                        <Botao type='blue' title='Abrir Galeria' onPress={() => {openImagePicker(); setModalVisible(!modalVisible)}} />
                        <Botao color='#666666' title='Fechar' onPress={() => setModalVisible(!modalVisible)} />
                    </View>
                </View>  
          </Modal>
        <View style={styles.nameTitle}>
          <CustomText type='bold' style={{color: '#ffffff'}}>Shopping Coins</CustomText>
        </View>
      </View>
    </View>
    <View style={[estilos.lineHorizontal, {paddingHorizontal: 30, justifyContent: 'space-between', marginBottom: 20}]}>
      <CustomText type='regular' style={{color: '#ffffff'}}>Olá, <Text style={{fontWeight: '700'}}>{userData?.name}</Text></CustomText>
      <Image source={require('../assets/notification.png')} style={{ width: 24, height: 24}} />
    </View>
    </>
  )
}

export default Header

const styles = StyleSheet.create({
  header: { 
    width: '100%', 
    padding: 30, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    backgroundColor: '#7B22D3',
    paddingTop: Platform.OS === 'android' ? 35 : 0
  },  
  photo: { 
    width: 50, 
    height: 50, 
    borderRadius: 16,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#F9F9F966'
  },
  nameTitle: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 50,
    backgroundColor: '#000000E6',
  }
})