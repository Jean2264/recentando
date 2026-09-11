import { Pressable, Text } from "react-native";
import { StyleSheet } from "react-native";
import { fonts } from "../styles/fonts";

export default function RecipeCard({ title, onPress }) {
  return (
    <Pressable style={style.card} onPress={onPress}>
      <Text style={style.title}>{title}</Text>
    </Pressable>
  );
}

const style = StyleSheet.create({
  card: {
    width: "90%",
    minHeight: 70,
    padding: 15,
    marginBottom: 15,

    justifyContent: "center",

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

  title: {
    fontSize: 18,
    fontFamily: fonts.regular,
  },
});
