import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import {
  StyleSheet,
  Pressable,
  View,
  FlatList,
  Text,
  ActivityIndicator,
} from "react-native";

import { obtenerRecetasPaginadas } from "../database/recetaRepository";
import Header from "../components/Header";
import Searchbar from "../components/Searchbar";
import RecipeCard from "../components/RecipeCard";
import { fonts } from "../styles/fonts";

const LIMITE_RECETAS = 20;

export default function HomeScreen({ navigation }) {
  const [recetas, setRecetas] = useState([]);
  const [pagina, setPagina] = useState(0);
  const [cargando, setCargando] = useState(false);
  const [hayMasRecetas, setHayMasRecetas] = useState(true);

  function abrirCrearReceta() {
    navigation.navigate("RecipeForm", {
      mode: "create",
    });
  }

  function abrirDetalleReceta(receta) {
    navigation.navigate("Recipe", {
      recipe: receta,
    });
  }

  const cargarRecetas = useCallback(
    async (reiniciar = false) => {
      if (cargando && !reiniciar) {
        return;
      }

      if (!reiniciar && !hayMasRecetas) {
        return;
      }

      try {
        setCargando(true);

        const offset = reiniciar ? 0 : pagina;

        const nuevasRecetas = await obtenerRecetasPaginadas(
          LIMITE_RECETAS,
          offset,
        );

        console.log("Recetas obtenidas desde SQLite:", nuevasRecetas);

        if (reiniciar) {
          setRecetas(nuevasRecetas);
          setPagina(nuevasRecetas.length);
        } else {
          setRecetas((recetasAnteriores) => {
            const recetasCombinadas = [...recetasAnteriores, ...nuevasRecetas];

            const recetasSinDuplicados = recetasCombinadas.filter(
              (receta, indice, array) =>
                indice ===
                array.findIndex(
                  (recetaAnterior) => recetaAnterior.id === receta.id,
                ),
            );

            return recetasSinDuplicados;
          });

          setPagina((paginaAnterior) => paginaAnterior + nuevasRecetas.length);
        }

        setHayMasRecetas(nuevasRecetas.length === LIMITE_RECETAS);
      } catch (error) {
        console.error("Error al cargar recetas:", error);
      } finally {
        setCargando(false);
      }
    },
    [cargando, hayMasRecetas, pagina],
  );

  useFocusEffect(
    useCallback(() => {
      cargarRecetas(true);
    }, [cargarRecetas]),
  );

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <Header />

      <Pressable style={styles.addButton} onPress={abrirCrearReceta}>
        <Ionicons name="add" size={28} color="#ffffff" />
      </Pressable>

      <Searchbar title="Buscar recetas" />

      <View style={styles.section}>
        <Text style={styles.title}>Mis recetas</Text>

        <FlatList
          data={recetas}
          keyExtractor={(item) => item.id.toString()}
          style={styles.recipes}
          renderItem={({ item }) => {
            console.log("Imagen de la receta:", item.imagen);

            return (
              <RecipeCard
                title={item.nombre}
                image={item.imagen}
                tiempo={item.tiempo}
                onPress={() => abrirDetalleReceta(item)}
              />
            );
          }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.recipesContent}
          onEndReached={() => {
            if (!cargando && hayMasRecetas) {
              cargarRecetas(false);
            }
          }}
          onEndReachedThreshold={0.2}
          ListFooterComponent={
            cargando ? (
              <ActivityIndicator
                size="small"
                color="#3b82f6"
                style={styles.loading}
              />
            ) : null
          }
          ListEmptyComponent={
            !cargando ? (
              <Text style={styles.emptyText}>
                Todavía no tenés recetas guardadas.
              </Text>
            ) : null
          }
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
    flex: 1,
  },

  title: {
    marginBottom: 15,
    fontFamily: fonts.semiBold,
    fontSize: 26,
    color: "#1F2937",
  },

  recipes: {
    width: "100%",
  },

  recipesContent: {
    paddingBottom: 30,
  },

  loading: {
    marginVertical: 20,
  },

  emptyText: {
    marginTop: 30,
    textAlign: "center",
    fontFamily: fonts.regular,
    fontSize: 16,
    color: "#6b7280",
  },
});
