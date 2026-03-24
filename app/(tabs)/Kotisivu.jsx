import { Image, StyleSheet, Text, View } from "react-native";
import { main } from "../../assets/colors";

export default function Kotisivu() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Etusivu</Text>

      <Image
        source={require("../../assets/images/pohjakuva.png")}
        style={styles.image}
        resizeMode="contain"
      />

      <View style={styles.list}>
        <Text style={styles.listTitle}>Kotona</Text>

        <View style={styles.row}>
          <Image
            source={require("../../assets/icons/personIcon.png")}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.name}>Sauli Niinistö</Text>
            <Text style={styles.role}>Oleskelutila</Text>
          </View>
        </View>

        <View style={styles.row}>
          <Image
            source={require("../../assets/icons/personIcon.png")}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.name}>Tarja Halonen</Text>
            <Text style={styles.role}>Keittiö</Text>
          </View>
        </View>

        <View style={styles.row}>
          <Image
            source={require("../../assets/icons/personIcon.png")}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.name}>Alexander Stubb</Text>
            <Text style={styles.role}>Pesuhuone</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: main.background,
    alignItems: "center",
    paddingTop: 60,
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
  },
  image: {
    width: "85%",
    height: 220,
    marginBottom: 15,
  },
  list: {
    width: "85%",
    backgroundColor: main.accent,
    padding: 10,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  listTitle: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "600",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderTopWidth: 1,
    borderColor: "#00000020",
  },
  avatar: {
    width: 32,
    height: 32,
    marginRight: 10,
  },
  name: {
    fontSize: 15,
    fontWeight: "500",
  },
  role: {
    fontSize: 12,
    color: "#333",
  },
});