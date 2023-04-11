import { useNavigation } from "@react-navigation/core";
import { Dimensions, Image, StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";

export default function Services() {
  const navigation = useNavigation();
  return (
    <View style={styles.mainView}>
      <View>
        <TouchableOpacity style={styles.serviceBox}
          onPress={() => {
            navigation.navigate("Clinic", {serviceName: "veterinary"})
          }}
        >
          <Image style={styles.iconImage} source={{ uri: "https://cdn-icons-png.flaticon.com/512/4148/4148500.png" }} 
           />
        </TouchableOpacity>
        <Text style={{ textAlign: "center", color: "#4B8CA1", fontWeight: "600" }}>Vaterinary</Text>
      </View>
      <View>
        <TouchableOpacity style={styles.serviceBox}>
          <Image style={styles.iconImage} source={{ uri: "https://cdn-icons-png.flaticon.com/512/3737/3737726.png" }} />
        </TouchableOpacity>
        <Text style={{ textAlign: "center", color: "#4B8CA1", fontWeight: "600" }}>Food</Text>
      </View>
      <View>
        <TouchableOpacity style={styles.serviceBox}>
          <Image style={styles.iconImage} source={{ uri: "https://cdn-icons-png.flaticon.com/512/4205/4205302.png" }} />
        </TouchableOpacity>
        <Text style={{ textAlign: "center", color: "#4B8CA1", fontWeight: "600" }}>Training</Text>
      </View>
      <View>
        <TouchableOpacity style={styles.serviceBox}>
          <Image style={styles.iconImage} source={{ uri: "https://cdn-icons-png.flaticon.com/512/2809/2809936.png" }} />
        </TouchableOpacity>
        <Text style={{ textAlign: "center", color: "#4B8CA1", fontWeight: "600" }}>Consult</Text>
      </View>
      <View>
        <TouchableOpacity style={styles.serviceBox}>
          <Image style={styles.iconImage} source={{ uri: "https://cdn-icons-png.flaticon.com/512/1839/1839845.png" }} />
        </TouchableOpacity>
        <Text style={{ textAlign: "center", color: "#4B8CA1", fontWeight: "600" }}>Medicine</Text>
      </View>
      <View>
        <TouchableOpacity style={styles.serviceBox}>
          <Image style={styles.iconImage} source={{ uri: "https://cdn-icons-png.flaticon.com/512/1581/1581651.png" }} />
        </TouchableOpacity>
        <Text style={{ textAlign: "center", color: "#4B8CA1", fontWeight: "600" }}>Pet Shop</Text>
      </View>
      <View>
        <TouchableOpacity style={styles.serviceBox}>
          <Image style={styles.iconImage} source={{ uri: "https://cdn-icons-png.flaticon.com/512/3047/3047928.png" }} />
        </TouchableOpacity>
        <Text style={{ textAlign: "center", color: "#4B8CA1", fontWeight: "600" }}>Breed</Text>
      </View>

      <View>
        <TouchableOpacity style={styles.serviceBox}>
          <Image style={styles.iconImage} source={{ uri: "https://cdn-icons-png.flaticon.com/512/3629/3629318.png" }} />
        </TouchableOpacity>
        <Text style={{ textAlign: "center", color: "#4B8CA1", fontWeight: "600" }}>Grooming</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    marginVertical: 5,
    marginHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    // backgroundColor: "red",
    height: 250,
    gap: 23,
    justifyContent: "center",
    alignContent: "center",
  },
  serviceBox: {
    backgroundColor: "rgba(0, 194, 255, 0.5)",
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    elevation: 25,
  },
  iconImage: {
    width: 40,
    height: 40,
  },
});
