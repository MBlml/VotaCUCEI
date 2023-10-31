import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';

export default class Inscripcion extends Component {
  constructor(props) {
    super(props);
    this.state = {
        modalVisible: false,
        nombre: "",
        correo: "",
        password: "",
    };
  }

  render() {
    const correo = () => {
        this.setState({modalVisible: true});
    }

    const cierraModal = () => {
        this.setState({modalVisible:false})
        console.log("Datos: nombre= " + this.state.nombre + " correo= " + this.state.correo + " password= " + this.state.password);
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                // Typical action to be performed when the document is ready:
                //document.getElementById("demo").innerHTML = xhttp.responseText;
                console.log("conexion exitosa");
            }

        };
        //https://mbdevpi1.000webhostapp.com/datos.php?nombre=Manuel&correo=Manuel@gmail.com&password=123
        //se supone que si funciona pero no hay red en la escuela...
        xhttp.open("GET", "https://mbdevpi1.000webhostapp.com/datos.php?nombre=" + this.state.nombre + "&correo=" + this.state.correo + "&password=" + this.state.password, true);
        xhttp.send();
    }

    return (
      <View>
        <Text style={styles.titulo}> Inscripcion </Text>
        <TouchableOpacity style={{borderWidth: 2, 
                                  borderColor: "blue", 
                                  backgroundColor: "blue",
                                  width: 200,
                                  height: 50,
                                  borderRadius: 40,
                                  marginTop: 40,
                                  marginLeft: 100,
                                  }}onPress={correo}>
            <Text style={{fontSize: 18,
                          marginTop: 8,
                          textAlign: "center",
                          color: "white",
                        }}>Inscribir con Correo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{borderWidth: 2, 
                                  borderColor: "blue", 
                                  backgroundColor: "white",
                                  width: 200,
                                  height: 50,
                                  borderRadius: 40,
                                  marginTop: 40,
                                  marginLeft: 100,
                                  }}>
            <Text style={{fontSize: 18,
                          marginTop: 8,
                          textAlign: "center",
                          color: "blue",
                        }}>Inscribir con Facebook</Text>
        </TouchableOpacity>
        {/*Ventana Modal correo*/}
        <Modal 
            transparent={true}
            visible={this.state.modalVisible}
            animationType='slide'
        >
            <View style= {{
                borderWidth: 2,
                borderColor: "blue",
                backgroundColor: "blue",
                marginLeft: 30,
                marginTop: 300,
                width: 350,
                borderRadius: 20,
                padding: 20,
                paddingBottom: 5,
            }}>

                <Text style={styles.txtLabel}>Nombre: </Text>
                <TextInput style={styles.txtInput} value={this.state.nombre} onChangeText={(text) => this.setState({nombre: text})}></TextInput>

                <Text style={styles.txtLabel}>Correo: </Text>
                <TextInput style={styles.txtInput} value={this.state.correo} onChangeText={(text) => this.setState({correo: text})}></TextInput>

                <Text style={styles.txtLabel}>Password: </Text>
                <TextInput style={styles.txtInput} value={this.state.password} onChangeText={(text) => this.setState({password: text})}></TextInput>

                <TouchableOpacity style={{
                    borderWidth: 2,
                    borderColor: "white",
                    backgroundColor: "white",
                    width: 120,
                    height: 40,
                    borderRadius: 40,
                    marginLeft: 100,
                    marginTop: 20,
                    marginBottom: 20,
                    padding: 5,
                }}>
                    
                    <Text style = {{
                        fontSize: 18,
                        textAlign: "center",
                        color: "blue",
                        fontWeight: "bold",
                    }} onPress={cierraModal}>Aceptar</Text>
                </TouchableOpacity>
            </View>
        </Modal>


      </View>
    );
  }
}

const styles = StyleSheet.create({
    txtLabel: {
        fontWeight: "bold",
        marginTop: 8,
        color: "white",
    },
    txtInput: {
        backgroundColor: "white",
        color: "black",
        borderWidth: 2,
        width: 300,
        height: 40,
        borderColor: "white",
        borderRadius: 50,
        marginTop: 10,
        paddingLeft: 10,
    },
    titulo: {
        fontSize: 40,
        textAlign: "center",
        color: "black",
    },

})