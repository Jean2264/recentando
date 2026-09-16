import { Pressable, Text, Image, StyleSheet, View } from "react-native";

import { fonts } from "../styles/fonts";
import { Ionicons } from "@expo/vector-icons";

export default function RecipeCard({ title, onPress, image, tiempo }) {
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
  return (
    <Pressable style={styles.card} onPress={onPress}>
      {image ? (
        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Ionicons name="image-outline" size={28} color="#8a8a8a" />
        </View>
      )}

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>

        <View style={styles.time}>
          <Ionicons name="time-outline" size={16} color="#8a8a8a" />

          <Text style={styles.timeText}>
            {formatearTiempo(tiempo) || "Sin tiempo"}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: 70,
    gap: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    padding: 5,
    backgroundColor: "#fff",
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

  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },

  imagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e5edf5",
  },

  info: {
    flex: 1,
    justifyContent: "center",
  },

  title: {
    fontSize: 17,
    fontFamily: fonts.medium,
    color: "#1F2937",
    marginBottom: 8,
  },

  time: {
    flexDirection: "row",
    alignItems: "center",
  },

  timeText: {
    marginLeft: 5,
    fontSize: 14,
    fontFamily: fonts.regular,
    color: "#8a8a8a",
  },
});
