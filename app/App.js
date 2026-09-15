import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import HomeScreen from "./screens/HomeScreen";
import { useFonts } from "expo-font";
import { initializeDatabase } from "./database/database";
import RecipeScreen from "./screens/RecipeScreen";
import RecipeFormScreen from "./screens/RecipeFormScreen";
import { useEffect } from "react";
const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
  });

  useEffect(() => {
    async function prepararBaseDeDatos() {
      try {
        await initializeDatabase();
      } catch (error) {
        console.error("Error al inicializar ela base de datos: ", error);
      }
    }
    prepararBaseDeDatos();
  }, []);
  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Recipe"
            component={RecipeScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="RecipeForm"
            component={RecipeFormScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
