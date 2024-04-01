const colors = {
  grass: "#63BC5A",
  fire: "#FF9D55",
  water: "#5090D6",
  bug: "#91C12F",
  electric: "#F4D23C",
  normal: "#919AA2",
  ground: "#D97845",
  fairy: "#EC8FE6",
  rock: "#C5B78C",
  poison: "#B567CE",
  psychic: "#FA7179",
  steel: "#5A8EA2",
  dragon: "#0B6DC3",
  fighting: "#CE416B",
  dark: "#5A5465",
  ghost: "#5269AD",
  ice: "#73CEC0",
  flying: "#89AAE3",
};

export function colorByType(type) {
  return colors[type];
}
