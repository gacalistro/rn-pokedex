import { View, Text, Image, Pressable, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { toCapitalize } from "../utils/toCapitalize";
import { formatId } from "../utils/formatId";

export default function ItemList({ id, name }) {
  const { navigate } = useRouter();

  const imageURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  return (
    <Pressable onPress={() => navigate(`/pokemon/${id}`)}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderWidth: 1,
          borderColor: "#eee",
          borderRadius: 12,
          paddingRight: 10,
          marginBottom: 10,
        }}
      >
        <View
          style={{
            padding: 20,
            flexBasis: "75%",
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "800" }}>
            #{formatId(id)}
          </Text>
          <Text style={{ fontSize: 30, fontWeight: "300" }}>
            {toCapitalize(name)}
          </Text>
        </View>

        <Image
          style={{ flex: 1, height: "100%", width: null }}
          source={{
            uri: imageURL,
          }}
        />
      </View>
    </Pressable>
  );
}
