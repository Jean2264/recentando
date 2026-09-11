import { StyleSheet, View, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Searchbar({ title }) {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={22} color="#666" />

      <TextInput
        style={styles.input}
        placeholder={title}
        placeholderTextColor="#888"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    minHeight: 50,
    flexDirection: "row",
    alignItems: "center",

    borderWidth: 1,
    borderColor: "#dbe7ed",
    borderRadius: 10,
    paddingHorizontal: 15,

    backgroundColor: "#fff",

    shadowColor: "#000",
    shadowOffset: {
      height: 0,
      width: 2,
    },

    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
});
