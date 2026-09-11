import { StyleSheet, Text, View } from "react-native";
import { fonts } from "../styles/fonts";
export default function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.textMenu}>☰</Text>

      <Text style={styles.title}>Recetando</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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

  textMenu: {
    position: "absolute",
    left: 20,
    fontSize: 30,
  },

  title: {
    fontSize: 20,
    fontFamily: fonts.semiBold,
    fontWeight: "bold",
  },
});
