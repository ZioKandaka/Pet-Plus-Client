import { Dimensions, Image, StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@apollo/client";
import { GET_SERVICE } from "../queries/service";
import { GET_ONESHOP } from "../queries/onePetshop";

const xScreen = Dimensions.get("window").width;
const yScreen = Dimensions.get("window").height;

export default function DetailClinic({ route }) {
  const navigation = useNavigation();
  const { clinicId, serviceId } = route.params;
  console.log(clinicId, "=> userId", serviceId, "shopId");
  const {
    loading: loadingShop,
    error: errorShop,
    data: shop,
  } = useQuery(GET_ONESHOP, {
    variables: {
      userId: +clinicId,
    },
  });
  const {
    loading,
    error,
    data: service,
  } = useQuery(GET_SERVICE, {
    variables: {
      petshopId: serviceId,
    },
  });

  console.log(loading, error, service, "????????");
  console.log(loadingShop, errorShop, shop, "XXXXXXXXXXX");

  return (
    <View style={{ height: yScreen }}>
      <View style={{ flex: 1 }}>
        <TouchableOpacity style={{ position: "absolute", zIndex: 10, marginHorizontal: 30, marginVertical: 50, backgroundColor: "white", padding: 10, borderRadius: 15 }} onPress={() => navigation.navigate("Clinic")}>
          <Image style={{ height: 20, width: 20 }} source={{ uri: "https://cdn-icons-png.flaticon.com/512/130/130882.png" }} />
        </TouchableOpacity>
        <Image style={{ height: 400, width: xScreen }} source={{ uri: shop?.getShopById?.logo }} />
      </View>
      {/* <View style={{ borderTopEndRadius: 50, borderTopStartRadius: 50, position: "absolute", backgroundColor: "#e3e7fa", width: xScreen, height: 40, bottom: 15 }}></View> */}
      <View style={{ height: 110, backgroundColor: "#ffe9e7", borderRadius: 20, width: xScreen / 1.15, alignSelf: "center", zIndex: 30, elevation: 10, marginBottom: -50 }}>
        <View style={{}}>
          <Text style={{ fontSize: 20, fontWeight: "bold", left: 20, marginTop: 15, color: "#4B8CA1" }}>{shop?.getShopById?.name}</Text>
          <Text style={{ fontSize: 15, fontWeight: "400", left: 20, lineHeight: 20, color: "#4B8CA1" }}>{shop?.getShopById?.address}</Text>
        </View>
      </View>

      <View style={{ flex: 1 }}>
        <ScrollView style={{ height: 300, paddingBottom: 100 }}>
          <View style={{ gap: 20, backgroundColor: "white", top: 10, height: yScreen / 2 }}>
            <View style={{ marginTop: 20, height: 50 }}>
              {/* <Text style={{ width: xScreen, fontSize: 25, fontWeight: "bold", left: 20, lineHeight: 30, marginTop: 15, color: "#4B8CA1" }}>Randy</Text>
            <Text style={{ width: xScreen, fontSize: 15, fontWeight: "400", left: 20, lineHeight: 20, color: "#4B8CA1" }}>Breed : Siberian</Text> */}
            </View>
            <View style={{ marginHorizontal: 25, marginVertical: 10 }}>
              <Text style={{ color: "#4B8CA1" }}>Details </Text>
              <Text style={{ fontWeight: "500", fontSize: 13, color: "#4B8CA1" }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
                a type specimen book. It has survived not only five centuries
              </Text>
              <Text style={{ color: "#4B8CA1" }}>Available Service: </Text>
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
      </View>
      <View style={{ position: "absolute", bottom: 20, right: 5, display: "flex", flexDirection: "row", gap: 50, backgroundColor: "white" }}>
        <View style={{ alignSelf: "center", backgroundColor: "white", elevation: 5, borderRadius: 200, width: 50, alignItems: "center", justifyContent: "center", height: 45 }}>
          <Ionicons name={"heart-outline"} size={45} style={{ elevation: 5, shadowColor: "#000", alignItems: "center", justifyContent: "center" }} />
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
