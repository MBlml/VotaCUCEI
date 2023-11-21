import React, { Component} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { NavigationContext } from '@react-navigation/native';

import { nombreUsuario } from './IniciarSesion'; // Importa la variable desde el archivo correspondiente

export default class Pagina1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valoresVotos: {
        favor: 0,
        contra: 0,
        abstiene: 0,
        total: 0,
        faltan: 0 ,
      },
      dataSource: [], // Inicializar dataSource como un array vacío
      acuerdoItemIndex: 0,
    };
  }

  obtenerValoresVotos = async () => {
    try {
      const response = await fetch('https://mbdev10.000webhostapp.com/VotaCUCEI/votos.php');
      if (!response.ok) {
        throw new Error('Error al obtener los valores de votos');
      }
      const data = await response.json();
      if (data && typeof data === 'object' && Object.keys(data).length > 0) {
        this.setState({ valoresVotos: data });
      } else {
        throw new Error('Los datos recibidos no son válidos');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  

  // Consulta a los acuerdos
  componentDidMount() {
    this.obtenerValoresVotos();

    var xhttp = new XMLHttpRequest();
    _this = this;
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var Temp = JSON.parse(xhttp.responseText);
        console.log('InicioContador');
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

    const { valoresVotos } = this.state;










    const siguiente = () => {
      console.log("siguiente");
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
              <Text style={styles.tittle}>Contador</Text>
            </View> 

            {/* Informacion del acuerdo  */}
            <View style={styles.textContainerPerfil}>
              <Image source={require('./imagenes/cucei.png')} style={styles.imagePerfil} />
              <View>
              <Text style={styles.professionPerfil}>Votando por acuerdo: {acuerdoItem.id}</Text>
                <Text style={styles.namePerfil}>{acuerdoItem.Titulo}</Text>
              </View>
            </View>

            <View style={styles.textContainerPerfil2}>
              <View>
                <Text style={styles.textStatus}>[ {valoresVotos.favor} ] ✓ De acuerdo</Text>
                <Text style={styles.textStatus}>[ {valoresVotos.contra} ] ✗ En desacuerdo</Text>
                <Text style={styles.textStatus}>[ {valoresVotos.abstiene} ] ?  Se abstienen</Text>
              </View>
            </View>

            <View style={styles.textContainerPerfil2}>
              <View>
                <Text style={styles.textStatus}>[ {valoresVotos.total} ] # Total</Text>
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
                }}>[ {valoresVotos.faltan} ] # Faltan {"\n"}Contador: {nombreUsuario}</Text>
              </View>
            </View>


            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={styles.botonLogin} onPress={siguiente}>
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


