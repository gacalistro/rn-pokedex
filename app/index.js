import { Text } from "react-native";
import ItemList from "../components/ItemList";
import { useInfiniteQuery } from "@tanstack/react-query";
import { FlashList } from "@shopify/flash-list";

export default function Page() {
  async function fetchData({ pageParam }) {
    const response = await fetch(pageParam);

    return response.json();
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

      {data && (
        <FlashList
          data={pokemons}
          keyExtractor={(item) => item.url.match(/[^a-z]\d+/g)[0].substring(1)}
          renderItem={({ item }) => (
            <ItemList
              name={item.name}
              id={item.url.match(/[^a-z]\d+/g)[0].substring(1)}
            />
          )}
          onEndReached={fetchNextPage}
          onEndReachedThreshold={0.1}
          estimatedItemSize={398}
        />
      )}
    </>
  );
}
