import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { NavigationContext } from '@react-navigation/native';

export default class Pagina1 extends Component {
  static contextType = NavigationContext;

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      acuerdoItemIndex: 0,
    };
  }

  // Consulta a los acuerdos
  componentDidMount() {
    var xhttp = new XMLHttpRequest();
    _this = this;
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var Temp = JSON.parse(xhttp.responseText);
        console.log('Nuevos datos de la API:', Temp);
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

  renderPerfil() {
    const { dataSource, acuerdoItemIndex } = this.state;
    const acuerdoItem = dataSource[acuerdoItemIndex];

    // Funciones para los botones
    const deAcuerdo = () => {
      console.log("Estoy de acuerdo");
      // Cambiar al siguiente acuerdo
      this.setState((prevState) => ({
        acuerdoItemIndex: (prevState.acuerdoItemIndex + 1) % dataSource.length,
      }));
    };

    const desAcuerdo = () => {
      console.log("Estoy en desacuerdo");
      // Cambiar al siguiente acuerdo
      this.setState((prevState) => ({
        acuerdoItemIndex: (prevState.acuerdoItemIndex + 1) % dataSource.length,
      }));
    };

    //Agregar funcion de abstenerse
    const abstenerse = () => {
      console.log("Me Abstengo");
      // Cambiar al siguiente acuerdo
      this.setState((prevState) => ({
        acuerdoItemIndex: (prevState.acuerdoItemIndex + 1) % dataSource.length,
      }));
    };



    if (acuerdoItem) {
      return (

        /* Header con logo en info */
        <View style={styles.contPerfil}>
          <View style={styles.containerPerfil}>
            <View style={styles.header}>
              <Image source={require('./imagenes/logo.png')} style={styles.logo} />
              <Text style={styles.logoText}>VotaCUCEI</Text>
              <Text style={styles.tittle}>Acuerdos</Text>
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
                  ¿Estás de acuerdo? 
                </Text>
                <View style={styles.botones}>
                  <TouchableOpacity style={styles.botonLogin} onPress={desAcuerdo}>
                    <Text style={styles.botonLoginText}>No ✗</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.botonLogin} onPress={deAcuerdo}>
                    <Text style={styles.botonLoginText}>Sí ✓</Text>
                  </TouchableOpacity>
                </View>
                
                <TouchableOpacity style={styles.buttonAbstener} onPress={abstenerse}>
                  <Text style={styles.buttonTextAbstener}>Abstenerse (?)</Text>
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
        {this.renderPerfil()}
      </View>
    );
  }
}



const styles = StyleSheet.create({
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
      color: "gold",
      textAlign: "center",
      marginTop: 20,
      marginBottom: 10,
    }
    
});



// -Solamente mostrar un acuerdo, al votar todos, se muestra el siguiente...
// -Los usuarios ya deben estar registrados
// -