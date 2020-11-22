import React, { useState , useEffect} from "react";
import {
  Button,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";

import firebase from "../database/firebase";

const AddUserScreen = (props) => {
  const initalState = {
    name: "",
    email: "",
    password: "",
  };

  const [state, setState] = useState(initalState);

  const handleChangeText = (value, name) => {
    setState({ ...state, [name]: value });
  };

  const saveNewUser = async () => {
    console.log("principio de todo");
    //verifica que ningun campo este vacio --------------
    if (state.name === "") {
      alert("please provide a name");

    }else if (state.email === ""){
      alert("please provide a email");

    }else if (state.password === ""){
      alert("please provide a password");
    //---------------------------------------------------
    }else {
      let existe = await BuscarEmail();
      if (!existe){
        await SaveBD();
      }
      props.navigation.navigate("UsersList");
      
    }
  };
  const SaveBD = async () => { 
    try {
         
      console.log("inicio del guardado");
      firebase.db.collection("users").add({
      name: state.name,
      email: state.email,
      password: state.password,
      });
    } catch (error) {
      console.log(error)
    } 
  }

  const BuscarEmail = async () => {
    firebase.db.collection("users").onSnapshot((querySnapshot) => {
      console.log("inicio de la funcion");
      querySnapshot.docs.forEach((doc) => {
        if (state.email === doc.data().email){
          alert("el usuario ya existe");
          return true;
        }
      });

    }); 
    return false;  
  }

  return (
    <ScrollView style={styles.container}>
      {/* Name Input */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Nombre"
          onChangeText={(value) => handleChangeText(value, "name")}
          value={state.name}
        />
      </View>

      {/* Email Input */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Email"
          multiline={true}
          onChangeText={(value) => handleChangeText(value, "email")}
          value={state.email}
        />
      </View>

      {/*password Input */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Contraseña"
          onChangeText={(value) => handleChangeText(value, "password")}
          value={state.password}
        />
      </View>

      <View style={styles.button}>
        <Button title="Save User" onPress={() => saveNewUser()} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  loader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AddUserScreen;
