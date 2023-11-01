import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity} from 'react-native';
import { NavigationContext } from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';

export default class Registro extends Component {
  static contextType = NavigationContext;
  constructor(props) {
    super(props);
    this.state = {
      nombre: "",
      codigo: "",
      correo: "",
      password: "",
      permisos: "",
    };
  }

  render() {
    const navigation = this.context;

    const registrar = () => {
        console.log("Has dado click al boton de registrar");

        //Logica de registro hacia la base de datos:
        /* console.log("Datos: nombre= " + this.state.nombre + 
                    " correo= " + this.state.correo + 
                    " password= " + this.state.password); */

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                // Typical action to be performed when the document is ready:
                //document.getElementById("demo").innerHTML = xhttp.responseText;
                console.log("Conexion exitosa");
            }

        };
        //https://mbdev10.000webhostapp.com/VotaCUCEI/datos.php?nombre=Manuel&codigo=216557005&correo=Manuel@gmail.com&password=123&permisos=Contador
        xhttp.open("GET", "https://mbdev10.000webhostapp.com/VotaCUCEI/datos.php?nombre=" + this.state.nombre        
                    + "&codigo=" + this.state.codigo
                    + "&correo=" + this.state.correo 
                    + "&password=" + this.state.password
                    + "&permisos=" + this.state.permisos , true);

        xhttp.send();


        console.log("Nombre: " + this.state.nombre);
        console.log("Código: " + this.state.codigo);
        console.log("Correo: " + this.state.correo);
        console.log("Contraseña: " + this.state.password);
        console.log("Permisos: " + this.state.permisos);
        alert("¡Se registró correctamente!");
        navigation.navigate("Inicio");
      }
    
      const regresar = () => {
        navigation.navigate("Inicio");
      }

    return (
      <View style={styles.fondo}>
        <TouchableOpacity onPress={regresar}>
        <Text style={{fontSize: 50, marginLeft: -170, color: "gold", position: "absolute"}}>
        {"<"}
        </Text>
      </TouchableOpacity>

        <View style={styles.logoContainer}>
          <Image source={require('./imagenes/logo.png')} style={styles.logo} />
          <Text style={styles.tittle}>VotaCUCEI</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text>Registro</Text>
          <TextInput style={styles.input}
            placeholder="Nombre"
            onChangeText={nombre => this.setState({ nombre })}
          />
          <TextInput style={styles.input}
            placeholder="Código"
            onChangeText={codigo => this.setState({ codigo })}
          />
          <TextInput style={styles.input}
            placeholder="Correo"
            onChangeText={correo => this.setState({ correo })}
          />
          <TextInput style={styles.input}
            placeholder="Contraseña"
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
            <Text style={styles.botonLoginText}>Regristrarse</Text>
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
  picker: {
    width: 300,
    color: "gold",
    backgroundColor: '#272c33',
  },
});
