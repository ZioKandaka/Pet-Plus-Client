import { useMutation } from "@apollo/client";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import { LOGIN_QUERY } from "../queries";
import { AuthContext } from "../auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
  const navigation = useNavigation();
  const { setAccessToken, accessToken, setUserId, UserId, username, setUsername } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, response] = useMutation(LOGIN_QUERY);

  useFocusEffect(
    useCallback(() => {
      if (accessToken) {
        navigation.navigate("mainPages");
      }
    }, [accessToken])
  );

  function handleLogin() {
    login({
      variables: {
        email,
        password,
      },
    }).then(({ data }) => {
      console.log(data, "RETURN LOGIN");
      setAccessToken(data.login.access_token);
      setUserId(data.login.UserId)
      setUsername(data.login.username)
      console.log(data.login)
      
      AsyncStorage.setItem("accessToken", data.login.access_token);
      AsyncStorage.setItem("UserId", data.login.UserId);
      AsyncStorage.setItem("username", data.login.username);
      // AsyncStorage.setItem("UserId", data.login.access_token);
      navigation.navigate("mainPages");
    })
      .catch((err) => {
        console.log(err, "error")
      })
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: "https://i.ibb.co/StDCmqh/Logo2-removebg.png" }}
      />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("register")}>
        <Text style={styles.forgot_button}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginText}>LOGIN</Text>
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
    height: 20,
    marginBottom: 10,
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
});
