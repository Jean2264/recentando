import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { fonts } from "../styles/fonts";
import { Ionicons } from "@expo/vector-icons";
export default function RecipeScreen({ navigation }) {
  const recipe = {
    id: 1,
    nombre: "Bizcochuelo de chocolate",

    ingredientes: [
      "300 gramos de harina 0000",
      "300 gramos de ricota",
      "200 gramos de jamón",
      "100 gramos de queso duro",
      "3 huevos",
      "1 pizca de nuez moscada",
      "Sal y pimienta",
    ],

    preparacion: [
      "Colocar la harina y formar una corona.",
      "Agregar los huevos y comenzar a incorporar la harina.",
      "Amasar durante aproximadamente 10 minutos.",
      "Preparar el relleno mezclando la ricota, jamón y queso.",
    ],
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <Pressable style={styles.btnBack} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#222" />
        </Pressable>
      </View>
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Bizcochuelo de chocolate</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ingredientes</Text>

          <Text style={styles.text}>
            300 Gramos Harina 0000 +(extra para espolvorear){"\n"}300 Gramos
            Ricota{"\n"}200 Gramos Jamón{"\n"}100 Gramos Queso duro
            (Reggianito/Sardo, Parmesano){"\n"}3 Huevos{"\n"}1 Pizca Nuez
            Moscada{"\n"}C/n Sal y Pimienta
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preparación</Text>

          <Text style={styles.text}>
            1-{"\n"}Colocar la harina en un recipiente o en la mesada formar una
            corona colocar los huevos en el centro batir los huevos con un
            tenedor para desligar y de a poco ir incorporando la harina amasar
            bien durante unos 10 minutos aproximadamente, la masa debe quedar
            lisa y pareja hacemos un bollo( Tener en cuenta que la proporción
            para pasta fresca es de 1 huevo grande cada 100 gr. de harina.
            Dependiendo del tamaño del huevo y del tipo de harina, puede ser que
            haya que agregar harina o un poco de agua. {"\n"}2{"\n"}En ambos
            casos, agregar sólo un poco, amasar para incorporar y volver a
            corregir en caso de que haga falta) Cubrir la masa con film (o bolsa
            plástica) y dejar descansar durante 20 minutos. Mientras descansa la
            masa, preparamos el relleno simplemente hay que picar el jamón,
            rallar el queso y colocar todo en un bowl junto con la ricota, nuez
            moscada, salpimentar a gusto mezclar todo muy bien para quede
            integrado. Una vez que paso los 20 minutos.{"\n"}3{"\n"}{" "}
            Espolvoreamos un poco de harina sobre la mesa y colocamos la masa
            Aplastamos el bollo un poco con las manos y con la ayuda de un palo
            comenzamos a estirar la masa o pasamos por la máquina de pastas
            hasta que quede fina, colocamos en el molde colocamos el relleno
            Cubrimos con otra capa de masa, igualmente fina, y ajustamos la masa
            al relleno procurando que no quede nada de aire en su interior pasar
            el palote por encima. Según se van haciendo, se van dejando sobre
            una placa enharinada.{"\n"}4{"\n"}Se pueden congelar crudos, lo
            ideal es colocarlos bien separados en una fuente apenas enharinada y
            llevar al freezer. Una vez congelados se puede colocar en una bolsa
            o tupper para que ocupen menos lugar. Se pueden conservar congelados
            durante meses. Al momento de querer consumirlos, hervir agua y
            colocar los ravioles directamente del freezer al agua hirviendo. No
            hace falta descongelarlos previamente. A la hora de servir acompañar
            con la salsa elegida.
          </Text>
        </View>

        <View style={styles.buttons}>
          <Pressable style={styles.deleteButton}>
            <Text style={styles.buttonText}>Eliminar</Text>
          </Pressable>

          <Pressable
            style={styles.editButton}
            onPress={() =>
              navigation.navigate("RecipeForm", {
                mode: "edit",
                recipe: recipe,
              })
            }
          >
            <Text style={styles.buttonText}>Editar</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#f1f6fe",
  },

  header: {
    height: 60,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItem: "center",
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#dbe7ed",
    shadowColor: "#000",
    shadowOffset: {
      height: 1,
      width: 0,
    },

    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },

  content: {
    flex: 1,
    padding: 20,
    flexDirection: "column",
  },
  scrollContent: {
    paddingBottom: 40,
    gap: 25,
  },

  title: {
    fontSize: 24,
    color: " #1F2937",
    fontFamily: fonts.semiBold,
    marginBottom: 30,
  },

  section: {
    backgroundColor: "#fff",
    padding: 10,

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
  sectionTitle: {
    fontSize: 20,
    color: " #1F2937",
    fontFamily: fonts.medium,
    marginBottom: 10,
    marginTop: 15,
  },

  text: {
    fontSize: 16,
    fontFamily: fonts.regular,
    color: " #1F2937",
    lineHeight: 24,
  },

  buttons: {
    justifyContent: "space-between",
    flexDirection: "row",
  },

  editButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#3b82f6",
  },

  deleteButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#616161",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,

    fontFamily: fonts.medium,
  },

  btnBack: {
    width: 50,
    height: 50,

    justifyContent: "center",
    alignItems: "center",
  },
});
