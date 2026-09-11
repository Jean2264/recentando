import {
  StyleSheet,
  View,
  Pressable,
  Text,
  TextInput,
  ScrollView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { fonts } from "../styles/fonts";
import { Ionicons } from "@expo/vector-icons";

import { useState } from "react";
import * as ImagenPicker from "expo-image-picker";

export default function RecipeFormScreem({ navigation, route }) {
  const mode = route.params?.mode ?? "create";

  const [nombre, setNombre] = useState("");
  const [imagen, setImagen] = useState(null);

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

  async function seleccionarIMagen() {
    const resultado = await ImagenPicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!resultado.canceled) {
      setImagen(resultado.assets[0].uri);
    }
  }

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <Pressable style={styles.btnBack} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#222" />
        </Pressable>

        <Text style={styles.title}>
          {mode === "edit" ? "Editar receta" : "Crear receta"}
        </Text>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Imagen de receta</Text>

          {imagen && (
            <Image source={{ uri: imagen }} style={styles.recipeImage} />
          )}

          <Pressable style={styles.imageButton} onPress={seleccionarIMagen}>
            <Ionicons name="image-outline" size={24} color="#fff" />

            <Text style={styles.imageButtonText}>
              {imagen ? "Cambiar imagen" : "Agregar imagen"}
            </Text>
          </Pressable>
        </View>

        <View style={styles.section}></View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    backgroundColor: "#f1f6fe",
  },
  header: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,

    backgroundColor: "#fff",
  },
  btnBack: {
    width: 50,
    height: 50,
    position: "absolute",
    left: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 20,
    left: 20,
    fontFamily: fonts.semiBold,
    fontWeight: "bold",
  },

  content: {
    flex: 1,

    padding: 10,
    flexDirection: "column",
  },

  section: {
    backgroundColor: "#fff",
    padding: 10,
    gap: 10,
    borderWidth: 1,
    borderColor: "#dbe7ed",
    borderRadius: 12,

    shadowColor: "#000",
    shadowOffset: {
      height: 1,
      width: 0,
    },

    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },

  sectionTitle: {
    fontSize: 25,
    fontFamily: fonts.medium,
  },

  imageButton: {
    minHeight: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    backgroundColor: "#3b82f6",
  },

  imageButtonText: {
    fontSize: 16,
    fontFamily: fonts.medium,
    color: "#fff",
  },

  recipeImage: {
    width: "100%",
    height: 200,

    borderRadius: 10,
  },
});
