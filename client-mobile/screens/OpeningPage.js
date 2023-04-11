import React, { useEffect } from "react";
import { Animated, StyleSheet, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

export default function OpeningPage() {
  const navigation = useNavigation();
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <View style={styles.container}>
      <Animated.Image
        style={[styles.logo, { opacity: fadeAnim }]}
        source={{ uri: "https://i.ibb.co/StDCmqh/Logo2-removebg.png" }} // ganti dengan path ke gambar logo Anda
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logo: {
    width: 250,
    height: 250,
    resizeMode: "contain",
  },
});
