import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import axios from "axios";
import { useAuthContext } from "../store/AuthContext";

function WelcomeScreen() {
  const [message, setMessage] = useState("");
  const { token } = useAuthContext();
  useEffect(() => {
    axios
      .get(
        `https://react-native-course-7e0c5-default-rtdb.firebaseio.com/message.json?auth=${token}`
      )
      .then((response) => {
        setMessage(response.data);
      });
  }, []);
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{message}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
