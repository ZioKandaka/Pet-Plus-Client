import { Dimensions, Image, StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";

export default function Event() {
  return (
    <View>
      <Text style={{ fontSize: 20, fontWeight: "700", color: "#4B8CA1", marginLeft: 10 }}>Event</Text>
      <ScrollView horizontal={true} style={styles.eventMainView} showsHorizontalScrollIndicator={false}>
        <View>
          <Image style={{ width: 300, height: 200, resizeMode: "contain" }} source={{ uri: "https://i.ibb.co/RgD6D5s/image.png" }} />
        </View>
        <View>
          <Image style={{ width: 300, height: 200, resizeMode: "contain" }} source={{ uri: "https://i.ibb.co/nLr9kpC/image.png" }} />
        </View>
        <View>
          <Image style={{ width: 300, height: 200, resizeMode: "contain" }} source={{ uri: "https://i.ibb.co/RgD6D5s/image.png" }} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  eventMainView: {
    marginVertical: 5,
    marginLeft: 10,
    display: "flex",
    flexDirection: "row",
    // backgroundColor: "red",
    height: 200,
    gap: 23,
  },
});
