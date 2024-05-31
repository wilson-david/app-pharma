import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next'; 
import Card from '../components/Card';
import axios from 'axios';

export default function Index() {
  const navigation = useNavigation();
  const route = useRoute(); 
  const { usuario } = route.params; 
  const { t } = useTranslation(); 

  const [modalVisible, setModalVisible] = useState(false);
  const [dataPedido, setDataPedido] = useState([]); 
  const [id, setId] = useState(0);

  const handleLongPress = (orderId) => {
    setId(orderId);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const cambioEstado = async () => {
    try {
      const response = await axios.post('ip que genera al correr el proyecto :3000/user/setEstado', { //la ip se tiene que cambiar, cada vez que se corre el proyecto da una ip
        ordenId: id

      });
      console.log(response.data);
      setModalVisible(false);
      getPedidos();
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };

  const getPedidos = async () => {
    try {
      const response = await axios.get('ip que genera al correr el proyecto :3000/user/getPedido', { //la ip se tiene que cambiar, cada vez que se corre el proyecto da una ip
        user: 'prba'
      });
      setDataPedido(response.data); 
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };

  useEffect(() => {
    getPedidos();
  }, []);

  return (
    <View style={styles.container}>

      <Text style={styles.modalText}>{t('welcome')} <Text style={{ fontWeight: 'bold' }}>{usuario}</Text></Text>
      <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.scrollView}>
        {dataPedido.map((pedido, index) => (
          <Card 
            key={index}
            orden={pedido.id_ordenes}
            direccion={pedido.direccion}
            contacto={pedido.telefono}
            fecha={pedido.fecha}
            nombre={pedido.nombre}
            precio={pedido.precio}
            onLongPress={() => handleLongPress(pedido.id_ordenes)} 
          />
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>{t('goBackButton')}</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <TouchableWithoutFeedback onPress={handleCloseModal}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>{t('order')} #{id}</Text>
                <TouchableOpacity style={styles.modalButton} onPress={cambioEstado}>
                  <Text style={styles.modalButtonText}>{t('delivered')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButton} onPress={handleCloseModal}>
                  <Text style={styles.modalButtonText}>{t('close')}</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
  },
  scrollContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    marginTop: -20, // Margen superior añadido al contenedor del ScrollView
  },
  scrollView: {
    height: 300, // Ajusta la altura según sea necesario
    width: '90%', // Ajusta el ancho según sea necesario
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginTop: 100, // Margen superior añadido al botón
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
  },
  modalButton: {
    padding: 10,
    marginTop: 10,
    backgroundColor: 'lightblue',
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'white',
  },
});
