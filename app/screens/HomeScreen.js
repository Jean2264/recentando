import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Pressable, View, FlatList } from "react-native";

import Header from "../components/Header";
import Searchbar from "../components/Searchbar";
import RecipeCard from "../components/RecipeCard";

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <Header />

      <Pressable
        style={styles.addButton}
        onPress={() => navigation.navigate("RecipeForm")}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </Pressable>

      <Searchbar title="Buscar recetas" />

      <View style={styles.section}>
        <RecipeCard
          title="Bizcochuelo de chocolate"
          onPress={() => navigation.navigate("Recipe")}
        />

        <RecipeCard
          title="Bizcochuelo de vainilla"
          onPress={() => navigation.navigate("Recipe")}
        />
      </View>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 3,
    backgroundColor: "#f1f6fe",
    alignItems: "center",
  },

  addButton: {
    width: 50,
    height: 50,
    alignSelf: "flex-end",
    marginTop: 30,
    marginBottom: 20,
    marginRight: 10,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3b82f6",
    borderWidth: 3,
    borderColor: "#e0f2fe",
  },

  section: {
    width: "90%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    top: 20,
  },
});
