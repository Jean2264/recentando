import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Alert,
  Image,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { fonts } from "../styles/fonts";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

export default function RecipeScreen({ navigation, route }) {
  const recipe = route.params?.recipe;

  if (!recipe) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No se encontró la receta.</Text>

          <Pressable
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Volver</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  function eliminarReceta() {
    Alert.alert("Eliminar receta", `¿Querés eliminar "${recipe.nombre}"?`, [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: () => {
          console.log("Receta eliminada:", recipe.id);

          navigation.goBack();
        },
      },
    ]);
  }

  function editarReceta() {
    navigation.navigate("RecipeForm", {
      mode: "edit",
      recipe: recipe,
    });
  }

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      {/* HEADER */}
      <View style={styles.header}>
        <Pressable style={styles.btnBack} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#222" />
        </Pressable>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>{recipe.nombre}</Text>

        {/* INGREDIENTES */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ingredientes</Text>

          {recipe.ingredientes?.map((ingrediente, index) => (
            <Text key={`${ingrediente}-${index}`} style={styles.text}>
              • {ingrediente}
            </Text>
          ))}
        </View>

        {/* PREPARACIÓN */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preparación</Text>

          {recipe.preparacion?.map((paso, index) => (
            <View key={`${paso}-${index}`} style={styles.stepRow}>
              <Text style={styles.stepNumber}>{index + 1}.</Text>

              <Text style={styles.text}>{paso}</Text>
            </View>
          ))}
        </View>

        {/* BOTONES */}
        <View style={styles.buttons}>
          <Pressable style={styles.deleteButton} onPress={eliminarReceta}>
            <Ionicons name="trash-outline" size={20} color="#fff" />

            <Text style={styles.buttonText}>Eliminar</Text>
          </Pressable>

          <Pressable style={styles.editButton} onPress={editarReceta}>
            <Ionicons name="create-outline" size={20} color="#fff" />

            <Text style={styles.buttonText}>Editar</Text>
          </Pressable>
        </View>
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
    height: 60,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
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

  content: {
    flex: 1,
    paddingHorizontal: 20,
  },

  scrollContent: {
    paddingTop: 20,
    paddingBottom: 40,
    gap: 25,
  },

  title: {
    fontSize: 24,
    color: "#1F2937",
    fontFamily: fonts.semiBold,
    marginBottom: 10,
  },

  section: {
    backgroundColor: "#fff",
    padding: 15,
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
    gap: 10,
  },

  sectionTitle: {
    fontSize: 20,
    color: "#1F2937",
    fontFamily: fonts.medium,
    marginBottom: 10,
  },

  text: {
    flex: 1,
    fontSize: 16,
    fontFamily: fonts.regular,
    color: "#1F2937",
    lineHeight: 24,
  },

  stepRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },

  stepNumber: {
    width: 25,
    fontSize: 16,
    fontFamily: fonts.medium,
    color: "#3b82f6",
  },

  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },

  editButton: {
    flex: 1,
    minHeight: 52,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    backgroundColor: "#3b82f6",
  },

  deleteButton: {
    flex: 1,
    minHeight: 52,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    backgroundColor: "#616161",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: fonts.medium,
  },

  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    gap: 20,
  },

  emptyText: {
    fontSize: 18,
    fontFamily: fonts.medium,
    color: "#1F2937",
  },

  backButton: {
    paddingHorizontal: 25,
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: "#3b82f6",
  },
});
