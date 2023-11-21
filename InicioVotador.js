import React, { Component, useState, useEffect } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, Image } from 'react-native';

import { nombreUsuario } from './IniciarSesion'; // Importa la variable desde el archivo correspondiente

export default function Pagina1() {
  const [dataSource, setDataSource] = useState([]);
  const [acuerdoItemIndex, setAcuerdoItemIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [countdown, setCountdown] = useState(1);
  const [statusCheck, setStatusCheck] = useState(0);
  const [acuerdoData, setAcuerdoData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://mbdev10.000webhostapp.com/VotaCUCEI/acuerdos.json'
        );
        const data = await response.json();
        setDataSource(data);
        setAcuerdoData(data[acuerdoItemIndex]); // Establecer el primer acuerdo al cargar los datos
        console.log("Antes de guardar en bd");
        guardarDatosEnBD(data); // Llamar la función para guardar los datos en la BD
        console.log("Despues de guardar en bd");
      } catch (error) {
        console.error('Error al cargar el archivo JSON:', error);
      }
    };

    fetchData();
  }, [acuerdoItemIndex]);

  const updateFavor = async () => {
    if (acuerdoData) {
      const updatedFavor = +acuerdoData.Favor + 1; // Incrementar localmente
      const updatedData = { ...acuerdoData, Favor: updatedFavor };
  
      try {
        // Actualizar en la base de datos
        const response = await fetch('https://mbdev10.000webhostapp.com/VotaCUCEI/actualizar_favor.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: updatedData.id, Favor: updatedFavor }), // Enviar solo el id y el nuevo valor de Favor
        });
  
        const responseData = await response.text();
        console.log('Respuesta del servidor:', responseData);
  
        // Si la actualización en la base de datos fue exitosa, actualiza el estado local
        setAcuerdoData(updatedData);
      } catch (error) {
        console.error('Error al enviar datos al servidor:', error);
      }
    }
  };
  
  
  
  const guardarDatosEnBD = async (data) => {
    try {
      const datosFormateados = data.map(item => ({
        id: item.id,
        Titulo: item.Titulo,
        Favor: parseInt(item.Favor),
        Contra: parseInt(item.Contra),
        Abstiene: parseInt(item.Abstiene),
        Total: parseInt(item.Total),
        Faltan: parseInt(item.Faltan),
      }));
  
      const response = await fetch('https://mbdev10.000webhostapp.com/VotaCUCEI/archivo_guardar_datos.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosFormateados),
      });
  
      const responseData = await response.text();
      console.log('Respuesta del servidor:', responseData);
    } catch (error) {
      console.error('Error al enviar datos al servidor:', error);
    }
  };
  









  // Función para mostrar el modal y controlar el contador
  const showModalForTime = () => {
    setModalVisible(true);
    const initialCountdown = 1; // Valor inicial del contador
    setCountdown(initialCountdown);

    // Reducir el contador cada segundo
    const timer = setInterval(() => {
      setCountdown(prevCountdown => prevCountdown - 1);
    }, 1000);

    // Detener el temporizador cuando el contador llegue a cero
    setTimeout(() => {
      clearInterval(timer);
      setModalVisible(false);
    }, initialCountdown * 1000);
  };




  
  // Funciones para los botones
  const deAcuerdo = () => {
    showModalForTime();
    console.log("Estoy de acuerdo");
    // Cambiar al siguiente acuerdo
    setAcuerdoItemIndex(prevIndex => (prevIndex + 1) % dataSource.length);
  };

  const desAcuerdo = () => {
    showModalForTime();
    console.log("Estoy en desacuerdo");
    // Cambiar al siguiente acuerdo
    setAcuerdoItemIndex(prevIndex => (prevIndex + 1) % dataSource.length);
  };

  const abstenerse = () => {
    showModalForTime();
    console.log("Me Abstengo");
    // Cambiar al siguiente acuerdo
    setAcuerdoItemIndex(prevIndex => (prevIndex + 1) % dataSource.length);
  };

  const StatusCheck = () => {
    console.log("StatusCheck: ", statusCheck);
  };

  // Renderización condicional del acuerdo
  const acuerdoItem = dataSource[acuerdoItemIndex];
  if (!acuerdoItem) return null;

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image source={require('./imagenes/logo.png')} style={{ height: 300, width: 300 }} />
            <Text style={styles.modalText}>{"\n\n"}Esperando a que todos voten</Text>
            <Text style={styles.modalText}>Tiempo restante: {countdown}s{"\n\n"}</Text>
          </View>
        </View>
      </Modal>

      <View style={styles.contPerfil}>
        <View style={styles.containerPerfil}>
          <View style={styles.header}>
            <Image source={require('./imagenes/logo.png')} style={styles.logo} />
            <Text style={styles.logoText}>VotaCUCEI</Text>
            <Text style={styles.tittle}>Votador</Text>
          </View>

          <View style={styles.textContainerPerfil}>
            <Image source={require('./imagenes/cucei.png')} style={styles.imagePerfil} />
            <View>
              <Text style={styles.professionPerfil}>Acuerdo a votar: {acuerdoItem.id}</Text>
              <Text style={styles.namePerfil}>{acuerdoItem.Titulo}</Text>
            </View>
          </View>

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
    </View>
  );
};

/* export default Pagina1; */



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



