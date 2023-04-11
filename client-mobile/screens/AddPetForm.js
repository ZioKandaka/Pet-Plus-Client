import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
// import { ADD_PET } from "../graphql/mutations";

const AddPetForm = ({ loading, data, error }) => {
  const navigation = useNavigation();

  const [petData, setPetData] = useState({
    petshopId: 1,
    doctorId: 1,
    name: null,
    imgUrl: null,
    gender: null,
    species: null,
    breed: null,
    weight: null,
    userId: 1,
    description: null,
  });

  //   const [addPet, { loading }] = useMutation(ADD_PET);

  const handleChange = (key, value) => {
    setPetData({ ...petData, [key]: value });
  };

  const handleSubmit = () => {
    addPet({
      variables: { petData },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Pet</Text>
      <TextInput style={styles.input} placeholder="Name" onChangeText={(text) => handleChange("name", text)} />
      <TextInput style={styles.input} placeholder="Image URL" onChangeText={(text) => handleChange("imgUrl", text)} />
      <TextInput style={styles.input} placeholder="Gender" onChangeText={(text) => handleChange("gender", text)} />
      <TextInput style={styles.input} placeholder="Species" onChangeText={(text) => handleChange("species", text)} />
      <TextInput style={styles.input} placeholder="Breed" onChangeText={(text) => handleChange("breed", text)} />
      <TextInput style={styles.input} placeholder="Weight" onChangeText={(text) => handleChange("weight", text)} />
      <TextInput style={styles.input} placeholder="Description" onChangeText={(text) => handleChange("description", text)} />
      <TouchableOpacity style={[styles.button, { backgroundColor: "#4B8CA1" }]} onPress={handleSubmit} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? "Adding Pet..." : "Add Pet"}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: "white", borderColor: "#000", borderStyle: "solid", borderWidth: 1 }]} onPress={() => navigation.navigate("Pets")} disabled={loading}>
        <Text style={styles.buttonTextCancel}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    width: "80%",
  },
  button: {
    backgroundColor: "#e3e7fa",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  buttonTextCancel: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
});

export default AddPetForm;
