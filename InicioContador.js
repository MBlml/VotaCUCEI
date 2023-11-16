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

    if (acuerdoItem) {
      return (
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
              <Text style={styles.professionPerfil}>Votando por acuerdo: {acuerdoItem.id}</Text>
                <Text style={styles.namePerfil}>{acuerdoItem.Titulo}</Text>
              </View>
            </View>

            <View style={styles.textContainerPerfil2}>
              <View>
                <Text style={styles.textStatus}>De acuerdo: 0</Text>
                <Text style={styles.textStatus}>En desacuerdo: 0</Text>
                <Text style={styles.textStatus}>Se abstienen: 0</Text>
              </View>
            </View>

            <View style={styles.textContainerPerfil2}>
              <View>
                <Text style={styles.textStatus}>Total: 0</Text>
              </View>
            </View>

            <View style={{
              flexDirection: "row",
              margin: 15,
              marginTop: 5,
              backgroundColor: "red", //Cambia a verde si todos ya votaron
              padding: 10,
              borderRadius: 10,
            }}>
              <View>
                <Text style={{
                  color: "white",
                  fontWeight: 'bold',
                  fontSize: 20,
                  marginLeft: 20,
                }}>Faltan: 0 (cambia a verde si ya votaron)</Text>
              </View>
            </View>


            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={styles.botonLogin} onPress={deAcuerdo}>
                <Text style={styles.botonLoginText}>Siguiente</Text>
              </TouchableOpacity>
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
    marginTop: 10,
    margin: 15,
    backgroundColor: "gold",
    padding: 20,
    borderRadius: 10,
    height: 400,
  },
  textContainerPerfil2: {
    marginTop: 0,
    flexDirection: "row",
    margin: 15,
    backgroundColor: "gold",
    borderRadius: 10,
    padding: 10,
    fontSize: 15,
  },
  textStatus: {
    color: "rgb(14, 14, 15)",
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 0,
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
    margin: 20,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    height: 480,
  },
  textAcuerdo: {
    fontSize: 18,
    color: "black",
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
      marginBottom: 30,
      position: "absolute",
      top: 750,
      alignItems: "center",
      width: "100%",
    },
    botonLogin: {
      backgroundColor: "gold",
      borderRadius: 10,
      padding: 10,
      width: "50%",
    },
    botonLoginText: {
      color: "rgb(14, 14, 15)",
      textAlign: "center",
      fontSize: 18,
      fontWeight: "bold",
    },
});


