import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, KeyboardAvoidingView,  ScrollView,  Dimensions, } from 'react-native';
import { NavigationContext } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

export default class Registro extends Component {
  static contextType = NavigationContext;

  constructor(props) {
    super(props);
    this.state = {
      nombre: "",
      codigo: "",
      correo: "",
      password: "",
      permisos: "Votador",
    };
  }

  render() {
    const navigation = this.context;

    const registrar = () => {
      console.log("Has dado click al botón de registrar");

      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          console.log("Conexión exitosa");
        }
      };

      // Modifica la URL para incluir el valor del Picker (permisos)
      xhttp.open("GET", `https://mbdev10.000webhostapp.com/VotaCUCEI/datos.php?nombre=${this.state.nombre}&codigo=${this.state.codigo}&correo=${this.state.correo}&password=${this.state.password}&permisos=${this.state.permisos}`, true);

      xhttp.send();

      console.log("Nombre: " + this.state.nombre);
      console.log("Código: " + this.state.codigo);
      console.log("Correo: " + this.state.correo);
      console.log("Contraseña: " + this.state.password);
      console.log("Permisos: " + this.state.permisos);
      alert("¡Se registró correctamente!");
      navigation.navigate("Iniciar Sesion");
    };

    const regresar = () => {
      navigation.navigate("Iniciar Sesion");
    };

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={-0.8 * Dimensions.get('window').height}
      >
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <View style={styles.fondo}>
            <TouchableOpacity onPress={regresar}>
              <Text style={{ fontSize: 50, marginLeft: -170, color: 'gold', position: 'absolute' }}>
                {'<'}
              </Text>
            </TouchableOpacity>
  
            <View style={styles.logoContainer}>
          <Image source={require('./imagenes/logo.png')} style={styles.logo} />
          <Text style={styles.tittle}>VotaCUCEI</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={{color: "white", fontSize: 18,}}>Registro</Text>
          <TextInput style={styles.input}
            placeholder="Nombre"
            placeholderTextColor="gold"
            onChangeText={nombre => this.setState({ nombre })}
          />
          <TextInput style={styles.input}
            placeholder="Código"
            placeholderTextColor="gold"
            onChangeText={codigo => this.setState({ codigo })}
          />
          <TextInput style={styles.input}
            placeholder="Correo"
            placeholderTextColor="gold"
            onChangeText={correo => this.setState({ correo })}
          />
          <TextInput style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="gold"
            secureTextEntry={true}
            onChangeText={password => this.setState({ password })}
          />
          <Picker
            selectedValue={this.state.permisos}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ permisos: itemValue })
            }>
            <Picker.Item label="Votador" value="Votador" />
            <Picker.Item label="Contador" value="Contador" />
          </Picker>
          <TouchableOpacity style={styles.botonLogin}
            onPress={registrar}
          >
            <Text style={styles.botonLoginText}>Registrarse</Text>
          </TouchableOpacity>
          </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
    marginTop: 0,
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
  picker: {
    width: 300,
    color: "gold",
    backgroundColor: '#272c33',
  },
});
