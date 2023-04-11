import { Dimensions, Image, StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";

export default function GoodDeals() {
  return (
    <View style={{ bottom: 8 }}>
      <Text style={{ fontSize: 20, fontWeight: "700", color: "#4B8CA1", marginLeft: 10 }}>Good Deals</Text>
      <ScrollView horizontal={true} style={styles.container} showsHorizontalScrollIndicator={false}>
        <View style={styles.gaps}>
          <TouchableOpacity style={styles.ShadowView}>
            <Image style={styles.imageSize} source={{ uri: "https://cdn.trendhunterstatic.com/thumbs/facts-about-cats.jpeg?auto=webp" }} />
          </TouchableOpacity>
        </View>
        <View style={styles.gaps}>
          <TouchableOpacity style={styles.ShadowView}>
            <Image style={styles.imageSize} source={{ uri: "https://satchelslastresort.org/wp-content/uploads/2020/11/Fun-Facts-About-Tuxedo-Cats_Rot-scaled.jpg" }} />
          </TouchableOpacity>
        </View>
        <View style={styles.gaps}>
          <TouchableOpacity style={styles.ShadowView}>
            <Image style={styles.imageSize} source={{ uri: "https://img.freepik.com/free-vector/sale-banner-pet-shop-isometric-with-man-feeding-dog-near-dog-food-rack-with-text_1284-54089.jpg" }} />
          </TouchableOpacity>
        </View>
        <View style={styles.gaps}>
          <TouchableOpacity style={styles.ShadowView}>
            <Image style={styles.imageSize} source={{ uri: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/pet-care-ads-design-templete-template-6f880cc386e0f1c9d0a86021ecda7487_screen.jpg?ts=1628786363" }} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginLeft: 10,
    height: 210,
    display: "flex",
    flexDirection: "row",
    gap: 23,
  },
  imageSize: {
    width: 230,
    height: 100,
    borderRadius: 10,
    resizeMode: "cover",
  },
  gaps: {
    marginHorizontal: 3,
  },
  ShadowView: {
    elevation: 5,
    borderRadius: 35,
  },
});
