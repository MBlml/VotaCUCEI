import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, ScrollView, Dimensions } from 'react-native';
import { NavigationContext } from '@react-navigation/native';

export let nombreUsuario = '';

export default class IniciarSesion extends Component {
  static contextType = NavigationContext;
  constructor(props) {
    super(props);
    this.state = {
      codigo: "",
      password: "",
      nombre: '',
      variableDesdePHP: '',
    };
  }

  render() {
    const navigation = this.context;

    //Botones temporales para acceder a las pantallas
    const Votar = () => {
      navigation.navigate("InicioVotador");
    }

    const Contar = () => {
      navigation.navigate("InicioContador");
    }

    const iniciarSesion = () => {
      console.log("Has dado click al boton de ingresar");
      console.log("Código: " + this.state.codigo);
      console.log("Contraseña: " + this.state.password);

      //Logica para inciar sesion
      //conexion al archivo 'verificar' del servidor
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          //console.log(xhttp.responseText);
          if(xhttp.responseText === "3") {
            Alert.alert("Usuario no encontrado","Registrate...");
            console.log("Usuario no encontrado","Registrate...");
          } else {
            if(xhttp.responseText === '0'){
              Alert.alert("Contraseña incorrecta","Intente de nuevo");
              console.log("Contraseña incorrecta","Intente de nuevo");
            } else {
              //Alert.alert("Acceso correcto! ", "Hola " + xhttp.responseText);
              console.log("Acceso correcto! ");
              
              //navigation.navigate("InicioVotador",{nombre:xhttp.responseText});
            }
                
          }
        }
      };
      
      //Sustituir GET por link de la pagina, eliminar nombre para consultar correo y contraseña
      xhttp.open("GET", "https://mbdev10.000webhostapp.com/VotaCUCEI/verifica.php?codigo=" + this.state.codigo + "&password=" + this.state.password, true);
      xhttp.send();

      fetch(`https://mbdev10.000webhostapp.com/VotaCUCEI/verifica.php?codigo=${this.state.codigo}&password=${this.state.password}`)
        .then((response) => response.json())
        .then((data) => {
          if (data && data.nombre && data.permisos) {
            const { nombre, permisos } = data;
            
            // Almacenar el nombre y los permisos en el estado del componente
            this.setState({ nombre, permisos });
            
            console.log('Nombre:', nombre);
            console.log('Permisos:', permisos);

            if (permisos == "Votador") {
              navigation.navigate("InicioVotador");
            } if (permisos == "Contador") {
              navigation.navigate("InicioContador");
            }

            //Exportar el nombre a las otras pantallas
            this.setState({ nombre });
            nombreUsuario = nombre; 
          } else {
            console.log('La respuesta del servidor no contiene los datos esperados.');
          }
        })
        .catch((error) => {
          console.error('Error al obtener los datos desde PHP:', error);
        });


      console.log("Datos para inicio de sesion: codigo= " + this.state.codigo + " password= " + this.state.password);
      console.log(xhttp.responseText);
      //navigation.navigate("InicioVotador",{nombre:"Manuel Barajas"});
      //navigation.navigate("InicioContador",{nombre:xhttp.responseText}); 
    }
    
    //Agregar la validacion si es votador o contador para mostrar la pantalla correspondiente

    const registrar = () => {
        console.log("Has dado click al boton de registrar");
        navigation.navigate("Registro");
      }

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={-0.8 * Dimensions.get('window').height}
      >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.fondo}>
          <View style={styles.logoContainer}>
            <Image source={require('./imagenes/logo.png')} style={styles.logo} />
            <Text style={styles.tittle}>VotaCUCEI</Text>
          </View>

{/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
          <View style={styles.inputContainer}>
            <Text style={{color: "white", fontSize: 18,}}>Iniciar Sesion</Text>

            {/* <View style={styles.registerContainer}>
              <TouchableOpacity style={{}}
                onPress={Votar}
              >
                <Text style={{color: "gold", fontSize: 25, fontWeight: "bold"}}>Votar         </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.buttonRegister}
                onPress={Contar}
              >
                <Text style={{color: "gold", fontSize: 25, fontWeight: "bold"}}>    Contar</Text>
              </TouchableOpacity>
            </View> */}
{/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}

            <TextInput
              style={styles.input}
              placeholder="Código"
              placeholderTextColor="gold"
              onChangeText={codigo => this.setState({ codigo })}
            />
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              placeholderTextColor="gold"
              secureTextEntry={true}
              onChangeText={password => this.setState({ password })}
            />
            <TouchableOpacity style={styles.botonLogin} onPress={iniciarSesion}>
              <Text style={styles.botonLoginText}>Ingresar</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.registerContainer}>
            <Text style={styles.buttonTextRegister1}>No tienes cuenta?</Text>
            <TouchableOpacity style={styles.buttonRegister} onPress={registrar}>
              <Text style={styles.buttonTextRegister2}>Registrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
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
    color: "white",
  },
  buttonTextRegister2: {
    color: "gold",
    fontWeight: "bold",
    fontSize: 15,
    marginLeft: 10,
  },
});
