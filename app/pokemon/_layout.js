import { View, Text, Pressable } from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { Slot, useRouter } from "expo-router";

export default function Layout() {
  const { back } = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Pressable onPress={back}>
          <ChevronLeft size={44} color="black" />
        </Pressable>
        <Text style={{ fontWeight: "600", fontSize: 24 }}>Pokémon</Text>
        <View style={{ width: 44 }} />
      </View>

      <Slot style={{ flex: 1 }} />
    </View>
  );
}
