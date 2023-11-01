import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { NavigationContext } from '@react-navigation/native';

export default class Inicio extends Component {
  static contextType = NavigationContext;
  constructor(props) {
    super(props);
    this.state = {
      codigo: "",
      password: "",
    };
  }

  render() {
    const navigation = this.context;

    const iniciarSesion = () => {
      console.log("Has dado click al boton de ingresar");
      console.log("Código: " + this.state.codigo);
      console.log("Contraseña: " + this.state.password);
    }

    const registrar = () => {
        console.log("Has dado click al boton de registrar");
        navigation.navigate("Registro");
      }

    return (
      <View style={styles.fondo}>
        <View style={styles.logoContainer}>
          <Image source={require('./imagenes/logo.png')} style={styles.logo} />
          <Text style={styles.tittle}>VotaCUCEI</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text>Iniciar Sesion</Text>
          <TextInput style={styles.input}
            placeholder="Código" 
            onChangeText={codigo => this.setState({ codigo })}
          />
          <TextInput style={styles.input}
            placeholder="Contraseña"
            secureTextEntry={true}
            onChangeText={password => this.setState({ password })}
          />
          <TouchableOpacity style={styles.botonLogin}
            onPress={iniciarSesion}
          >
            <Text style={styles.botonLoginText}>Ingresar</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.registerContainer}>
          <Text style={styles.buttonTextRegister1}>No tienes cuenta?</Text>
          <TouchableOpacity style={styles.buttonRegister}
            onPress={registrar}
          >
            <Text style={styles.buttonTextRegister2}>Registrar</Text>
          </TouchableOpacity>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fondo: {
    backgroundColor: "black",
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  logoContainer: {
    marginTop: 50,
  },
  logo: {
    width: 300,
    height: 310,
  },
  tittle: {
    fontSize: 50,
    color: "gold",
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#272c33",
    borderRadius: 10,
  },
  inputContainer: {
    marginTop: 80,
    backgroundColor: "transparent",
    alignItems: "center",
    padding: 20,
  },
  input: {
    color: "gold",
    fontSize: 18,
    backgroundColor: 'transparent',
    width: 300,
    height: 40,
    borderRadius: 5,
    borderBottomColor: "gold",
    borderBottomWidth: 1,
    margin: 10,
  },
  botonLogin: {
    backgroundColor: "gold",
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
    width: 300,
  },
  botonLoginText: {
    color: "#272c33",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  registerContainer: {
    flexDirection: 'row',
  },
  buttonTextRegister1: {
    fontSize: 15,
  },
  buttonTextRegister2: {
    color: "gold",
    fontWeight: "bold",
    fontSize: 15,
    marginLeft: 10,
  },
});
