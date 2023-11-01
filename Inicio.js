import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert } from 'react-native';

export default class Inicio extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.fondo}>
        <View style={styles.header}>
            <Image source={require('./imagenes/logo.png')} style={styles.logo} />
            <Text style={styles.logoText}>VotaCUCEI</Text>
            <Text style={styles.tittle}>Inicio</Text>
        </View>
        <View style={styles.main}>
            <Text style={styles.tittleMain}>Titulo de inicio</Text>
            <Image source={require('./imagenes/logo.png')} style={styles.logo} />
            <Text style={styles.tittleMain}>Titulo de inicio</Text>
            <Image source={require('./imagenes/logo.png')} style={styles.logo} />
            <Text style={styles.tittleMain}>Titulo de inicio</Text>
            <Image source={require('./imagenes/logo.png')} style={styles.logo} />
            <Text style={styles.tittleMain}>Titulo de inicio</Text>
            <Image source={require('./imagenes/logo.png')} style={styles.logo} />
            <Text style={styles.tittleMain}>Titulo de inicio</Text>
            <Image source={require('./imagenes/logo.png')} style={styles.logo} />
            <Text style={styles.tittleMain}>Titulo de inicio</Text>
            <Image source={require('./imagenes/logo.png')} style={styles.logo} />
            <Text style={styles.tittleMain}>Titulo de inicio</Text>
            <Image source={require('./imagenes/logo.png')} style={styles.logo} />
            <Text style={styles.tittleMain}>Titulo de inicio</Text>
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
    }, header: {
        backgroundColor: "rgb(14, 14, 15)",
        height: 50,
        flexDirection: 'row',
    }, tittle: {
        marginLeft: 80,
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