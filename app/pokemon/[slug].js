import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { Text, View, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { toCapitalize } from "../../utils/toCapitalize";
import { formatId } from "../../utils/formatId";
import { colorByType } from "../../utils/colorByType";
import { Zap, ZapOff } from "lucide-react-native";

export default function Page() {
  const { slug } = useLocalSearchParams();

  async function getPokemonData() {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${slug}`);

    const data = await response.json();

    // const abilities = data?.abilities.map((item) => item.ability.name);
    const id = formatId(String(data?.id));
    const name = toCapitalize(data?.name);
    const image = data?.sprites.front_default;
    const primary = colorByType(data?.types[0].type.name);

    return { ...data, id, name, image, primary };
  }

  const { data } = useQuery({
    queryKey: ["pokemon"],
    queryFn: getPokemonData,
  });

  return (
    <LinearGradient
      colors={[
        "transparent",
        "rgba(150,150,0,.1)",
        "rgba(150,50,50,.25)",
        "rgba(150,50,0,.1)",
        "transparent",
      ]}
      style={{ flex: 1, marginHorizontal: -16, padding: 16 }}
    >
      {/* Image */}
      <View style={{ flexBasis: "20%", marginBottom: 10 }}>
        <Image
          source={{ uri: data?.image }}
          style={{ flex: 1 }}
          resizeMode="contain"
        />
      </View>

      {/* Types */}
      <View
        style={{
          flexDirection: "row",
          gap: 12,
          justifyContent: "center",
          marginBottom: 40,
        }}
      >
        {data?.types.map((item) => (
          <Text
            key={item?.type.name}
            style={{
              paddingHorizontal: 10,
              paddingVertical: 6,
              borderWidth: 1,
              borderRadius: 16,
              fontSize: 18,
              borderColor: colorByType(item.type.name),
              color: colorByType(item.type.name),
              fontWeight: "600",
            }}
          >
            {item?.type.name}
          </Text>
        ))}
      </View>

      {/* ID and Name */}
      <Text style={{ fontWeight: "800", fontSize: 20 }}>#{data?.id}</Text>
      <Text style={{ fontSize: 32, fontWeight: "300" }}>{data?.name}</Text>

      {/* Stats */}
      <View>
        {data?.stats.map((item) => (
          <>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 4,
                marginTop: 20,
              }}
            >
              <Text>{String(item?.stat.name).toUpperCase()}</Text>
              <Text>{item?.base_stat}</Text>
            </View>

            <View
              style={{
                alignSelf: "stretch",
                height: 8,
                backgroundColor: "rgba(0, 0, 0, 0.2)",
                borderRadius: 99,
                overflow: "hidden",
              }}
            >
              <View
                style={{
                  width: `${(item?.base_stat * 100) / 255}%`,
                  height: "100%",
                  backgroundColor: "#4CBB17",
                }}
              />
            </View>
          </>
        ))}
      </View>

      <Text
        style={{
          fontSize: 16,
          fontWeight: "600",
          marginTop: 20,
          marginBottom: 8,
        }}
      >
        Habilidades
      </Text>

      <View style={{ gap: 6 }}>
        {data?.abilities.map((item) => (
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            {item.is_hidden ? <ZapOff color="black" /> : <Zap color="black" />}
            <Text>{toCapitalize(item?.ability.name)}</Text>
          </View>
        ))}
      </View>
    </LinearGradient>
  );
}
