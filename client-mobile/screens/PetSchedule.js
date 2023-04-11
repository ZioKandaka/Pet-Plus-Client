import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { useQuery } from "@apollo/client";
import { GET_PETSCHEDULE } from "../queries/petchedule";

export default function PetSchedule() {
  const scheduleData = [
    {
      id: "1",
      title: "Veterinary",
      time: "Session 1",
      status: "Done",
    },
    {
      id: "2",
      title: "Grooming",
      time: "Session 3",
      status: "ongoing",
    },
    {
      id: "3",
      title: "Consult",
      time: "Session 2",
      status: "ongoing",
    },
  ];

  const {
    loading,
    error,
    data: schedule,
  } = useQuery(GET_PETSCHEDULE, {
    variables: {
      petId: 1,
    },
  });

  console.log(loading, error, schedule, ">>>>>>>>>>>>>");

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View>
        <Text style={styles.title}>{item?.Petshop?.name}</Text>
        <Text style={styles.time}>
          {item?.DoctorSchedule?.day} - {item?.DoctorSchedule?.time}
        </Text>
        <Text style={styles.time}>{item?.Petshop?.phoneNumber} </Text>
        <Text style={styles.time}>{item?.Petshop?.address} </Text>
      </View>
      <View style={{ alignSelf: "center" }}>
        <Text style={{ fontSize: 16, color: "#333", textAlign: "center" }}>Status</Text>
        <Text style={{ fontSize: 16, fontWeight: "700", color: "#333", textAlign: "center" }}>{item?.complete}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList data={schedule?.fetchPetSchedule} renderItem={renderItem} keyExtractor={(item) => item.id} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  item: {
    backgroundColor: "#e3e7fa",
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    width: "100%",
    minWidth: 300,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  time: {
    fontSize: 16,
    color: "#333",
  },
});
