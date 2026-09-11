import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Pressable, View, FlatList, Text } from "react-native";

import Header from "../components/Header";
import Searchbar from "../components/Searchbar";
import RecipeCard from "../components/RecipeCard";
import { fonts } from "../styles/fonts";

const recetas = [
  {
    id: "1",
    title: "Bizcochuelo de chocolate",
    tiempo: "45 minutos",
    image: require("../assets/recipes/zapallitos-rellenos-deliciosos-foto-principal.webp"),
  },
  {
    id: "2",
    title: "Bizcochuelo de vainilla",
    tiempo: "1 hora",
    image: require("../assets/recipes/zapallitos-rellenos-deliciosos-foto-principal.webp"),
  },
];

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
        <Text style={styles.title}>Mis recetas</Text>

        <FlatList
          data={recetas}
          keyExtractor={(item) => item.id}
          style={styles.recipes}
          renderItem={({ item }) => (
            <RecipeCard
              title={item.title}
              image={item.image}
              tiempo={item.tiempo}
              onPress={() => navigation.navigate("Recipe")}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.recipes}
        />
      </View>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginTop: 20,
  },

  title: {
    marginBottom: 15,
    fontFamily: fonts.semiBold,
    fontSize: 26,
    color: "#1F2937",
  },

  recipes: {
    marginBottom: 30,
  },
});
