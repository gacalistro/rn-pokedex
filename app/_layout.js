import { Slot } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Layout() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, padding: 16 }}>
          <Slot />
        </SafeAreaView>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
