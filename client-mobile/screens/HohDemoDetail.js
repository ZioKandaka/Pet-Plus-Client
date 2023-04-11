import { Dimensions, Image, StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@apollo/client";
import { GET_SERVICE } from "../queries/service";

const xScreen = Dimensions.get("window").width;
const yScreen = Dimensions.get("window").height;

export default function HohDemoDetail() {
  const navigation = useNavigation();

  const {
    loading,
    error,
    data: service,
  } = useQuery(GET_SERVICE, {
    variables: {
      petshopId: 2,
    },
  });

  return (
    <View style={{ height: yScreen }}>
      <View style={{ flex: 1 }}>
        <TouchableOpacity style={{ position: "absolute", zIndex: 10, marginHorizontal: 30, marginVertical: 50, backgroundColor: "white", padding: 10, borderRadius: 15 }} onPress={() => navigation.navigate("Clinic")}>
          <Image style={{ height: 20, width: 20 }} source={{ uri: "https://cdn-icons-png.flaticon.com/512/130/130882.png" }} />
        </TouchableOpacity>
        <Image style={{ height: yScreen / 1.6, width: xScreen }} source={{ uri: "https://i.pinimg.com/originals/95/e7/b5/95e7b509dd285cbf25140ebf22806383.gif" }} />
      </View>
      {/* <View style={{ borderTopEndRadius: 50, borderTopStartRadius: 50, position: "absolute", backgroundColor: "#e3e7fa", width: xScreen, height: 40, bottom: 15 }}></View> */}
      <View style={{ height: 110, gap: 20, backgroundColor: "#ffe9e7", borderRadius: 20, width: xScreen / 1.15, alignSelf: "center", position: "absolute", zIndex: 30, top: 365, elevation: 10 }}>
        <View style={{ marginTop: 20 }}>
          <Text style={{ width: xScreen, fontSize: 20, fontWeight: "bold", left: 20, marginTop: 15, color: "#4B8CA1" }}>Hoh Pet Clinic</Text>
          <Text style={{ width: xScreen, fontSize: 15, fontWeight: "400", left: 20, lineHeight: 20, color: "#4B8CA1" }}>Jl.Veteran</Text>
        </View>
      </View>
      <ScrollView style={{ flex: 1, height: 300 }}>
        <View style={{ gap: 20, backgroundColor: "white", top: 10, height: yScreen / 2 }}>
          <View style={{ marginTop: 20, height: 50 }}>
            {/* <Text style={{ width: xScreen, fontSize: 25, fontWeight: "bold", left: 20, lineHeight: 30, marginTop: 15, color: "#4B8CA1" }}>Randy</Text>
            <Text style={{ width: xScreen, fontSize: 15, fontWeight: "400", left: 20, lineHeight: 20, color: "#4B8CA1" }}>Breed : Siberian</Text> */}
          </View>
          <View style={{ marginHorizontal: 25, marginVertical: 10 }}>
            <Text style={{ color: "#4B8CA1" }}>Details </Text>
            <Text style={{ fontWeight: "500", fontSize: 13, color: "#4B8CA1" }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a
              type specimen book. It has survived not only five centuries
            </Text>
            {service?.fetchService?.map((el) => {
              return (
                <Text key={el.id} tyle={{ color: "#4B8CA1" }}>
                  {el.name}{" "}
                </Text>
              );
            })}
          </View>
        </View>
      </ScrollView>
      <View style={{ position: "absolute", top: 750, right: 5, display: "flex", flexDirection: "row", gap: 50 }}>
        <View style={{ alignSelf: "center", backgroundColor: "white", elevation: 5, borderRadius: 200, width: 50, alignItems: "center", justifyContent: "center", height: 45 }}>
          <Ionicons name={"chatbubble-ellipses-outline"} size={40} style={{ elevation: 5, shadowColor: "#000", alignItems: "center", justifyContent: "center" }} onPress={() => navigation.navigate("Chat")} />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("doctorList")} style={{ marginRight: 30, backgroundColor: "#2e5767", width: 200, alignSelf: "flex-end", padding: 10, borderRadius: 20 }}>
          <Text style={{ textAlign: "center", color: "white", fontSize: 20, fontWeight: "500" }}>Book</Text>
        </TouchableOpacity>
      </View>
      <StatusBar hidden />
    </View>
  );
}

const styles = StyleSheet.create({
  eventMainView: {
    marginVertical: 10,
    marginLeft: 10,
    display: "flex",
    flexDirection: "row",
    // backgroundColor: "red",
    height: 200,
    gap: 23,
  },
  titleClinic: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2e5767",
    marginLeft: 10,
  },
  titleClinicDesc: {
    fontSize: 10,
    fontWeight: "500",
    color: "#2e5767",
    marginLeft: 10,
  },
  dataBox: {
    backgroundColor: "rgba(0, 194, 255, 0.5)",
    width: 110,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    elevation: 30,
  },
  botBoxMed: {
    backgroundColor: "#91D8E4",
    width: 150,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    elevation: 5,
  },
  botBoxSchedule: {
    backgroundColor: "#EEA0A0",
    width: 150,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    elevation: 5,
  },
});
