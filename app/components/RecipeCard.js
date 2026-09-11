import { Pressable, Text, Image, StyleSheet, View } from "react-native";
import { fonts } from "../styles/fonts";
import { Ionicons } from "@expo/vector-icons";

export default function RecipeCard({ title, onPress, image, tiempo }) {
  return (
    <Pressable style={style.card} onPress={onPress}>
      <Image source={image} style={style.image} />
      <View style={style.info}>
        <Text style={style.title} numberOfLines={2}>
          {title}
        </Text>
        <View style={style.time}>
          <Ionicons name="time-outline" size={16} color="#8a8a8a" />
          <Text style={style.timeText}>{tiempo}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const style = StyleSheet.create({
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

  info: {
    flex: 1,
    justifyContent: "center",
  },

  title: {
    flex: 1,

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
    color: "8a8a8a",
  },
});
