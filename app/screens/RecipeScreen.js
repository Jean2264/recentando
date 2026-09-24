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

import { StatusBar } from "expo-status-bar";

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

  function editarReceta() {
    navigation.navigate("RecipeForm", {
      mode: "edit",
      recipe: recipe,
    });
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />

      {/* =========================
          CONTENIDO SCROLLEABLE
      ========================= */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* =========================
            IMAGEN PRINCIPAL
        ========================= */}

        <View style={styles.imageContainer}>
          {recipe.imagen ? (
            <Image
              source={{ uri: recipe.imagen }}
              style={styles.recipeImage}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Ionicons name="image-outline" size={48} color="#8A8A8A" />

              <Text style={styles.placeholderText}>
                Esta receta no tiene imagen
              </Text>
            </View>
          )}
        </View>

        {/* =========================
            INFORMACIÓN PRINCIPAL
        ========================= */}

        <View style={styles.content}>
          {/* NOMBRE */}

          <Text style={styles.recipeName}>{recipe.nombre}</Text>

          {/* =========================
              TIEMPO DE COCCIÓN
          ========================= */}

          <View style={styles.infoCard}>
            <View style={styles.infoIconContainer}>
              <Ionicons name="time-outline" size={21} color="#555955" />
            </View>

            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Tiempo de cocción</Text>

              <Text style={styles.infoValue}>
                {formatearTiempo(recipe.tiempo)}
              </Text>
            </View>
          </View>

          {/* =========================
              INGREDIENTES
          ========================= */}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ingredientes</Text>

            {Array.isArray(recipe.ingredientes) &&
            recipe.ingredientes.length > 0 ? (
              <View style={styles.ingredientsList}>
                {recipe.ingredientes.map((ingrediente, index) => (
                  <View key={index} style={styles.ingredientRow}>
                    <View style={styles.ingredientBullet} />

                    <Text style={styles.ingredientText}>
                      {typeof ingrediente === "string"
                        ? ingrediente
                        : ingrediente.nombre || ingrediente.ingrediente || ""}
                    </Text>
                  </View>
                ))}
              </View>
            ) : (
              <Text style={styles.emptyText}>
                No hay ingredientes cargados.
              </Text>
            )}
          </View>

          {/* =========================
              PREPARACIÓN
          ========================= */}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preparación</Text>

            {Array.isArray(recipe.preparacion) &&
            recipe.preparacion.length > 0 ? (
              <View style={styles.preparationList}>
                {recipe.preparacion.map((paso, index) => (
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
                ))}
              </View>
            ) : (
              <Text style={styles.emptyText}>
                No hay pasos de preparación cargados.
              </Text>
            )}
          </View>
        </View>
      </ScrollView>

      {/* =========================
          BOTÓN VOLVER FIJO
      ========================= */}

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
        activeOpacity={0.8}
      >
        <Ionicons name="chevron-back" size={26} color="#202522" />
      </TouchableOpacity>

      {/* =========================
          FOOTER FIJO
      ========================= */}

      <View style={styles.footer}>
        {/* ELIMINAR */}

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={eliminarReceta}
          activeOpacity={0.8}
        >
          <Ionicons name="trash-outline" size={20} color="#C94A4A" />

          <Text style={styles.deleteButtonText}>Eliminar</Text>
        </TouchableOpacity>

        {/* EDITAR */}

        <TouchableOpacity
          style={styles.editButton}
          onPress={editarReceta}
          activeOpacity={0.8}
        >
          <Ionicons name="create-outline" size={20} color="#FFFFFF" />

          <Text style={styles.editButtonText}>Editar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  /* =========================
     CONTENEDOR
  ========================= */

  container: {
    flex: 1,

    backgroundColor: "#F7F7F5",
  },

  /* =========================
     SCROLL
  ========================= */

  scrollContent: {
    paddingBottom: 105,
  },

  /* =========================
     IMAGEN
  ========================= */

  imageContainer: {
    width: "100%",
    height: 310,

    position: "relative",
  },

  recipeImage: {
    width: "100%",
    height: "100%",
  },

  imagePlaceholder: {
    width: "100%",
    height: "100%",

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#EDEDE8",

    gap: 10,
  },

  placeholderText: {
    fontSize: 14,

    fontFamily: fonts.regular,

    color: "#8A8A8A",
  },

  /* =========================
     BOTÓN VOLVER FIJO
  ========================= */

  backButton: {
    position: "absolute",

    top: 48,
    left: 20,

    zIndex: 1000,

    elevation: 10,

    width: 44,
    height: 44,

    borderRadius: 22,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "rgba(255, 255, 255, 0.92)",
  },

  /* =========================
     CONTENIDO
  ========================= */

  content: {
    paddingHorizontal: 20,

    paddingTop: 22,
  },

  /* =========================
     NOMBRE
  ========================= */

  recipeName: {
    fontSize: 28,
    lineHeight: 34,

    fontFamily: fonts.bold,

    color: "#202522",
  },

  /* =========================
     TARJETA DE INFORMACIÓN
  ========================= */

  infoCard: {
    width: "100%",

    minHeight: 82,

    marginTop: 18,

    paddingHorizontal: 16,
    paddingVertical: 13,

    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#FFFFFF",

    borderRadius: 18,

    borderWidth: 1,
    borderColor: "#ECECE8",
  },

  infoIconContainer: {
    width: 44,
    height: 44,

    borderRadius: 14,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#F3F3EF",
  },

  infoTextContainer: {
    marginLeft: 13,
  },

  infoLabel: {
    fontSize: 13,

    fontFamily: fonts.regular,

    color: "#8A8D8A",
  },

  infoValue: {
    marginTop: 3,

    fontSize: 17,

    fontFamily: fonts.semiBold,

    color: "#202522",
  },

  /* =========================
     SECCIONES
  ========================= */

  section: {
    marginTop: 30,
  },

  sectionTitle: {
    marginBottom: 14,

    fontSize: 21,

    fontFamily: fonts.semiBold,

    color: "#202522",
  },

  /* =========================
     INGREDIENTES
  ========================= */

  ingredientsList: {
    width: "100%",

    paddingHorizontal: 16,
    paddingVertical: 4,

    backgroundColor: "#FFFFFF",

    borderRadius: 18,

    borderWidth: 1,
    borderColor: "#ECECE8",
  },

  ingredientRow: {
    minHeight: 48,

    flexDirection: "row",
    alignItems: "center",

    borderBottomWidth: 1,
    borderBottomColor: "#F1F1EE",
  },

  ingredientBullet: {
    width: 7,
    height: 7,

    marginRight: 12,

    borderRadius: 4,

    backgroundColor: "#777A77",
  },

  ingredientText: {
    flex: 1,

    paddingVertical: 12,

    fontSize: 15,

    lineHeight: 22,

    fontFamily: fonts.regular,

    color: "#444844",
  },

  /* =========================
     PREPARACIÓN
  ========================= */

  preparationList: {
    width: "100%",

    paddingHorizontal: 16,
    paddingVertical: 4,

    backgroundColor: "#FFFFFF",

    borderRadius: 18,

    borderWidth: 1,
    borderColor: "#ECECE8",
  },

  stepRow: {
    flexDirection: "row",
    alignItems: "flex-start",

    paddingVertical: 14,

    borderBottomWidth: 1,
    borderBottomColor: "#F1F1EE",
  },

  stepNumber: {
    width: 30,
    height: 30,

    marginRight: 12,

    borderRadius: 15,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#202522",
  },

  stepNumberText: {
    fontSize: 13,

    fontFamily: fonts.semiBold,

    color: "#FFFFFF",
  },

  stepText: {
    flex: 1,

    paddingTop: 3,

    fontSize: 15,

    lineHeight: 23,

    fontFamily: fonts.regular,

    color: "#444844",
  },

  /* =========================
     ESTADO VACÍO
  ========================= */

  emptyText: {
    paddingVertical: 14,

    fontSize: 15,

    fontFamily: fonts.regular,

    color: "#8A8A8A",
  },

  /* =========================
     FOOTER FIJO
  ========================= */

  footer: {
    position: "absolute",

    left: 0,
    right: 0,
    bottom: 0,

    zIndex: 1000,

    elevation: 10,

    minHeight: 82,

    paddingHorizontal: 16,
    paddingVertical: 12,

    flexDirection: "row",
    alignItems: "center",

    gap: 10,

    backgroundColor: "#FFFFFF",

    borderTopWidth: 1,
    borderTopColor: "#ECECE8",
  },

  /* =========================
     ELIMINAR
  ========================= */

  deleteButton: {
    flex: 1,

    height: 50,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    borderRadius: 16,

    backgroundColor: "#FFF1F1",
  },

  deleteButtonText: {
    marginLeft: 8,

    fontSize: 15,

    fontFamily: fonts.semiBold,

    color: "#C94A4A",
  },

  /* =========================
     EDITAR
  ========================= */

  editButton: {
    flex: 1,

    height: 50,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    borderRadius: 16,

    backgroundColor: "#202522",
  },

  editButtonText: {
    marginLeft: 8,

    fontSize: 15,

    fontFamily: fonts.semiBold,

    color: "#FFFFFF",
  },
});
