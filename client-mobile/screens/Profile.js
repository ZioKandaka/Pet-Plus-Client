import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import { AuthContext } from "../auth";
import { useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import OpeningPage from "../screens/OpeningPage";
import { useQuery } from "@apollo/client";
import { USER_BY_ID } from "../queries";


const xScreen = Dimensions.get("window").width;
const yScreen = Dimensions.get("window").height;

export default function Profile() {
  const { setAccessToken, accessToken, setUserId, UserId, username } =
    useContext(AuthContext);
  const { loading, error, data } = useQuery(USER_BY_ID, {
    variables: { userById: 2 },
  });
  console.log(UserId, username, "{}{}{}")

  if (loading || error) {
    console.log(error)
    return <OpeningPage />;
  }
  console.log(data, "USER DATA")
  
  const navigation = useNavigation();
  return (
    <ScrollView style={{ paddingBottom: 40, backgroundColor: "white" }}>
      <ScrollView style={styles.container}>
        <View style={styles.marginContainer}>
          <View style={{ alignItems: "center", flex: 1, marginTop: 15 }}>
            <Image
              style={{
                height: yScreen / 2.8,
                width: xScreen - 40,
                borderRadius: 30,
              }}
              source={{
                uri: data.userById.imgUrl,
              }}
            />
          </View>
          <View>
            <Text style={{ fontSize: 30, fontWeight: "500" }}>
              {/* {data.userById.fullName} */}
              {username}
            </Text>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Ionicons name={"at-outline"} size={25} />
              <Text style={{ fontSize: 15, fontWeight: "400" }}>
              {data.userById.email}
              </Text>
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              backgroundColor: "#e3e7fa",
              padding: 8,
              borderRadius: 10,
              elevation: 5,
            }}
          >
            <Ionicons
              name={"location-outline"}
              size={30}
              style={{ marginRight: 20 }}
            />
            <Text
              style={{ fontSize: 15, fontWeight: "400", alignSelf: "center" }}
            >
              Jakarta Selatan | {data.userById.address}
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              backgroundColor: "#e3e7fa",
              padding: 8,
              borderRadius: 10,
              elevation: 5,
            }}
          >
            <Ionicons
              name={"call-outline"}
              size={30}
              style={{ marginRight: 20 }}
            />
            <Text
              style={{ fontSize: 15, fontWeight: "400", alignSelf: "center" }}
            >
              +{data.userById.phoneNumber}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              setAccessToken("");
              AsyncStorage.removeItem("accessToken");
              navigation.navigate("login");
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                backgroundColor: "#e3e7fa",
                padding: 8,
                borderRadius: 10,
                elevation: 5,
              }}
            >
              <Text
                style={{ fontSize: 15, fontWeight: "400", textAlign: "center" }}
              >
                Logout
              </Text>
            </View>
          </TouchableOpacity>

          <View style={{ bottom: 0, height: yScreen / 5, width: xScreen - 40 }}>
            {/* <MapView style={{ flex: 1 }} initialRegion={{ latitude: -6.1754, longitude: 106.8272, latitudeDelta: 0.05, longitudeDelta: 0.05 }}>
              <Marker coordinate={{ latitude: -6.1754, longitude: 106.8272 }} />
            </MapView> */}
          </View>
        </View>
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: yScreen,
  },
  marginContainer: {
    marginHorizontal: 20,
    gap: 20,
  },
});
