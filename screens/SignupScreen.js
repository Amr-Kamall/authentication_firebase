import { useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { createUser } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Alert } from "react-native";
import { useAuthContext } from "../store/AuthContext";

function SignupScreen() {
  const { authenticate } = useAuthContext();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  async function signUpHandler({ email, password }) {
    setIsAuthenticated(true);
    try {
      const token = await createUser(email, password);
      authenticate(token);
    } catch (error) {
      Alert.alert("please check your credentials or try again later!");
    }
    setIsAuthenticated(false);
  }
  if (isAuthenticated) {
    return <LoadingOverlay message="Creating user..." />;
  }
  return <AuthContent onAuthenticate={signUpHandler} />;
}

export default SignupScreen;
