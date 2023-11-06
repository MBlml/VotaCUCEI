import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { NavigationContext } from '@react-navigation/native';

export default class IniciarSesion extends Component {
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

      //Logica para inciar sesion
      //conexion al archivo 'verificar' del servidor
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          console.log(xhttp.responseText);
          if(xhttp.responseText === "3") {
            Alert.alert("Codigo no encontrado, registrate...");
            console.log("Codigo no encontrado, registrate...");
          } else {
            if(xhttp.responseText === '0'){
              Alert.alert("Password Erroneo, intenta de nuevo");
              console.log("Password Erroneo, intenta de nuevo");
            } else {
              navigation.navigate("Inicio",{nombre:xhttp.responseText});
              Alert.alert("Acceso correcto!");
              console.log("Acceso correcto!");
            }
                
          }
        }
      };
      
      //Sustituir GET por link de la pagina, eliminar nombre para consultar correo y contraseña
      xhttp.open("GET", "https://mbdev10.000webhostapp.com/VotaCUCEI/verifica.php?codigo=" + this.state.codigo + "&password=" + this.state.password, true);
      xhttp.send();

      console.log("Datos para inicio de sesion: codigo= " + this.state.codigo + " password= " + this.state.password);
      console.log(xhttp.responseText);
      //navigation.navigate("Inicio",{nombre:"Manuel Barajas"});
      navigation.navigate("Inicio",{nombre:xhttp.responseText});
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
    backgroundColor: "rgb(14, 14, 15)",
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
    color: "rgb(14, 14, 15)",
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