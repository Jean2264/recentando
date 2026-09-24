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
          <Ionicons name="image-outline" size={28} color="#8A8A8A" />
        </View>
      )}

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>

        <View style={styles.time}>
          <Ionicons name="time-outline" size={16} color="#8A8A8A" />

          <Text style={styles.timeText}>{formatearTiempo(tiempo)}</Text>
        </View>
      </View>

      <Ionicons name="chevron-forward" size={22} color="#777A77" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    minHeight: 82,

    flexDirection: "row",
    alignItems: "center",

    gap: 5,

    marginBottom: 14,
    padding: 10,

    backgroundColor: "#FFFFFF",

    borderRadius: 18,

    borderWidth: 1,
    borderColor: "#ECECE8",
  },

  image: {
    width: 62,
    height: 62,

    borderRadius: 15,
  },

  imagePlaceholder: {
    width: 62,
    height: 62,

    borderRadius: 15,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#F1F1EE",
  },

  info: {
    flex: 1,
    justifyContent: "center",
  },

  title: {
    fontSize: 16,
    fontFamily: fonts.medium,
    color: "#202522",

    marginBottom: 6,
  },

  time: {
    flexDirection: "row",
    alignItems: "center",
  },

  timeText: {
    marginLeft: 5,

    fontSize: 13,
    fontFamily: fonts.regular,
    color: "#8A8A8A",
  },
});
