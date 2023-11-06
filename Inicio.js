import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContext } from '@react-navigation/native';

export default class Pagina1 extends Component {
  static contextType = NavigationContext;

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      dataSource: [],
      perfilItem: null, // Estado para almacenar los detalles del perfil
    };
  }

  toggleOpen = () => {
    this.setState({ open: !this.state.open });
  };

  drawerContent = () => {
    return (
      <View style={styles.animatedBox}>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>
          Bienvenido: {this.props.route.params.nombre}
        </Text>
        <TouchableOpacity onPress={this.toggleOpen} style={styles.txtClose}>
          <Text style={{ marginTop: 580, color: '#063970', fontWeight: 'bold', fontSize: 20 }}>Close</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.cerrarSesion} style={styles.txtClose}>
          <Text style={{ marginTop: 10, color: '#063970', fontWeight: 'bold', fontSize: 20 }}>Cerrar sesion</Text>
        </TouchableOpacity>
      </View>
    );
  };

  componentDidMount() {
    var xhttp = new XMLHttpRequest();
    _this = this;
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var Temp = JSON.parse(xhttp.responseText);
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

  abrirPerfil = (item) => {
    console.log("Ha pulsado un perfil");
    // Actualiza el estado para almacenar los datos del perfil
    this.setState({ perfilItem: item });
  };

  cerrarSesion = () => {
    console.log("Ha cerrado sesión");
    this.props.navigation.navigate('Inicio');
  };

  renderPerfil() {
    const { perfilItem } = this.state;

    if (perfilItem) {
      return (
        <View style={styles.contPerfil}>
          <View style={styles.containerPerfil}>
            <View style={styles.header}>
              <Image source={require('./imagenes/logo.png')} style={styles.logo} />
              <Text style={styles.logoText}>VotaCUCEI</Text>
              <Text style={styles.tittle}>Acuerdos</Text>
            </View> 
            <Image style={styles.imagePerfil} source={{ uri: perfilItem.Imagen }} />
            <View style={styles.textContainerPerfil}>
              <Text style={styles.namePerfil}>{perfilItem.Nombre}</Text>
              <Text style={styles.professionPerfil}>{perfilItem.CU}</Text>
              <Text style={styles.phonePerfil}>Id server: {perfilItem.id}</Text>
            </View>
            <View style={styles.starContainerPerfil}>
              <Text style={styles.ratingPerfil}>A favor: </Text>
              <Text style={styles.ratingPerfil}>En contra: </Text>
            </View>
          </View>
          <TouchableOpacity style={{
                    borderWidth: 2,
                    borderColor: "gold",
                    backgroundColor: "gold",
                    width: 120,
                    height: 40,
                    borderRadius: 40,
                    marginTop: 50,
                    padding: 5,
                }}>
                    
                    <Text style = {{
                        fontWeight: 'bold', fontSize: 20, marginTop: 0,
                        textAlign: "center",
                        color: "rgb(14, 14, 15)",
                    }}onPress={() => this.setState({ perfilItem: null })}>Volver</Text>
                </TouchableOpacity>
        </View>

      );
    } else {
      return null;
    }
  }

  render() {
    const navigation = this.context;

    return (
      <View style={styles.container}>
         

        <View style={{ marginTop: 0, marginBottom: 0 }}>
          <View style={styles.header}>
            <Image source={require('./imagenes/logo.png')} style={styles.logo} />
            <Text style={styles.logoText}>VotaCUCEI</Text>
            <Text style={styles.tittle}>Acuerdos</Text>
          </View> 
          
          <FlatList style={{ backgroundColor: "rgb(14, 14, 15)", marginTop: 0, width: 400, height: '100%' }}
            data={this.state.dataSource}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => this.abrirPerfil(item)}
                style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                <View>
                  <Image
                    style={{
                      width: 150,
                      height: 150,
                      marginLeft: 20,
                      borderColor: 'black',
                      backgroundColor: "black",
                      borderWidth: 1,
                      borderRadius: 20,
                    }}
                    source={{ uri: item.Imagen }} //Imagen del profesor
                    //source={{ uri: 'https://assets.stickpng.com/thumbs/585e4beacb11b227491c3399.png' }}
                  />
                </View>
                <View style={{ marginLeft: 15 }}>
                  <Text style={{ color: 'gold', fontWeight: 'bold', fontSize: 22 }}>{item.Nombre}</Text>
                  <Text style={{ color: 'black', backgroundColor: 'gold', fontSize: 16, borderRadius: 5, paddingRight: 5, paddingLeft: 5, width: '55%', }}>{item.CU}</Text>
                  <Text style={{ color: 'white', fontSize: 16 }}>Id server: 000{item.id}</Text>
                </View>
              </TouchableOpacity>
            )}

            ItemSeparatorComponent={() => (
              <View style={{ height: 1, backgroundColor: 'gold', marginVertical: 10 }} />
            )}
          />
          
        </View>
        {/* Llama a la función renderPerfil para mostrar los detalles del perfil */}
        {this.renderPerfil()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'gold',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
    zIndex: 0,
    color: 'white',
  },
  animatedBox: {
    backgroundColor: "rgb(14, 14, 15)",
    color: 'red',
    padding: 10,
    marginTop: 55,
    height: 700,
    width: 150,
  },
  body: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgMenu: {
    marginRight: 350,
    marginTop: 42,
    height: 30,
    width: 30,
  },
  image: {
    width: 300,
    height: 300,
    marginTop: 60,
    marginLeft: 15,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 20,
  },
  textContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  name: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 40,
  },
  profession: {
    color: 'white',
    fontSize: 30,
  },
  phone: {
    color: 'white',
    fontSize: 30,
    marginTop: 30,
  },
  starContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  rating: {
    color: 'white',
    fontSize: 50,
  },


  contPerfil: {
    backgroundColor: "rgb(14, 14, 15)",
    alignItems: 'center',
    marginTop: -807,
    width: "100%",
    height: "100%",
  },
  containerPerfil: {
    backgroundColor: "rgb(14, 14, 15)",
    alignItems: 'center',
  },
  imagePerfil: {
    width: 300,
    height: 300,
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: "rgb(14, 14, 15)",
    marginTop: 20,
  },
  textContainerPerfil: {
    marginTop: 20,
    alignItems: 'center',
  },
  namePerfil: {
    color: 'gold',
    fontWeight: 'bold',
    fontSize: 40,
  },
  professionPerfil: {
    color: "rgb(14, 14, 15)",
    fontSize: 30,
    backgroundColor: "gold",
    borderRadius: 5,
    padding: 5,
  },
  phonePerfil: {
    color: 'white',
    fontSize: 30,
    marginTop: 30,
  },
  starContainerPerfil: {
    marginTop: 30,
    alignItems: 'center',
  },
  ratingPerfil: {
    color: 'gold',
    fontSize: 40,
  },



  fondo: {
    backgroundColor: "rgb(14, 14, 15)",
    width: "100%",
    height: "100%",
  }, header: {
      backgroundColor: "rgb(14, 14, 15)",
      height: 50,
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
});



// -Solamente mostrar un acuerdo, al votar todos, se muestra el siguiente...
// -Los usuarios ya deben estar registrados
// -