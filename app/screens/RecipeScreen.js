import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

import { fonts } from "../styles/fonts";

export default function RecipeScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const { recipe } = route.params;

  function formatearTiempo(minutos) {
    const valor = Number(minutos);

    if (!minutos || Number.isNaN(valor) || valor <= 0) {
      return "Sin tiempo";
    }

    if (valor < 60) {
      return `${valor} min`;
    }

    const horas = Math.floor(valor / 60);
    const minutosRestantes = valor % 60;

    if (minutosRestantes === 0) {
      return `${horas} h`;
    }

    return `${horas} h ${minutosRestantes} min`;
  }

  function eliminarReceta() {
    Alert.alert(
      "Eliminar receta",
      "¿Estás seguro de que querés eliminar esta receta?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => {
            console.log("Eliminar receta:", recipe.id);
            navigation.goBack();
          },
        },
      ],
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#222222" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Detalle de receta</Text>

          <View style={styles.headerSpace} />
        </View>

        {recipe.imagen ? (
          <Image
            source={{ uri: recipe.imagen }}
            style={styles.recipeImage}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Ionicons name="image-outline" size={42} color="#8a8a8a" />

            <Text style={styles.placeholderText}>
              Esta receta no tiene imagen
            </Text>
          </View>
        )}

        <View style={styles.content}>
          <Text style={styles.recipeName}>{recipe.nombre}</Text>

          <View style={styles.recipeTime}>
            <Ionicons name="time-outline" size={21} color="#8a8a8a" />

            <Text style={styles.recipeTimeText}>
              {formatearTiempo(recipe.tiempo)}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ingredientes</Text>

            {Array.isArray(recipe.ingredientes) &&
            recipe.ingredientes.length > 0 ? (
              recipe.ingredientes.map((ingrediente, index) => (
                <View key={index} style={styles.ingredientRow}>
                  <View style={styles.bullet} />

                  <Text style={styles.ingredientText}>
                    {typeof ingrediente === "string"
                      ? ingrediente
                      : ingrediente.nombre || ingrediente.ingrediente || ""}
                  </Text>
                </View>
              ))
            ) : (
              <Text style={styles.emptyText}>
                No hay ingredientes cargados.
              </Text>
            )}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preparación</Text>

            {Array.isArray(recipe.preparacion) &&
            recipe.preparacion.length > 0 ? (
              recipe.preparacion.map((paso, index) => (
                <View key={index} style={styles.stepRow}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>{index + 1}</Text>
                  </View>

                  <Text style={styles.stepText}>
                    {typeof paso === "string"
                      ? paso
                      : paso.descripcion || paso.paso || paso.texto || ""}
                  </Text>
                </View>
              ))
            ) : (
              <Text style={styles.emptyText}>
                No hay pasos de preparación cargados.
              </Text>
            )}
          </View>
          {/**botones de accion */}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  scrollContent: {
    paddingBottom: 32,
  },

  headerSpace: {
    width: 42,
    height: 42,
  },

  header: {
    height: 70,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f1f3f5",
  },

  headerTitle: {
    flex: 1,
    marginHorizontal: 12,
    textAlign: "center",
    fontSize: 18,
    fontFamily: fonts.semiBold,
    color: "#222222",
  },

  deleteButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff0f0",
  },

  recipeImage: {
    width: "100%",
    height: 250,
  },

  imagePlaceholder: {
    width: "100%",
    height: 250,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e5edf5",
    gap: 8,
  },

  placeholderText: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: "#8a8a8a",
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },

  recipeName: {
    fontSize: 28,
    lineHeight: 34,
    fontFamily: fonts.bold,
    color: "#222222",
  },

  recipeTime: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 12,
  },

  recipeTimeText: {
    fontSize: 16,
    fontFamily: fonts.regular,
    color: "#6b7280",
  },

  section: {
    marginTop: 30,
  },

  sectionTitle: {
    marginBottom: 16,
    fontSize: 22,
    fontFamily: fonts.semiBold,
    color: "#222222",
  },

  ingredientRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },

  bullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 7,
    marginRight: 12,
    backgroundColor: "#6c9f68",
  },

  ingredientText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    fontFamily: fonts.regular,
    color: "#444444",
  },

  stepRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 18,
  },

  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6c9f68",
  },

  stepNumberText: {
    fontSize: 15,
    fontFamily: fonts.semiBold,
    color: "#ffffff",
  },

  stepText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 25,
    fontFamily: fonts.regular,
    color: "#444444",
  },

  emptyText: {
    fontSize: 15,
    fontFamily: fonts.regular,
    color: "#8a8a8a",
  },
});
