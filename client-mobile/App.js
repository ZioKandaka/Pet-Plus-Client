import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  BottomTabBar,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import Home from "./screens/Home";
import Profile from "./screens/Profile";
import Pets from "./screens/Pets";
import Clinic from "./screens/Clinic";
import DetailPet from "./screens/DetailPet";
import TesChat from "./screens/TesChat";
import Login from "./screens/Login";
import Register from "./screens/Register";
import DetailClinic from "./screens/DetailClinic";
import DoctorList from "./screens/DoctorList";
import AddPetForm from "./screens/AddPetForm";
import PetSchedule from "./screens/PetSchedule";
import PetMedicalRecord from "./screens/PetMedicalRecord";
import DetailMedicalRecord from "./screens/DetailMedicalRecord";
import { ApolloProvider } from "@apollo/client";
import client from "./config/apollo";
import { AuthProvider } from "./auth";
import HohDemoDetail from "./screens/HohDemoDetail";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const config = {
  animation: "spring",
  config: {
    stiffness: 1000,
    damping: 5000,
    mass: 1,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

function PetStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="petsTab"
        component={Pets}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Homes"
        component={Home}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function MainPage() {
  const navOption = ({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      size = 30;
      color = focused ? "#00C2FF" : "#4B8CA1";
      let iconName;
      let iconSize = focused ? size + 13 : size;

      if (route.name === "Home") {
        iconName = focused ? "home" : "home-outline";
      } else if (route.name === "Profile") {
        iconName = focused ? "person" : "person-outline";
      } else if (route.name === "Pets") {
        iconName = focused ? "paw" : "paw-outline";
      } else if (route.name === "Clinic") {
        iconName = focused ? "medkit" : "medkit-outline";
      }
      return (
        <View style={{ position: "absolute", paddingBottom: 32 }}>
          <Ionicons
            name={iconName}
            size={iconSize}
            color={color}
            style={{ elevation: 5, shadowColor: "#000" }}
          />
        </View>
      );
    },
    tabBarActiveTintColor: "#00C2FF",
    tabBarInactiveTintColor: "#4B8CA1",
    tabBarStyle: styles.tabBarStyle,
    tabBarLabelStyle: {
      fontSize: 10,
      fontWeight: "bold",
    },
    headerShown: false,
  });

  return (
    <Tab.Navigator screenOptions={navOption}>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Clinic" component={Clinic} />
      <Tab.Screen name="Pets" component={PetStack} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <View style={styles.container}>
        <ApolloProvider client={client}>
          <SafeAreaView style={{ flex: 1 }}>
            <NavigationContainer>
              <Stack.Navigator>
                {/* <Stack.Screen name="opening" component={OpeningPage} options={{ headerShown: false }} /> */}
                <Stack.Screen
                  name="login"
                  component={Login}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="register"
                  component={Register}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="mainPages"
                  component={MainPage}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="detailClinic"
                  component={DetailClinic}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="hohDemo"
                  component={HohDemoDetail}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Chat"
                  component={TesChat}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="petsTabDetail"
                  component={DetailPet}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="doctorList"
                  component={DoctorList}
                  options={{ title: "Our Doctor & Schedule" }}
                />
                <Stack.Screen
                  name="addPet"
                  component={AddPetForm}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="petSchedules"
                  component={PetSchedule}
                  options={{ title: "My Schedule" }}
                />
                <Stack.Screen
                  name="petMedicalRecords"
                  component={PetMedicalRecord}
                  options={{ title: "Medical Record" }}
                />
                <Stack.Screen
                  name="detailMedicalRecords"
                  component={DetailMedicalRecord}
                  options={{ title: "Details" }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </SafeAreaView>
        </ApolloProvider>
      </View>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  tabBarStyle: {
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 120,
    borderBottomRightRadius: 120,
    bottom: 0,
    height: 15,
    marginBottom: 15,
    marginHorizontal: 10,
    elevation: 10,
    shadowColor: "#000",
    // backgroundColor: "red",
  },
});
