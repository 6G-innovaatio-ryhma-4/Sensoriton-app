import { Image, StyleSheet, Text, View, Dimensions } from "react-native";
import { main } from "../../assets/colors";
import { scenarios } from "../../assets/data";
import { useSimulation } from "../../components/SimulationContext";
import ImageZoom from 'react-native-image-pan-zoom';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';




export default function Kotisivu() {
  const { height, width } = Dimensions.get('window')
  const { scenario } = useSimulation();
  const currentData = scenarios[scenario] || scenarios.kotona;

  const imageMap = {
    tyhjä: require("../../assets/images/pohjakuva.png"),
    kotona: require("../../assets/images/pohjakuva_kotona.png"),
    oviAuki: require("../../assets/images/pohjakuva_ovi_auki.png"),
    tuntematon: require("../../assets/images/pohjakuva_tunkeilija.png"),
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Etusivu</Text>

      <ImageZoom
        cropWidth={width}
        cropHeight={height}
        imageWidth={width}
        imageHeight={height * .5}
        minScale={.8}
        maxScale={3}
        enableCenterFocus={true}
      >
        <Image source={imageMap[scenario] || imageMap.kotona} style={[styles.image, { height: height * .5, width: width }]} />
      </ImageZoom>
      <MaterialIcons name="pinch" color={main.accent} size={50} style= {styles.pinchIcon} />

      <View style={styles.list}>
        <Text style={styles.listTitle}>{currentData.tilanne}</Text>

        {currentData.kotona.map((person) => (
          <View key={person.id} style={styles.row}>
            <Image
              source={require("../../assets/icons/personIcon.png")}
              style={styles.avatar}
            />
            <View>
              <Text style={styles.name}>{person.name}</Text>
              <Text style={styles.role}>{person.room}</Text>
            </View>
          </View>
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
  image: {
    marginBottom: 15,
    resizeMode: "contain",
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
    marginLeft: 10,
    color: main.background,
    fontSize: 25,
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
    marginLeft: 10,
  },
  name: {
    marginLeft: 10,
    fontSize: 25,
    fontWeight: "500",
    color: main.background,
  },
  role: {
    marginLeft: 10,
    fontSize: 20,
    color: "#cfcfcf",
  },
  pinchIcon: {
    position: 'absolute',
    top: 250,
    left: 20,
    opacity: 0.7,
  },
});