import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { useQuery } from "@apollo/client";
import { GET_RECORDS } from "../queries/medicalRecord";

export default function DetailMedicalRecord({ route }) {
  // const {item} = route.params
  // console.log(item, "?????????????????????????");

  const {
    loading,
    error,
    data: medical,
  } = useQuery(GET_RECORDS, {
    variables: {
      petId: 1,
    },
  });

  const notesData = [
    {
      id: "1",
      title: "Note 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vestibulum felis ut sem aliquet eleifend. Nam quis velit eget neque venenatis convallis.",
    },
    {
      id: "2",
      title: "Note 2",
      description: "Vivamus congue purus libero, vel pretium ipsum tincidunt sed. Maecenas a nisl et lacus pellentesque hendrerit vel eu quam. Sed posuere tristique nisl vitae bibendum.",
    },
    {
      id: "3",
      title: "Note 3",
      description: "Praesent tincidunt semper lorem ac pulvinar. Nullam consectetur turpis ac ligula eleifend, a volutpat nulla sollicitudin. Fusce ut turpis tincidunt, gravida enim quis, convallis nisi.",
    },
  ];
  // Actions
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item?.Petshop.name}</Text>
      <Text style={styles.title}>{item?.createdAt}</Text>
      <Text style={[styles.description, { fontStyle: "italic" }]}>Created By: {item?.Doctor.name} </Text>
      <Text style={[styles.description, { fontWeight: "bold" }]}>Actions :</Text>
      {item?.Actions?.map((el) => {
        return (
          <Text key={el.id} style={styles.description}>
            {el.Service.name}{" "}
          </Text>
        );
      })}
      <Text style={[styles.description, { fontWeight: "bold" }]}>Details :</Text>
      <Text style={styles.description}>{item?.PetSchedule.details} </Text>
      <Text style={[styles.description, { fontWeight: "bold" }]}>Diagnosis and treatment :</Text>
      <Text style={styles.description}>{item?.notes} </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList data={medical.getRecord} renderItem={renderItem} keyExtractor={(item) => item.id} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  item: {
    backgroundColor: "#e3e7fa",
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  description: {
    fontSize: 16,
    color: "#333",
  },
});
