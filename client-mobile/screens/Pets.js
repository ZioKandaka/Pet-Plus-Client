import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import MarqueeText from "react-native-text-ticker";
import GoodDeals from "../component/ClinicComponent/GoodDeals";
import Card from "../component/PetsComponent/Card";
import Species from "../component/PetsComponent/Species";
import { useQuery } from "@apollo/client";
import { GET_PET_BY_USER_ID } from "../queries/index";
const yScreen = Dimensions.get("window").height;
const xScreen = Dimensions.get("window").width;
import OpeningPage from "../screens/OpeningPage";
import { useContext } from "react";
import { AuthContext } from "../auth";



export default function Pets() {
  const { setAccessToken, accessToken, setUserId, UserId } = useContext(AuthContext);
  const { loading, error, data } = useQuery(GET_PET_BY_USER_ID, {
    variables: { userId: 2 },
  });
  console.log(UserId, "{}{}{}")

  if (loading) {
    return <OpeningPage />;
  }

  console.log(accessToken, "<><><>");
  console.log(UserId, "<><><>");

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.topPet}>
          <View style={styles.topPetsTitle}>
            <Image
              style={{ width: 70, height: 50 }}
              source={{
                uri: "https://i.ibb.co/3TCj30Y/ezgif-com-gif-maker-6.gif",
              }}
            />
            <Text
              style={{ fontSize: 30, fontWeight: "bold", color: "#2e5767" }}
            >
              My Pets
            </Text>
          </View>
        </View>
      </View>

      {/* Top Home End ================================================================================================================= */}

      <ScrollView style={styles.maxScroll}>
        <Species />
        <TouchableOpacity
          style={{
            backgroundColor: "#e3e7fa",
            alignSelf: "flex-end",
            right: 20,
            borderRadius: 10,
            marginBottom: 20
          }}
          onPress={() => navigation.navigate("addPet")}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              color: "#4B8CA1",
              padding: 5,
              paddingHorizontal: 10,
            }}
          >
            Add Pet
          </Text>
        </TouchableOpacity>
      </ScrollView>
        <FlatList
          data={data.fetchPets}
          renderItem={({ item }) => <Card pet={item} />}
          keyExtractor={(item) => item.id}
          style={{ backgroundColor: "white", width: "100%", marginTop: -280}}
        />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: yScreen,
  },
  topPetsTitle: {
    left: 20,
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    paddingBottom: 20,
    // backgroundColor: "red",s
    width: 355,
  },
  topPet: {
    top: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  maxScroll: {
    marginBottom: 110,
    backgroundColor: 'white'
  },
});
