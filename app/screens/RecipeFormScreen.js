import { StyleSheet, View, Pressable, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { fonts } from "../styles/fonts";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native";
import { useState } from "react";

export default function RecipeFormScreem({ navigation, route }) {
  const mode = route.params?.mode ?? "create";

  const [nombre, setNombre] = useState("");
  const [ingredienteInput, setIngredienteInput] = useState("");
  const [ingredientes, setIngredientes] = useState([]);

  const [pasoInput, setPasoInput] = useState("");
  const [preparacion, setPreparacion] = useState([]);

  function agregarIngrediente() {
    if (!ingredienteInput.trim()) return;

    setIngredientes([...ingredientes, ingredienteInput.trim()]);

    setIngredienteInput("");
  }

  function agregarPaso() {
    if (!pasoInput.trim()) return;

    setPreparacion([...preparacion, pasoInput.trim()]);

    setPasoInput("");
  }

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <Pressable style={styles.btnBack} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#222" />
        </Pressable>

        <Text>{mode === "edit" ? "Editar receta" : "Crear receta"}</Text>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Text>Agregar ingredientes</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItem: "center",
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#dbe7ed",
    shadowColor: "#000",
    shadowOffset: {
      height: 1,
      width: 0,
    },

    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  btnBack: {
    width: 50,
    height: 50,

    justifyContent: "center",
    alignItems: "center",
  },
});
