  import React, { useState } from 'react';
  import { NavigationContainer } from '@react-navigation/native';
  import { createStackNavigator } from '@react-navigation/stack';
  import { StatusBar } from 'expo-status-bar';
  import { StyleSheet, Text, View, TextInput, Alert } from 'react-native';
  import { useTranslation } from 'react-i18next';
  import { I18nextProvider } from 'react-i18next';
  import i18n from './i18n';
  import Index from './views/Index';
  import ButtonView from './components/ButtonView';
  import axios from 'axios';

  const Stack = createStackNavigator();

  export default function App() {
      return (
          <I18nextProvider i18n={i18n}>
              <NavigationContainer>
                  <Stack.Navigator>
                      <Stack.Screen name="Login" component={LoginScreen} />
                      <Stack.Screen name="Index" component={Index} />
                  </Stack.Navigator>
              </NavigationContainer>
          </I18nextProvider>
      );
  }

  function LoginScreen({ navigation }) {
      const { t } = useTranslation();
      const [usuario, setUser] = useState('');
      const [password, setPassword] = useState('');

      const validarUser = async () => {
        try {
          const response = await axios.post('ip que genera al correr el proyecto :3000/user/getUser', { //la ip se tiene que cambiar, cada vez que se corre el proyecto da una ip
            user: usuario,
            password: password
          });
          
          // Verifica si response.data está vacío
          if(usuario !="" && password !=""){
            if (response.data.length === 0) {
              Alert.alert('Error', t('alertUserNot'));
            } else {
              // Verifica si las credenciales son correctas
              if (response.data[0]['usuario'] == usuario && response.data[0]['contrasenia'] == password) {
                navigation.navigate('Index', { usuario });
                setUser(null);
                setPassword(null);
              } else {
                Alert.alert('Error', t('alertUser'));
              }
            }
        }else{
          Alert.alert('Error', t('alertEmpty'));

        }
        } catch (error) {
          console.error('Error al obtener datos:', error);
        }
      };

      return (
          <View style={styles.container}>
              <Text style={styles.titulo}>{t('welcome')}</Text>
              <Text style={styles.subTitle}>{t('login')}</Text>
              <TextInput
                  style={styles.textInput}
                  placeholder={t('emailPlaceholder')}
                  onChangeText={text => setUser(text)}
              />
              <TextInput
                  style={styles.textInput}
                  placeholder={t('passwordPlaceholder')}
                  secureTextEntry
                  onChangeText={text => setPassword(text)}
              />
              <ButtonView onPress={validarUser} title={t('loginButton')} />
              <StatusBar style="auto" />
          </View>
      );
  }

  const styles = StyleSheet.create({
      container: {
          flex: 1,
          backgroundColor: '#f1f1f1',
          alignItems: 'center',
          justifyContent: 'center',
      },
      titulo: {
          fontSize: 50,
          color: '#000',
          fontWeight: 'bold',
      },
      subTitle: {
          fontSize: 30,
          color: 'gray'
      },
      textInput: {
          borderWidth: 1,
          borderColor: 'gray',
          paddingStart: 30,
          padding: 10,
          width: '80%',
          height: 50,
          marginTop: 60,
          borderRadius: 30,
          backgroundColor: '#fff',
      },
  });
