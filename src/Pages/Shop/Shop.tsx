import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import UserProfile, { UserData, UserContextType } from '../../Contexts/UserContext';
import Header from '../../Utilities/Header';
import CustomText from '../../Utilities/CustomText';
import { windowWidth } from '../../Utilities/Dimensions';
import { useNavigation } from '@react-navigation/native';
import BoxFromBottom from '../../Utilities/BoxFromBottom';
import ProductProfile, { ProductContextType } from '../../Contexts/ProductContext';
import api from '../../Connection/Axios';
import ProductComponent from '../Shop/ProductComponent';
import { estilos } from '../../Utilities/Estilos';


const Shop = () => {
  const navigation = useNavigation()
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await api.get('/products');
        setProducts(response.data);
      } catch (error) {
        console.log('Error fetching products:', error);
      }
    }

    fetchProducts();
  }, []);

  return (
    <View style={[estilos.container, {alignItems: 'flex-start'}]}>
      <TouchableOpacity style={styles.backButton} onPress={() => {navigation.goBack()}}>
        <Image source={require('../../assets/back.png')} style={{ width: 30, height: 30, marginRight: 10 }} />
        <CustomText type='bold' style={{fontSize: 18, color: '#ffffff'}}>Voltar</CustomText>
      </TouchableOpacity>
      
      
      <BoxFromBottom top={120}>
        <View style={{width: windowWidth-40, alignSelf: 'center', marginTop: 20}}>
          <CustomText type='bold' style={{fontSize: 28, marginBottom: 20}}>Shop</CustomText>
        </View>

        <FlatList
          data={products}
          renderItem={({item}) => <ProductComponent data={item} />}
          keyExtractor={item => item.Id}
          style={styles.flat}
          scrollEnabled={false}
          numColumns={2}
        />
      </BoxFromBottom>
    </View>
  )
}

export default Shop

const styles = StyleSheet.create({
  backButton: {
    margin: 25,
    marginTop: 35,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  flat: {
    width: windowWidth-40,
    alignSelf: 'center',
    marginBottom: 30
  }
})