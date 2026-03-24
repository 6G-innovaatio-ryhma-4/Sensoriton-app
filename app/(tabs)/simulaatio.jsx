import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { main } from "../../assets/colors";

export default function Simulaatio() {
  const buttons = [
    "Koti tyhjänä",
    "Kotiväki paikalla",
    "Tunnistamaton henkilö kotona",
    "Ovi jäänyt auki",
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>simulaatio</Text>

      <View style={styles.grid}>
        {buttons.map((label, index) => (
          <TouchableOpacity key={index} style={styles.button}>
            <Text style={styles.buttonText}>{label}</Text>
          </TouchableOpacity>
        ))}
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
  grid: {
    width: "85%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  button: {
    width: "45%",
    height: 100,
    backgroundColor: main.accent,
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 25,
    textAlign: "center",
    fontWeight: "600",
    color: "#000",
  },
});