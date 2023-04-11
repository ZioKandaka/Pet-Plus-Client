import { Dimensions, Image, StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";

export default function Species() {
  return (
    <ScrollView horizontal={true} style={styles.mainView} showsHorizontalScrollIndicator={false}>
      <View style={styles.gapView}>
        <TouchableOpacity style={styles.serviceBox}>
          <Image style={styles.iconImage} source={{ uri: "https://cdn-icons-png.flaticon.com/512/1818/1818401.png" }} />
        </TouchableOpacity>
        <Text style={{ textAlign: "center", color: "#4B8CA1", fontWeight: "600" }}>Cat</Text>
      </View>
      <View style={styles.gapView}>
        <TouchableOpacity style={styles.serviceBox}>
          <Image style={styles.iconImage} source={{ uri: "https://cdn-icons-png.flaticon.com/512/1623/1623718.png" }} />
        </TouchableOpacity>
        <Text style={{ textAlign: "center", color: "#4B8CA1", fontWeight: "600" }}>Dog</Text>
      </View>
      <View style={styles.gapView}>
        <TouchableOpacity style={styles.serviceBox}>
          <Image style={styles.iconImage} source={{ uri: "https://cdn-icons-png.flaticon.com/512/3069/3069114.png" }} />
        </TouchableOpacity>
        <Text style={{ textAlign: "center", color: "#4B8CA1", fontWeight: "600" }}>Bird</Text>
      </View>
      <View style={styles.gapView}>
        <TouchableOpacity style={styles.serviceBox}>
          <Image style={styles.iconImage} source={{ uri: "https://cdn-icons-png.flaticon.com/512/6807/6807903.png" }} />
        </TouchableOpacity>
        <Text style={{ textAlign: "center", color: "#4B8CA1", fontWeight: "600" }}>Hamsters</Text>
      </View>
      <View style={styles.gapView}>
        <TouchableOpacity style={styles.serviceBox}>
          <Image style={styles.iconImage} source={{ uri: "https://cdn-icons-png.flaticon.com/512/2911/2911472.png" }} />
        </TouchableOpacity>
        <Text style={{ textAlign: "center", color: "#4B8CA1", fontWeight: "600" }}>Turtle</Text>
      </View>
      <View style={styles.gapView}>
        <TouchableOpacity style={styles.serviceBox}>
          <Image style={styles.iconImage} source={{ uri: "https://cdn-icons-png.flaticon.com/512/811/811643.png" }} />
        </TouchableOpacity>
        <Text style={{ textAlign: "center", color: "#4B8CA1", fontWeight: "600" }}>Fish</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainView: {
    marginTop: 30,
    marginHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    height: 120,
    // backgroundColor: "red",
    alignContent: "center",
  },
  serviceBox: {
    backgroundColor: "#edf2ff",
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    elevation: 8,
  },
  iconImage: {
    width: 40,
    height: 40,
  },
  gapView: {
    marginHorizontal: 6,
    alignSelf: "center",
  },
});
