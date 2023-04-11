import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity } from "react-native";

export default function Register() {
  const navigation = useNavigation();

  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: "https://i.ibb.co/StDCmqh/Logo2-removebg.png" }} />
      <View style={styles.inputView}>
        <TextInput style={styles.TextInput} placeholder="Username" placeholderTextColor="#003f5c" onChangeText={(username) => setUsername(username)} />
      </View>
      <View style={styles.inputView}>
        <TextInput style={styles.TextInput} placeholder="Fullname" placeholderTextColor="#003f5c" onChangeText={(fullname) => setFullname(fullname)} />
      </View>
      <View style={styles.inputView}>
        <TextInput style={styles.TextInput} placeholder="Email" placeholderTextColor="#003f5c" onChangeText={(email) => setEmail(email)} />
      </View>
      <View style={styles.inputView}>
        <TextInput style={styles.TextInput} placeholder="Password" placeholderTextColor="#003f5c" secureTextEntry={true} onChangeText={(password) => setPassword(password)} />
      </View>
      <View style={styles.inputView}>
        <Button
          title="Choose Image"
          onPress={() => {
            /* add image upload functionality here */
          }}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput style={styles.TextInput} placeholder="Phone Number" placeholderTextColor="#003f5c" onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)} />
      </View>
      <View style={styles.inputView}>
        <TextInput style={styles.TextInput} placeholder="Address" placeholderTextColor="#003f5c" onChangeText={(address) => setAddress(address)} />
      </View>
      <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.loginText}>REGISTER</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("login")}>
        <Text style={styles.forgot_button}>Sign In</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    marginBottom: 40,
    width: 200,
    height: 80,
  },
  inputView: {
    backgroundColor: "#e3e7fa",
    borderRadius: 10,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    textAlign: "center",
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#adafba",
  },
  forgot_button: {
    height: 20,
    marginVertical: 15,
  },
});
