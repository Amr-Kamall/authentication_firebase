import { useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { login } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Alert } from "react-native";
import { useAuthContext } from "../store/AuthContext";

function LoginScreen() {
  const { authenticate } = useAuthContext();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  async function signInHandler({ email, password }) {
    setIsAuthenticated(true);
    try {
      const token = await login(email, password);
      authenticate(token);
    } catch (error) {
      Alert.alert(
        "Authentication failed! , check your credentials or try again later!"
      );
    }
    setIsAuthenticated(false);
  }
  if (isAuthenticated) {
    return <LoadingOverlay message="logging user..." />;
  }
  return <AuthContent isLogin onAuthenticate={signInHandler} />;
}

export default LoginScreen;
