import { Dimensions, Image, StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import GoodDeals from "../component/ClinicComponent/GoodDeals";
import PetDetailStack from "../component/PetsComponent/PetDetailStack";

const yScreen = Dimensions.get("window").height;

export default function DetailPet() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.maxScroll}>
        <PetDetailStack />
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: yScreen,
  },
  topSearch: {
    left: 20,
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    gap: 10,
    paddingBottom: 20,
    // backgroundColor: "red",
  },
  searchBox: {
    height: 40,
    width: 310,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#BDBDBD",
    borderRadius: 20,
  },
  topClinic: {
    top: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  maxScroll: {
    marginBottom: 0,
  },
});
