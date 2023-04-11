import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const yScreen = Dimensions.get("window").height;

export default function Card({ pet }) {
  const navigation = useNavigation();

  return (
    <View style={{ marginVertical: 0 }}>
      <ScrollView
        style={styles.eventMainView}
        showsHorizontalScrollIndicator={false}
      >
        <View style={{ marginVertical: 0 }}>
          <TouchableOpacity
            style={{ maxHeight: 200, display: "flex", flexDirection: "row" }}
            onPress={() => navigation.navigate("petsTabDetail", { pet: pet })}
          >
            <View
              style={{
                backgroundColor: "#e3e7fa",
                borderRadius: 20,
                borderBottomEndRadius: 10,
                borderTopEndRadius: 5,
                minHeight: 160,
                minWidth: 160,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                style={{
                  width: 145,
                  height: 145,
                  resizeMode: "cover",
                  borderRadius: 20,
                }}
                source={{ uri: pet.imgUrl }}
              />
            </View>
            <View
              style={{
                alignSelf: "center",
                justifyContent: "center",
                backgroundColor: "#e3e7fa",
                height: 145,
                width: 200,
                borderBottomEndRadius: 20,
                borderTopEndRadius: 20,
              }}
            >
              <Text style={styles.titlePets}>{pet.name}</Text>
              <Text style={styles.titlePetsDesc}>{pet.breed}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  eventMainView: {
    marginVertical: 0,
    marginLeft: 10,
    display: "flex",
    flexDirection: "row",
    marginBottom: 20,
    // backgroundColor: "red",
    gap: 23,
  },
  titlePets: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#2e5767",
    marginLeft: 10,
    // backgroundColor: "red",
    justifyContent: "center",
  },
  titlePetsDesc: {
    fontSize: 15,
    fontWeight: "400",
    color: "#2e5767",
    marginLeft: 10,
  },
});
