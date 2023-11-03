import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import MenuDrawer from 'react-native-side-drawer';
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
            <Image style={styles.imagePerfil} source={{ uri: perfilItem.Imagen }} />
            <View style={styles.textContainerPerfil}>
              <Text style={styles.namePerfil}>{perfilItem.Nombre}</Text>
              <Text style={styles.professionPerfil}>{perfilItem.Profesion}</Text>
              <Text style={styles.phonePerfil}>✆ {perfilItem.Telefono}</Text>
            </View>
            <View style={styles.starContainerPerfil}>
              <Text style={styles.ratingPerfil}>★★★★☆</Text>
            </View>
          </View>
          <TouchableOpacity style={{
                    borderWidth: 2,
                    borderColor: "#063970",
                    backgroundColor: "#063970",
                    width: 120,
                    height: 40,
                    borderRadius: 40,
                    marginBottom: 20,
                    padding: 5,
                }}>
                    
                    <Text style = {{
                        fontWeight: 'bold', fontSize: 20, marginTop: 0,
                        textAlign: "center",
                        color: "white",
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
        <MenuDrawer
          open={this.state.open}
          position={'left'}
          drawerContent={this.drawerContent()}
          drawerPercentage={45}
          animationTime={250}
          overlay={true}
          opacity={0.4}
        >
          <TouchableOpacity onPress={this.toggleOpen} style={styles.body}>
            <Image style={styles.imgMenu} source={require('./imagenes/drawer.png')} />
          </TouchableOpacity>
        </MenuDrawer>

        <View style={{ marginTop: 0, marginBottom: 10 }}>
          <Text style={{ color: 'black', fontSize: 30, fontWeight: 'bold', marginLeft: 50 }}>Lista de Trabajadores</Text>
          <FlatList style={{ backgroundColor: "#e27743", marginTop: 10, width: 400, height: '100%' }}
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
                      borderWidth: 1,
                      borderRadius: 20,
                    }}
                    source={{ uri: item.Imagen }} //Imagen del profesor
                    //source={{ uri: 'https://assets.stickpng.com/thumbs/585e4beacb11b227491c3399.png' }}
                  />
                </View>
                <View style={{ marginLeft: 15 }}>
                  <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>{item.Nombre}</Text>
                  <Text style={{ color: 'white', fontSize: 16 }}>{item.Profesion}</Text>
                  <Text style={{ color: 'white', fontSize: 16 }}>✆ {item.Telefono}</Text>
                </View>
              </TouchableOpacity>
            )}

            ItemSeparatorComponent={() => (
              <View style={{ height: 8, backgroundColor: 'white', marginVertical: 10 }} />
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
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
    zIndex: 0,
    color: 'white',
  },
  animatedBox: {
    backgroundColor: '#e27743',
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
    backgroundColor: '#e27743',
    alignItems: 'center',
    marginTop: -655,
    width: 400,
    paddingTop: 50,
  },
  containerPerfil: {
    backgroundColor: '#e27743',
    alignItems: 'center',
    marginTop: -12,
  },
  imagePerfil: {
    width: 300,
    height: 300,
    alignItems: 'center',
    borderRadius: 20,
  },
  textContainerPerfil: {
    marginTop: 20,
    alignItems: 'center',
  },
  namePerfil: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 40,
  },
  professionPerfil: {
    color: 'white',
    fontSize: 30,
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
    color: 'white',
    fontSize: 40,
  },
});