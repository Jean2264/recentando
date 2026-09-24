import { StyleSheet, View, TextInput } from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function Searchbar({ title }) {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={21} color="#777A77" />

      <TextInput
        style={styles.input}
        placeholder={title}
        placeholderTextColor="#8A8D8A"
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

    paddingHorizontal: 15,

    backgroundColor: "#FFFFFF",

    borderRadius: 16,

    borderWidth: 1,
    borderColor: "#ECECE8",
  },

  input: {
    flex: 1,

    marginLeft: 10,

    fontSize: 15,

    color: "#202522",
  },
});
