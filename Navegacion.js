import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import INICIARSESION from "./IniciarSesion";
import REGISTRO from "./Registro";
import INICIOVOTADOR from "./InicioVotador";
import INICIOCONTADOR from "./InicioContador";

export default class Navegacion extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Iniciar Sesion" component={INICIARSESION} options ={{headerShown:false}} />
                <Stack.Screen name="Registro" component={REGISTRO} options ={{headerShown:false}} />
                <Stack.Screen name="InicioContador" component={INICIOCONTADOR} options ={{headerShown:false}} />
                <Stack.Screen name="InicioVotador" component={INICIOVOTADOR} options ={{headerShown:false}} />
            </Stack.Navigator>
        </NavigationContainer>
      
    );
  }
}