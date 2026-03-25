export const scenarios = {
  kotona: {
    kotona: [
      { id: 1, name: "Sauli Niinistö", room: "Olohuone" },
      { id: 2, name: "Alexander Stubb", room: "Keittiö" },
      { id: 3, name: "Sanna Marin", room: "Työhuone" },
    ],
    tilanne: "Kotona",
  },

  tyhjä: {
    kotona: [],
    tilanne: "Ei ketään kotona",
  },

  tuntematon: {
    kotona: [{ id: 1, name: "Tuntematon henkilö", room: "Takaeteinen" }],
    tilanne: "Mahdollinen hätätilanne talossa",
  },

  oviAuki: {
    kotona: [
      { id: 1, name: "Ovi jäänyt auki", room: "Terassi" },
      { id: 2, name: "Ikkuna jäänyt auki", room: "Pääeteinen" }
    ],
    tilanne: "Ovi tai ikkuna jäänyt auki",
  },
};