import { Dimensions, Image, StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import MarqueeText from "react-native-text-ticker";
import GoodDeals from "../component/ClinicComponent/GoodDeals";
import List from "../component/DoctorComponent/List";

const yScreen = Dimensions.get("window").height;
const xScreen = Dimensions.get("window").width;

export default function DoctorList() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.maxScroll}>
        <List />
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
    marginBottom: 10,
  },
  //  Main Home Content Style ============================================================================================================
});
