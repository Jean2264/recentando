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
import * as ImagePicker from "expo-image-picker";

export default function RecipeFormScreen({ navigation, route }) {
  const mode = route.params?.mode ?? "create";
  const isEditMode = mode === "edit";

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

  async function seleccionarImagen() {
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!resultado.canceled) {
      setImagen(resultado.assets[0].uri);
    }
  }

  function guardarReceta() {
    console.log({
      nombre,
      imagen,
      ingredientes,
      preparacion,
    });
  }

  //Eliminar receta
  function eliminarReceta() {
    console.log("Eliminar receta");
  }

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <Pressable style={styles.btnBack} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#222" />
        </Pressable>

        <Text style={styles.headerTitle}>
          {mode === "edit" ? "Editar receta" : "Crear receta"}
        </Text>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* IMAGEN */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Imagen de la receta</Text>

          {imagen && (
            <Image source={{ uri: imagen }} style={styles.recipeImage} />
          )}

          <Pressable style={styles.imageButton} onPress={seleccionarImagen}>
            <Ionicons name="image-outline" size={24} color="#fff" />

            <Text style={styles.imageButtonText}>
              {imagen ? "Cambiar imagen" : "Agregar imagen"}
            </Text>
          </Pressable>
        </View>

        {/* NOMBRE */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nombre de la receta</Text>

          <TextInput
            style={[styles.input, isEditMode && styles.inputDisabled]}
            value={nombre}
            editable={!isEditMode}
            onChangeText={setNombre}
            placeholder="Ej: Bizcochuelo de chocolate"
            placeholderTextColor="#999"
          />
        </View>

        {/* INGREDIENTES */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ingredientes</Text>

          <View style={styles.addRow}>
            <TextInput
              style={styles.addInput}
              value={ingredienteInput}
              onChangeText={setIngredienteInput}
              placeholder="Ej: 300 g de harina"
              placeholderTextColor="#999"
            />

            <Pressable
              style={styles.addItemButton}
              onPress={agregarIngrediente}
            >
              <Ionicons name="add" size={24} color="#fff" />
            </Pressable>
          </View>

          <View style={styles.list}>
            {ingredientes.map((ingrediente, index) => (
              <View key={`${ingrediente}-${index}`} style={styles.listItem}>
                <Text style={styles.listItemText}>• {ingrediente}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* PREPARACIÓN */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preparación</Text>

          <View style={styles.addRow}>
            <TextInput
              style={[styles.addInput, styles.stepInput]}
              value={pasoInput}
              onChangeText={setPasoInput}
              placeholder="Ej: Mezclar la harina con los huevos"
              placeholderTextColor="#999"
              multiline
            />

            <Pressable style={styles.addItemButton} onPress={agregarPaso}>
              <Ionicons name="add" size={24} color="#fff" />
            </Pressable>
          </View>

          <View style={styles.list}>
            {preparacion.map((paso, index) => (
              <View key={`${paso}-${index}`} style={styles.listItem}>
                <Text style={styles.stepNumber}>{index + 1}.</Text>

                <Text style={styles.listItemText}>{paso}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* GUARDAR */}
        {!isEditMode ? (
          <Pressable style={styles.saveButton} onPress={guardarReceta}>
            <Text style={styles.saveButtonText}>Crear receta</Text>
          </Pressable>
        ) : (
          <View style={styles.editButtons}>
            <Pressable style={deleteButton} onPress={eliminarReceta}>
              <Ionicons name="trash-outline" size={20} color="#fff" />
              <Text style={styles.buttonText}>Eliminar receta</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f6fe",
  },

  header: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },

  btnBack: {
    width: 50,
    height: 50,
    position: "absolute",
    left: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  headerTitle: {
    fontSize: 20,
    fontFamily: fonts.semiBold,
    color: "#1F2937",
  },

  content: {
    flex: 1,
  },

  scrollContent: {
    padding: 15,
    paddingBottom: 40,
    gap: 20,
  },

  section: {
    backgroundColor: "#fff",
    padding: 15,
    gap: 12,
    borderWidth: 1,
    borderColor: "#dbe7ed",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },

  sectionTitle: {
    fontSize: 20,
    fontFamily: fonts.medium,
    color: "#1F2937",
  },

  input: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    paddingHorizontal: 12,
    fontSize: 16,
    fontFamily: fonts.regular,
    color: "#1F2937",
  },

  addRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  addInput: {
    flex: 1,
    minHeight: 48,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    paddingHorizontal: 12,
    fontSize: 16,
    fontFamily: fonts.regular,
    color: "#1F2937",
  },

  stepInput: {
    minHeight: 75,
    paddingTop: 12,
    textAlignVertical: "top",
  },

  addItemButton: {
    width: 48,
    height: 48,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3b82f6",
  },

  list: {
    marginTop: 5,
    gap: 10,
  },

  listItem: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  listItemText: {
    flex: 1,
    fontSize: 15,
    fontFamily: fonts.regular,
    color: "#374151",
    lineHeight: 22,
  },

  stepNumber: {
    width: 25,
    fontSize: 15,
    fontFamily: fonts.medium,
    color: "#3b82f6",
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

  saveButton: {
    minHeight: 52,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3b82f6",
  },

  saveButtonText: {
    fontSize: 17,
    fontFamily: fonts.medium,
    color: "#fff",
  },
});
