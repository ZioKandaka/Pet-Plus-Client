import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Modal, TextInput, View, Text, StyleSheet, TouchableOpacity, Dimensions, Alert } from "react-native";
import RadioGroup from "react-native-radio-buttons-group";
import { POST_PET_SCHEDULE } from "../../queries/petchedule";
import AlertPro from "react-native-alert-pro";

export default function List() {
  const [pets, setPets] = useState([
    { id: 1, label: "milo", value: 1 },
    { id: 2, label: "lulu", value: 2 },
    { id: 3, label: "luna", value: 3 },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [text, setText] = useState("");
  const [selectedOption, setSelectedOption] = useState();

  console.log(selectedOption);

  const handlePress = () => {
    setModalVisible(true);
  };

  const [postSchedule, { loading, error, data }] = useMutation(POST_PET_SCHEDULE);

  const handleSubmit = async () => {
    console.log("Submitted", { text, selectedOption });
    setModalVisible(false);
    await postSchedule({
      variables: {
        newSchedule: {
          DoctorScheduleId: 1,
          PetId: 1,
          PetshopId: 1,
          details: text,
        },
      },
    });
    await Alert.alert(
      "Success",
      "Schedule created successfully!",
      [
        {
          text: "OK",
          onPress: () => console.log("OK Pressed"),
        },
      ],
      { cancelable: false }
    );
  };

  function onPressRadioButton(radioButtonsArray) {
    setPets(radioButtonsArray);
    const selectedPet = radioButtonsArray.find((pet) => pet.selected === true);
    if (selectedPet) {
      setSelectedOption(selectedPet.label);
    }
  }

  return (
    <View style={{ marginVertical: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "700", color: "#4B8CA1", marginLeft: 10 }}>Appointments</Text>
      <View style={styles.eventMainView}>
        <TouchableOpacity style={{ maxHeight: 200, width: 390, alignItems: "center" }} onPress={handlePress}>
          <View style={{ display: "flex", flexDirection: "row", backgroundColor: "#e3e7fa", padding: 20, justifyContent: "space-between", borderRadius: 20, gap: 40, minWidth: 320 }}>
            <View>
              <Text style={styles.titleClinicDesc}>Tuesday</Text>
              <Text style={styles.titleClinic}>Dr. Amelia</Text>
            </View>
            <Text style={{ textAlign: "center", fontSize: 40, color: "#2e5767" }}> - </Text>
            <View>
              <Text style={styles.titleClinicDesc}>Avaiable</Text>
              <Text style={styles.titleClinic}>Session 2</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ maxHeight: 200, alignItems: "center" }} onPress={handlePress}>
          <View style={{ display: "flex", flexDirection: "row", backgroundColor: "#e3e7fa", padding: 20, justifyContent: "space-between", borderRadius: 20, gap: 40, minWidth: 320 }}>
            <View>
              <Text style={styles.titleClinicDesc}>Tuesday</Text>
              <Text style={styles.titleClinic}>Dr. Boy</Text>
            </View>
            <Text style={{ textAlign: "center", fontSize: 40, color: "#2e5767" }}> - </Text>
            <View>
              <Text style={styles.titleClinicDesc}>Avaiable</Text>
              <Text style={styles.titleClinic}>Session 3</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ maxHeight: 200, width: 390, alignItems: "center" }} onPress={handlePress}>
          <View style={{ display: "flex", flexDirection: "row", backgroundColor: "#e3e7fa", padding: 20, justifyContent: "space-between", borderRadius: 20, gap: 40, minWidth: 320 }}>
            <View>
              <Text style={styles.titleClinicDesc}>Tuesday</Text>
              <Text style={styles.titleClinic}>Dr. Melissa</Text>
            </View>
            <Text style={{ textAlign: "center", fontSize: 40, color: "#2e5767" }}> - </Text>
            <View>
              <Text style={styles.titleClinicDesc}>On Leave</Text>
              <Text style={styles.titleClinic}>Session 1</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <Modal animationType="fade" visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Notes :</Text>
          <TextInput style={styles.input} placeholder="Issues.." onChangeText={setText} value={text} />
          <Text style={styles.selectLabel}>Select Your Pet:</Text>
          <View style={styles.selectContainer}>
            <View style={{ width: 200, alignItems: "center", gap: 10 }}>
              <RadioGroup layout="row" radioButtons={pets} onPress={onPressRadioButton} />
            </View>
          </View>
          <TouchableOpacity style={{ padding: 10, borderStyle: "solid", borderColor: "#000", borderWidth: 2, borderRadius: 10, marginTop: 25 }} onPress={handleSubmit}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 170,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 70,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  selectLabel: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  selectContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  eventMainView: {
    marginVertical: 10,
    // backgroundColor: "red",
    maxHeight: "50%",
    gap: 23,
  },
  titleClinic: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2e5767",
    minWidth: 95,
    // backgroundColor: "red",
  },
  titleClinicDesc: {
    fontSize: 15,
    fontWeight: "500",
    color: "#2e5767",
  },
  optionText: {
    fontWeight: "500",
    fontSize: 20,
    marginVertical: 5,
  },
  selectedOption: {
    backgroundColor: "#2e5767",
    borderColor: "#2e5767",
  },
  selected: {
    color: "rgba(0, 194, 255, 0.5)",
  },
  option: {
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#ccc",
  },
});
