import React, { Component, useState, useEffect } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { NavigationContext } from '@react-navigation/native';

import { nombreUsuario } from './IniciarSesion'; // Importa la variable desde el archivo correspondiente

export default class Pagina1 extends Component {
  static contextType = NavigationContext;

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      acuerdoItemIndex: 0,
      modalVisible: false,
      countdown: 5,
      statusCheck: 0,
    };
  }

  // Consulta a los acuerdos
  componentDidMount() {
    var xhttp = new XMLHttpRequest();
    _this = this;
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var Temp = JSON.parse(xhttp.responseText);
        console.log('InicioVotador');
        _this.setState({ dataSource: Temp });
      }
    };
    xhttp.open(
      'GET',
      'https://mbdev10.000webhostapp.com/VotaCUCEI/acuerdos.json',
      true
    );
    xhttp.send();
  }

  // Función para mostrar el modal y controlar el contador
  showModalForTime = () => {
    const initialCountdown = 5; // Valor inicial del contador
    this.setState({ modalVisible: true, countdown: initialCountdown });

    // Reducir el contador cada segundo
    this.timer = setInterval(() => {
      this.setState(prevState => ({
        countdown: prevState.countdown - 1
      }), () => {
        if (this.state.countdown === 0) {
          clearInterval(this.timer); // Detener el temporizador cuando el contador llegue a cero
          this.setState({ modalVisible: false });
        }
      });
    }, 1000);
  };

  // Función para cerrar el modal manualmente
  closeModal = () => {
    clearInterval(this.timer); // Detener el temporizador
    this.setState({ modalVisible: false, countdown: 5 }); // Reiniciar el contador a 5 cuando se cierre el modal manualmente
  };

  renderModal = () => {
    const { modalVisible, countdown } = this.state;

    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          this.setState({ modalVisible: false });
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
          <Image source={require('./imagenes/logo.png')} style={{height: 300, width: 300}} />
              <Text style={{fontSize: 30,color: "gold",fontWeight: "bold",backgroundColor: "#272c33", borderRadius: 10,
      padding: 5,}}>VotaCUCEI</Text>
            <Text style={styles.modalText}>{"\n\n"}Esperando a que todos voten</Text>
            <Text style={styles.modalText}>Tiempo restante: {countdown}s{"\n\n"}</Text>
          </View>
        </View>
      </Modal>
    );
  };

  renderPerfil() {
    const { dataSource, acuerdoItemIndex } = this.state;
    const acuerdoItem = dataSource[acuerdoItemIndex];

    const [acuerdoData, setAcuerdoData] = useState(null);

    // Funciones para los botones
    const deAcuerdo = () => {
      this.showModalForTime();
      console.log("Estoy de acuerdo");
      // Cambiar al siguiente acuerdo
      this.setState((prevState) => ({
        acuerdoItemIndex: (prevState.acuerdoItemIndex + 1) % dataSource.length,
      }));
    };

    const desAcuerdo = () => {
      this.showModalForTime();
      console.log("Estoy en desacuerdo");
      // Cambiar al siguiente acuerdo
      this.setState((prevState) => ({
        acuerdoItemIndex: (prevState.acuerdoItemIndex + 1) % dataSource.length,
      }));
    };

    const abstenerse = () => {
      this.showModalForTime();
      console.log("Me Abstengo");
      // Cambiar al siguiente acuerdo
      this.setState((prevState) => ({
        acuerdoItemIndex: (prevState.acuerdoItemIndex + 1) % dataSource.length,
      }));
    };

    const StatusCheck = () => {
      //this.showModalForTime();
      // Cambiar al siguiente acuerdo
      /* this.setState((prevState) => ({
        acuerdoItemIndex: (prevState.acuerdoItemIndex + 1) % dataSource.length,
      })); */
      console.log("StatusCheck: ", this.state.statusCheck);
    };




    

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(
            'https://mbdev10.000webhostapp.com/VotaCUCEI/acuerdos.json'
          );
          const data = await response.json();
          setAcuerdoData(data);
        } catch (error) {
          console.error('Error al cargar el archivo JSON:', error);
        }
      };
  
      fetchData();
    }, []);
  
    const updateFavor = async () => {
      try {
        if (acuerdoData) {
          const updatedData = {
            ...acuerdoData,
            Favor: parseInt(acuerdoData.Favor) + 1, // Sumar 1 al campo 'Favor'
          };
          setAcuerdoData(updatedData);
  
          const response = await fetch(
            'https://mbdev10.000webhostapp.com/VotaCUCEI/acuerdos.json',
            {
              method: 'PUT', // Método para actualizar el archivo (puede variar según la configuración del servidor)
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(updatedData),
            }
          );
  
          if (response.ok) {
            console.log('Campo "Favor" actualizado correctamente.');
          } else {
            console.error('Error al actualizar el campo "Favor".');
          }
        }
      } catch (error) {
        console.error('Error al actualizar el campo "Favor":', error);
      }
    };













    if (acuerdoItem) {
      return (

        /* Header con logo en info */
        <View style={styles.contPerfil}>
          <View style={styles.containerPerfil}>
            <View style={styles.header}>
              <Image source={require('./imagenes/logo.png')} style={styles.logo} />
              <Text style={styles.logoText}>VotaCUCEI</Text>
              <Text style={styles.tittle}>Votador</Text>
            </View> 


            {/* Informacion del acuerdo  */}
            <View style={styles.textContainerPerfil}>
              <Image style={styles.imagePerfil} source={{ uri: acuerdoItem.Imagen }} />
              <View>
              <Text style={styles.professionPerfil}>Acuerdo a votar: {acuerdoItem.id}</Text>
                <Text style={styles.namePerfil}>{acuerdoItem.Titulo}</Text>
              </View>
            </View>


            {/*Botones para votar*/}
            <View style={styles.buttonsContainer}>
              <View style={styles.tituloBotones}>
                <Text style={styles.tittleBotones}>
                {nombreUsuario},{"\n"} ¿Estás de acuerdo? 
                </Text>
                <View style={styles.botones}>
                  <TouchableOpacity style={styles.botonLogin} onPress={desAcuerdo}>
                    <Text style={styles.botonLoginText}>No ✗</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.botonLogin} onPress={deAcuerdo}>
                    <Text style={styles.botonLoginText}>Sí ✓</Text>
                  </TouchableOpacity>
                </View>
                
                {/* <TouchableOpacity style={styles.buttonAbstener} onPress={abstenerse}>
                  <Text style={styles.buttonTextAbstener}>Abstenerse (?)</Text>
                </TouchableOpacity> */}

                <TouchableOpacity style={styles.buttonAbstener} onPress={updateFavor}>
                  <Text style={styles.buttonTextAbstener}>updateFavor</Text>
                </TouchableOpacity>
                
              </View>
            </View>

            

          </View>
          
        </View>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderModal()}
        {this.renderPerfil()}
      </View>
    );
  }
}



