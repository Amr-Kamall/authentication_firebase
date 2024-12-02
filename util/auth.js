import axios from "axios";

const API_KEY = "AIzaSyCZ9vTJ9PUJtquWo-rAH2zePKg0BKr2fOw";

export async function createUser(email, password) {
  const response = await axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
    { email: email, password: password, returnSecureToken: true }
  );
  const token = response.data.idToken;
  return token;
}

export async function login(email, password) {
  const response = await axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
    { email: email, password: password, returnSecureToken: true }
  );
  const token = response.data.idToken;
  return token;
}

export async function getMessage() {
  const data = await axios.get(
    "https://react-native-course-7e0c5-default-rtdb.firebaseio.com/message.json"
  );
  return data;
}
