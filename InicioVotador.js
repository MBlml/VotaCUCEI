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

    //Agregar funcion de abstenerse

    if (acuerdoItem) {
      return (
        <View style={styles.contPerfil}>
          <View style={styles.containerPerfil}>
            <View style={styles.header}>
              <Image source={require('./imagenes/logo.png')} style={styles.logo} />
              <Text style={styles.logoText}>VotaCUCEI</Text>
              <Text style={styles.tittle}>Acuerdos</Text>
            </View> 

            <View style={styles.textContainerPerfil}>
              <Image style={styles.imagePerfil} source={{ uri: acuerdoItem.Imagen }} />
              <View>
                <Text style={styles.namePerfil}>{acuerdoItem.Titulo}</Text>
                <Text style={styles.professionPerfil}>{acuerdoItem.CU} / Acuerdo: {acuerdoItem.id}</Text>
              </View>
            </View>

            <ScrollView style={styles.acuerdoContainer}>
              <Text style={styles.textAcuerdo}>
                <Text style={styles.textTituloAcuerdo}>
                  {acuerdoItem.Titulo} {"\n"}
                </Text>
                <Text style={styles.texSubtituloAcuerdo}>
                  {acuerdoItem.Subtitulo} {"\n\n"}
                </Text>
                <Text style={styles.texDescripcionAcuerdo}>
                  {acuerdoItem.Descripcion} {"\n"}
                </Text>
              </Text>
            </ScrollView>

            <Text style={{fontSize: 20, color: "gold", textAlign: "center", marginTop: 0, marginBottom: 10, position: "absolute", top: 690,left: 110,}}>
              ¿Estás de acuerdo? 
            </Text>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={styles.botonLogin} onPress={desAcuerdo}>
                <Text style={styles.botonLoginText}>No ✗</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.botonLogin} onPress={deAcuerdo}>
                <Text style={styles.botonLoginText}>Sí ✓</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.buttonAbstener} >
              <Text style={styles.buttonTextAbstener}>Abstenerse</Text>
            </TouchableOpacity>

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
    /* backgroundColor: "green", */
    width: "100%",
  },
  imagePerfil: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  textContainerPerfil: {
    marginTop: 20,
    flexDirection: "row",
    margin: 15,
    backgroundColor: "gold",
    padding: 10,
    borderRadius: 10,
    height: 120,
  },
  namePerfil: {
    color: "rgb(14, 14, 15)",
    fontWeight: 'bold',
    fontSize: 30,
    marginLeft: 20,
  },
  professionPerfil: {
    color: "rgb(14, 14, 15)",
    color: "gold",
    backgroundColor: "rgb(14, 14, 15)",
    borderRadius: 5,
    padding: 5,
    marginLeft: 20,
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
      marginBottom: 30,
      flexDirection: "row",
      position: "absolute",
      top: 725,
      width: "100%",
    },
    botonLogin: {
      backgroundColor: "gold",
      borderRadius: 5,
      padding: 10,
      width: "40%",
      marginLeft: 28,
    },
    botonLoginText: {
      color: "rgb(14, 14, 15)",
      textAlign: "center",
      fontSize: 18,
      fontWeight: "bold",
    },
    buttonTextAbstener: {
      color: "gold",
      fontWeight: "bold",
      fontSize: 20,
      marginLeft: 140,
      top: 90,
    },
});



// -Solamente mostrar un acuerdo, al votar todos, se muestra el siguiente...
// -Los usuarios ya deben estar registrados
// -