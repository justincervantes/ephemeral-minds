import React, { useState } from "react";
import {
  View,
  Button,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  FlatList,
  Modal,
  Text,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const axios = require("axios").default;

function App(props) {
  const [description, setDescription] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  // Categies States
  const categories = [
    { label: "Breakfast", value: 1 },
    { label: "Lunch", value: 2 },
    { label: "Dinner", value: 3 },
    { label: "Snack", value: 4 },
  ];
  const [category, setCategory] = useState(categories[0].label);

  // DatePicker States
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState(new Date());
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (dateData) => {
    console.warn("A date has been picked: ", dateData);
    setDate(dateData);
    console.log(date);
    hideDatePicker();
  };

  async function axiosPost(entry) {
    /*axios.defaults.headers.common["x-auth-token"] =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjQ5NTJkZWM2NGE1M2MwMjQ4NmQ2YWYiLCJuYW1lIjoiSm9zaCBDZXJ2YW50ZXMiLCJlbWFpbCI6ImNlcnZhbnRlcy5qZmExQGdtYWlsLmNvbSIsImlhdCI6MTYwMDQ3MTE4Nn0._6UYKwA2MSTfkp-WXj7FupYE0qNy3AtupVatij2Aq8k";*/
    try {
      const result = await axios.post("http://localhost:5050/api/food", entry);
      console.log(result);
      res.send(result);
    } catch (ex) {
      console.log(ex);
      res.send(ex);
    }
  }

  const submitForm = async () => {
    const formData = {
      img: "",
      description: description,
      category: category,
      date: date,
    };
    await axiosPost(formData);
    console.log("Form submitted!", formData);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Will contain the image picker library and the camera access button */}
        <View style={styles.imageContainer}>
          <View style={styles.imagePicker}></View>
          <View style={styles.imageCamera}></View>
        </View>

        {/* Will contain description text input */}
        <View style={styles.descriptionContainer}>
          <TextInput
            placeholder="Description"
            onChangeText={(text) => setDescription(text)}
            style={styles.descriptionInput}
          />
        </View>

        {/* Will contain category selector input B/L/D/Sn */}
        <View style={styles.categoryContainer}>
          <View style={styles.categoryContainer}>
            <>
              <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
                <View style={styles.container}>
                  <MaterialCommunityIcons
                    name="apps"
                    size={20}
                    color={"#000000"}
                    style={{ marginRight: 10 }}
                  />
                  {console.log(category)}
                  <Text>{category}</Text>
                  <MaterialCommunityIcons
                    name="chevron-down"
                    size={20}
                    color="#000000"
                  />
                </View>
              </TouchableWithoutFeedback>
              <Modal visible={modalVisible} animationType="slide">
                <View>
                  <Button
                    title="Close"
                    onPress={() => setModalVisible(false)}
                  />
                  <FlatList
                    data={categories}
                    keyExtractor={(item) => item.value.toString()}
                    renderItem={({ item }) => (
                      <>
                        <TouchableOpacity
                          onPress={() => {
                            setModalVisible(false);

                            setCategory(item.label);
                          }}
                        >
                          <Text>{item.label}</Text>
                        </TouchableOpacity>
                      </>
                    )}
                  />
                </View>
              </Modal>
            </>
          </View>
        </View>

        {/* Date picker */}
        <View style={styles.dateContainer}>
          <View>
            <Button title="Show Date Picker" onPress={showDatePicker} />
            <DateTimePickerModal
              isDarkModeEnabled={false}
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </View>
        </View>

        {/* Submit container */}
        <View style={styles.submitContainer}>
          <TouchableOpacity
            style={{
              backgroundColor: "#0000FF",
              borderRadius: 25,
              justifyContent: "center",
              alignItems: "center",
              padding: 15,
              width: "100%",
              marginVertical: 10,
            }}
            onPress={submitForm}
          >
            <Text>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#FF0000", width: "100%", height: "100%" },
  imageContainer: {
    backgroundColor: "#0000FF",
    flexDirection: "row",
    height: 200,
  },
  imagePicker: {
    /* green */
    backgroundColor: "#00FF00",
    flex: 2,
  },
  imageCamera: {
    /* yellow */
    backgroundColor: "#FFFF00",
    flex: 1.5,
  },
  descriptionContainer: {
    /* white */
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    height: 200,
  },
  descriptionInput: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    width: "80%",
  },
  categoryContainer: {
    /* purple */
    backgroundColor: "#4d1a87",

    height: 200,
  },
  dateContainer: {
    /* white */
    backgroundColor: "#FFFFFF",

    height: 200,
  },
  submitContainer: {
    /* pink */
    backgroundColor: "#de1dde",
    alignItems: "center",
    height: 200,
  },
  submitButton: {
    /* brown */
    backgroundColor: "#6e2a15",
    height: "100%",
    width: "80%",
  },
});

export default App;