const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(14, 14, 15)',
  },
  modalContent: {
    backgroundColor: 'gold',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    color: 'rgb(14, 14, 15)',
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
  },
  contPerfil: {
    backgroundColor: "rgb(14, 14, 15)",
    width: "100%",
    height: "100%",
  },
  containerPerfil: {
    backgroundColor: "rgb(14, 14, 15)",
    width: "100%",
  },
  imagePerfil: {
    width: 320,
    height: 150,
    borderRadius: 5,
    backgroundColor: "white",
  },
  textContainerPerfil: {
    marginTop: 20,
    margin: 15,
    backgroundColor: "gold",
    padding: 20,
    borderRadius: 10,
    height: 500,
  },
  namePerfil: {
    color: "rgb(14, 14, 15)",
    fontWeight: 'bold',
    fontSize: 30,
    marginTop: 10,
  },
  professionPerfil: {
    fontSize: 20,
    color: "gold",
    backgroundColor: "rgb(14, 14, 15)",
    borderRadius: 5,
    padding: 5,
    marginTop: 20,
    width: 200,
  },
  phonePerfil: {
    color: 'white',
    marginTop: 10,
    marginLeft: 20,
    color: "rgb(14, 14, 15)",
  },
  starContainerPerfil: {
    marginTop: 30,
    marginLeft: 20,
  },
  ratingPerfil: {
    color: 'gold',
  },
  acuerdoContainer: {
    margin: 15,
    marginTop: 0,
    marginBottom: 0,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    height: 480,
    width: 362,
  },
  textAcuerdo: {
    fontSize: 18,
    color: "black",
  },
  textTituloAcuerdo: {
    fontWeight: "bold",
    fontSize: 22,
  },
  texSubtituloAcuerdo: {
    fontStyle: "italic",
    textDecorationLine: "underline",
  },
  

  fondo: {
    backgroundColor: "rgb(14, 14, 15)",
    width: "100%",
    height: "100%",
  }, header: {
      backgroundColor: "rgb(14, 14, 15)",
      height: 50,
      width: "100%",
      flexDirection: 'row',
  }, tittle: {
      textDecorationLine: "underline",
      marginLeft: 40,
      fontSize: 30,
      color: "gold",
      fontWeight: "bold",
      backgroundColor: "rgb(14, 14, 15)",
      borderRadius: 10,
      padding: 5,
  }, logoText: {
      fontSize: 30,
      color: "gold",
      fontWeight: "bold",
      backgroundColor: "rgb(14, 14, 15)",
      borderRadius: 10,
      padding: 5,
  }, logo: {
      width: 50,
      height: 50,
      marginLeft: 5,
      marginRight: 5,
    }, main: {
      paddingTop: 10,
      paddingBottom: 10,
      alignItems: "center",
      backgroundColor: "#202320",
    }, tittleMain: {
      color: "gold",
      fontSize: 30,
    },

    buttonsContainer: {
      backgroundColor: "rgb(14, 14, 15)",
      alignItems: "center",
      marginTop: 10,
    },
    botones: {
      flexDirection: "row",
      textAlign: "center",
      alignItems: "center",
    },
    botonLogin: {
      backgroundColor: "gold",
      borderRadius: 5,
      padding: 10,
      marginRight: 10,
      width: 150,
      height: 50,
    },
    botonLoginText: {
      color: "rgb(14, 14, 15)",
      textAlign: "center",
      fontSize: 18,
      fontWeight: "bold",
    },
    buttonAbstener: {
      textAlign: "center",
      alignItems: "center",
    },
    buttonTextAbstener: {
      color: "gold",
      fontWeight: "bold",
      fontSize: 20,
      marginTop: 20,
      marginBottom: 10,
      borderWidth: 1,
      padding: 10,
      borderRadius: 5,
      borderColor: "gold",
    },
    tittleBotones: {
      fontSize: 22,
      fontWeight: "bold",
      color: "white",
      textAlign: "center",
      marginTop: 20,
      marginBottom: 10,
    }
    
});



