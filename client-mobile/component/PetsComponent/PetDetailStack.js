import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useQuery } from "@apollo/client";

const xScreen = Dimensions.get("window").width;
const yScreen = Dimensions.get("window").height;

export default function PetDetailStack({ route }) {
  const navigation = useNavigation();
  // const pet = route.params.pet;
  // console.log(pet)
  const { pet } = useRoute().params;
  console.log(pet);

 



  return (
    <View style={{ height: yScreen }}>
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={{
            position: "absolute",
            zIndex: 10,
            marginHorizontal: 30,
            marginVertical: 50,
            backgroundColor: "white",
            padding: 10,
            borderRadius: 15,
          }}
          onPress={() => navigation.navigate("petsTab")}
        >
          <Image
            style={{ height: 20, width: 20 }}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/130/130882.png",
            }}
          />
        </TouchableOpacity>
        <Image
          style={{ height: yScreen / 2, width: xScreen }}
          source={{
            uri: pet.imgUrl,
          }}
        />
      </View>
      {/* <View style={{ borderTopEndRadius: 50, borderTopStartRadius: 50, position: "absolute", backgroundColor: "#e3e7fa", width: xScreen, height: 40, bottom: 15 }}></View> */}
      <ScrollView style={{ flex: 1, position: "absolute", bottom: -155 }}>
        <View
          style={{
            gap: 20,
            backgroundColor: "white",
            borderTopEndRadius: 40,
            borderTopStartRadius: 40,
          }}
        >
          <View style={{ marginTop: 20 }}>
            <Text
              style={{
                width: xScreen,
                fontSize: 25,
                fontWeight: "bold",
                left: 20,
                lineHeight: 30,
                marginTop: 15,
                color: "#4B8CA1",
              }}
            >
              {pet.name}
            </Text>
            <Text
              style={{
                width: xScreen,
                fontSize: 15,
                fontWeight: "400",
                left: 20,
                lineHeight: 20,
                color: "#4B8CA1",
              }}
            >
              Breed : {pet.breed}
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: 10,
            }}
          >
            <View>
              <View style={styles.dataBox}>
                <Text style={{ fontSize: 13, fontWeight: "300" }}>Gender</Text>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>{pet.gender}</Text>
              </View>
            </View>
            <View>
              <View style={styles.dataBox}>
                <Text style={{ fontSize: 13, fontWeight: "300" }}>Weight</Text>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>{pet.weight}</Text>
              </View>
            </View>
            <View>
              <View style={styles.dataBox}>
                <Text style={{ fontSize: 13, fontWeight: "300" }}>Species</Text>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>{pet.species}</Text>
              </View>
            </View>
          </View>
          <View style={{ marginHorizontal: 25, marginVertical: 10 }}>
            <Text style={{ color: "#4B8CA1" }}>Details </Text>
            <Text style={{ fontWeight: "500", fontSize: 13, color: "#4B8CA1" }}>
              {pet.description}
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: 20,
              marginBottom: 100,
              height: 220,
            }}
          >
            <View>
              <TouchableOpacity
                style={styles.botBoxSchedule}
                onPress={() => navigation.navigate("petSchedules")}
              >
                <Image
                  style={{ width: 70, height: 70 }}
                  source={{
                    uri: "https://cdn-icons-png.flaticon.com/512/3652/3652191.png",
                  }}
                />
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                  Schedule
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={styles.botBoxMed}
                onPress={() => navigation.navigate("petMedicalRecords")}
              >
                <Image
                  style={{ width: 70, height: 70 }}
                  source={{
                    uri: "https://cdn-icons-png.flaticon.com/512/2376/2376123.png",
                  }}
                />
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                  Medical Record
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
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
    height: 240,
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
