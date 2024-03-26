import { View, Text, Image } from "react-native";

export default function ItemList({ id, name }) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#eee",
        borderRadius: 12,
        marginBottom: 8,
      }}
    >
      <View
        style={{
          padding: 20,
          flexBasis: "75%",
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "700" }}>
          #{id.padStart(3, 0)}
        </Text>
        <Text style={{ fontSize: 28, fontWeight: "700" }}>
          {name.at(0).toUpperCase().concat(name.substring(1))}
        </Text>
      </View>

      <Image
        style={{ flex: 1, height: "100%", width: "100%" }}
        source={{
          uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
        }}
      />
    </View>
  );
}
