import { Text } from "react-native";
import ItemList from "../components/ItemList";
import { useInfiniteQuery } from "@tanstack/react-query";
import { FlashList } from "@shopify/flash-list";

export default function Page() {
  async function fetchData({ pageParam }) {
    const response = await fetch(pageParam);

    const data = await response.json();

    const results = data.results.map((item) => {
      return {
        ...item,
        id: item.url.match(/[^a-z]\d+/g)[0].substring(1),
      };
    });

    return { ...data, results };
  }

  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: ["pokemons"],
    queryFn: fetchData,
    initialPageParam: "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0",
    getNextPageParam: (lastPage) => lastPage.next,
  });

  const pokemons = data?.pages.map((item) => item?.results).flat();

  return (
    <>
      <Text style={{ fontSize: 32, fontWeight: "700", marginBottom: 6 }}>
        Pokédex
      </Text>
      <Text style={{ fontSize: 18, marginBottom: 30 }}>
        As informações mais precisas sobre os Pokémons
      </Text>

      {pokemons && (
        <FlashList
          data={pokemons}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ItemList name={item.name} id={item.id} />}
          onEndReached={fetchNextPage}
          onEndReachedThreshold={0.1}
          estimatedItemSize={398}
        />
      )}
    </>
  );
}
