import { Image, ScrollView, StyleSheet, Platform, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import UserProfile, { UserData, UserContextType } from '../../Contexts/UserContext';
import { estilos } from '../../Utilities/Estilos';
import Header from '../../Utilities/Header';
import CustomText from '../../Utilities/CustomText';
import { windowWidth } from '../../Utilities/Dimensions';
import { useNavigation } from '@react-navigation/native';
import BoxFromBottom from '../../Utilities/BoxFromBottom';
import ProductProfile, { ProductContextType } from '../../Contexts/ProductContext';
import api from '../../Connection/Axios';
import ProductComponent from '../Shop/ProductComponent';
import Botao from '../../Utilities/Button';

const Dashboard: React.FC = () => {
  const [userData, setUserData] = useContext<UserContextType>(UserProfile);
  const [productData, setProductData] = useContext<ProductContextType>(ProductProfile);
  const [homeProducts, setHomeProducts] = useState<any[]>([]);
  const navigate = useNavigation()


  async function loadProducts() {
    try {
      const response = await api.get('/homeproducts');
      setHomeProducts(response.data);
    }
    catch (error) {
      console.log('Error loading products:', error);
    }
  }
  React.useEffect(() => {
    loadProducts();
  }, []);

  console.log('Home Products:', homeProducts);

  return (
    <View style={estilos.container}>
      <Header />
      <View style={styles.balanceBox}>
        <View style={styles.linhaHorizontal}>
          <Image source={require('../../assets/wallet.png')} style={{ width: 24, height: 24, marginRight: 10 }} />
          <CustomText style={{fontSize: 20}}>Lc <CustomText style={{fontWeight: 700, fontSize: 25}}>{userData?.balance.toFixed(2)}</CustomText></CustomText>
        </View>
        <TouchableOpacity style={[styles.linhaHorizontal, {borderLeftWidth: 2, borderLeftColor: '#dbdbdbff', paddingLeft: 30}]} onPress={() => navigate.navigate('Shop' as never)}>
          <Image source={require('../../assets/shopping-bag.png')} style={{ width: 24, height: 24, marginRight: 10 }} />
          <CustomText type='regular' style={{fontSize: 20}}>Shop</CustomText>
        </TouchableOpacity>
      </View>
      <BoxFromBottom top={180}>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={styles.banner}>
          <View style={{flexDirection: 'row', width: windowWidth-80, justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 25}}>
            <Image source={require('../../assets/bannerImg.png')} style={{ width: 110, height: 110 }} />
            <View>
              <CustomText type='bold' style={{fontSize: 16, color: '#ffffff'}}>Pacote ACAPULCO</CustomText>
              <CustomText type='regular' style={{fontSize: 12, color: '#ffffff'}}>Guatemala - México</CustomText>
              <View style={{flexDirection: 'row', alignItems: 'baseline', marginTop: 10}}>
                <CustomText style={{fontSize: 15, color: '#ffffff'}}>Lc </CustomText>
                <CustomText type='bold' style={{fontSize: 25, color: '#ffffff'}}>50.000,00</CustomText>
              </View>
            </View>
          </View>
        </View>


        <View style={styles.banner}>
          <View style={{flexDirection: 'row', width: windowWidth-75, justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 25}}>
            <Image source={require('../../assets/bannerImg.png')} style={{ width: 110, height: 110 }} />
            <View>
              <CustomText type='bold' style={{fontSize: 16, color: '#ffffff'}}>Pacote ACAPULCO</CustomText>
              <CustomText type='regular' style={{fontSize: 12, color: '#ffffff'}}>Guatemala - México</CustomText>
              <View style={{flexDirection: 'row', alignItems: 'baseline', marginTop: 10}}>
                <CustomText style={{fontSize: 15, color: '#ffffff'}}>Lc </CustomText>
                <CustomText type='bold' style={{fontSize: 25, color: '#ffffff'}}>50.000,00</CustomText>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.linhaHorizontal, {alignItems: 'flex-start'}]}>
        {homeProducts?.map((product, index) => (
          <ProductComponent key={index} data={product} />   
        ))}
      </View>
      <View style={{paddingHorizontal: 20, marginVertical: 30}}>
        <Botao type='blue' title='Ver todos os produtos' onPress={() => navigate.navigate('Shop' as never)} />
      </View>
      </BoxFromBottom>
    </View>
  )
}

export default Dashboard

const styles = StyleSheet.create({
  balanceBox: {
    position: 'absolute',
    top: 150,
    zIndex: 20,
    width: windowWidth - 60,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    shadowColor: "#000000",
    shadowOffset: {
        width: 0,
        height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  linhaHorizontal: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20
  },
  banner: {
    width: windowWidth - 75,
    height: 120,
    backgroundColor: '#7B22D3',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 85,
    paddingHorizontal: 20,
    marginLeft: 20
  }
})