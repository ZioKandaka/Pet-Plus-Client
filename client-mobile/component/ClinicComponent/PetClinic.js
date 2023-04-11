import { useNavigation } from "@react-navigation/native";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";

export default function PetClinic({ clinicData }) {
  const navigation = useNavigation();

  function getAddress(address) {
    const firstCommaIndex = address.indexOf(",");
    const truncatedAddress = address.substring(0, firstCommaIndex);
    return truncatedAddress;
  }

  return (
    <View style={{ marginVertical: 20 }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "700",
          color: "#4B8CA1",
          marginLeft: 10,
        }}
      >
        Pet Clinic
      </Text>
      {/* <ScrollView style={styles.eventMainView} showsHorizontalScrollIndicator={false}> */}
      <View style={styles.eventMainView}>
        {/* <View>
          <TouchableOpacity
            style={{ maxHeight: 200, maxWidth: 170 }}
            onPress={() => navigation.navigate("hohDemo")}
          >
            <Image
              style={{
                width: 170,
                height: 150,
                resizeMode: "cover",
                marginHorizontal: 5,
              }}
              source={{
                uri: "https://i.pinimg.com/originals/95/e7/b5/95e7b509dd285cbf25140ebf22806383.gif",
              }}
            />
            <Text style={styles.titleClinic}>Hooh Pet Clinic</Text>
            <Text style={styles.titleClinicDesc}>Jl.Veteran </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={{ maxHeight: 200, maxWidth: 170 }}>
            <Image
              style={{
                width: 170,
                height: 150,
                resizeMode: "cover",
                marginHorizontal: 5,
              }}
              source={{
                uri: "https://i.pinimg.com/736x/9d/6c/53/9d6c53ea68b751ff3413ab0ac0b6b0a6.jpg",
              }}
            />
            <Text style={styles.titleClinic}>Athena Pet Clinic</Text>
            <Text style={styles.titleClinicDesc}>Jl.Metro Pondok Indah</Text>
          </TouchableOpacity>
        </View> */}

        {clinicData?.getAllPetshops?.map((el) => {
          return (
            <View key={el.id}>
              <TouchableOpacity
                style={{ maxHeight: 200, maxWidth: 170 }}
                onPress={() =>
                  navigation.navigate("detailClinic", {
                    clinicId: el.UserId,
                    serviceId: el.id,
                  })
                }
              >
                <Image
                  style={{
                    width: 170,
                    height: 150,
                    resizeMode: "cover",
                    marginHorizontal: 5,
                  }}
                  source={{ uri: el.logo }}
                />
                <Text style={styles.titleClinic}>{el.name}</Text>
                <Text style={styles.titleClinicDesc}>
                  {getAddress(el.address)}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
        {/* <View>
          <View style={{ maxHeight: 200, maxWidth: 170 }}>
            <Image
              style={{
                width: 170,
                height: 150,
                resizeMode: "cover",
                marginHorizontal: 5,
              }}
              source={{
                uri: "https://i.pinimg.com/564x/4c/35/00/4c350052ef20810241b8686eaa6abd29.jpg",
              }}
            />
            <Text style={styles.titleClinic}>Metro Pet</Text>
            <Text style={styles.titleClinicDesc}>Jl.Metro Alam IV</Text>
          </View>
        </View>
        <View>
          <View style={{ maxHeight: 200, maxWidth: 170 }}>
            <Image
              style={{
                width: 170,
                height: 150,
                resizeMode: "cover",
                marginHorizontal: 5,
              }}
              source={{
                uri: "https://i.pinimg.com/564x/3e/c6/f4/3ec6f4590306e44ca36df6e5e0433966.jpg",
              }}
            />
            <Text style={styles.titleClinic}>Strong & Healty Pet Clinic</Text>
            <Text style={styles.titleClinicDesc}>Jl.Alam Segar I</Text>
          </View>
        </View>
        <View>
          <View style={{ maxHeight: 200, maxWidth: 170 }}>
            <Image
              style={{
                width: 170,
                height: 150,
                resizeMode: "cover",
                marginHorizontal: 5,
              }}
              source={{
                uri: "https://i.pinimg.com/736x/4f/d8/2a/4fd82ac3f1ea2a0f228686ebe2200cd5.jpg",
              }}
            />
            <Text style={styles.titleClinic}>Paw Hub Clinic</Text>
            <Text style={styles.titleClinicDesc}>Jl.Wijaya Kusuma IV</Text>
          </View>
        </View> */}
        {/* <View>
          <View style={{ maxHeight: 200, maxWidth: 170 }}>
            <Image style={{ width: 170, height: 150, resizeMode: "cover", marginHorizontal: 5 }} source={{ uri: "https://i.pinimg.com/564x/cf/60/95/cf6095be3a3f0f633ba894007ef1e650.jpg" }} />
            <Text style={styles.titleClinic}>Your Pet Clinic</Text>
            <Text style={styles.titleClinicDesc}>Jl.Metro Alam IV</Text>
          </View>
        </View> */}
      </View>
      {/* </ScrollView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  eventMainView: {
    marginVertical: 10,
    marginLeft: 10,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    // backgroundColor: "white",
    height: "60%",
    gap: 23,
  },
  titleClinic: {
    fontSize: 15,
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
});
