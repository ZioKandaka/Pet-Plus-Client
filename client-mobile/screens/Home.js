import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Button,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import Services from "../component/HomeComponent/Services";
import Event from "../component/HomeComponent/Event";
import GoodDeals from "../component/HomeComponent/GoodDeals";
import { useNavigation } from "@react-navigation/native";

import { GET_POSTS } from "../queries/posts";
import { useQuery } from "@apollo/client";
import { useContext } from "react";
import { AuthContext } from "../auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const yScreen = Dimensions.get("window").height;

export default function Home() {
  const { setAccessToken, accessToken, setUserId, UserId, username } =
    useContext(AuthContext);
  const { loading, error, data } = useQuery(GET_POSTS, {
    variables: {
      petshopId: 1,
    },
  });

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.topHome}>
          <TouchableOpacity
            style={styles.profile}
            onPress={() => navigation.navigate("Profile")}
          >
            <Image
              style={styles.profileImage}
              source={{
                uri: "https://media.giphy.com/media/ZE6Aa9S2ViLVhqNqL2/giphy.gif",
              }}
            />
            <Text style={styles.profileName}>{UserId}</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.profileLocation} onPress={() => navigation.navigate("Chat")}>
            <Text style={styles.profileName}></Text>
            <Ionicons name={"chatbox-ellipses-outline"} size={25} style={{ elevation: 5, shadowColor: "#000", marginRight: 10 }} />
          </TouchableOpacity> */}
        </View>
      </View>

      {/* Top Home End ================================================================================================================= */}

      <ScrollView style={styles.maxScroll}>
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

        <Services />
        <Event />
        <GoodDeals />
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
  profile: {
    left: 20,
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    gap: 10,
    paddingBottom: 20,
  },
  profileLocation: {
    right: 20,
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    paddingBottom: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  profileName: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: "500",
  },
  topHome: {
    top: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  maxScroll: {
    marginBottom: 110,
  },
  //  Main Home Content Style ============================================================================================================
});
