import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { main } from "../../assets/colors";
import { useSimulation } from "../../components/SimulationContext";
import { useRouter } from 'expo-router'

export default function Simulaatio() {
  const { setScenario } = useSimulation();
  const router  = useRouter()

  const buttons = [
    { label: "Koti tyhjänä", key: "tyhjä" },
    { label: "Kotiväki paikalla", key: "kotona" },
    { label: "Tunnistamaton henkilö kotona", key: "tuntematon" },
    { label: "Ovi jäänyt auki", key: "oviAuki" },
  ];

  const vaihdaTilanne = (key) => {
    setScenario(key)
    router.navigate('/Kotisivu')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Simulaatio</Text>

      <View style={styles.grid}>
        {buttons.map((btn) => (
          <TouchableOpacity key={btn.key} style={styles.button} onPress={() => vaihdaTilanne(btn.key)}>
            <Text style={styles.buttonText}>{btn.label}</Text>
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
    height: "100%",
    width: "85%",
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "center",
    justifyContent: "space-between",
  },
  button: {
    width: "45%",
    height: "20%",
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