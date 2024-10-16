import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import store from "./app/store/store";

const Stack = createNativeStackNavigator();

import Main from "./app/screens/Main";
import ResetPassword from "./app/screens/ResetPassword";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="ResetPassword"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
