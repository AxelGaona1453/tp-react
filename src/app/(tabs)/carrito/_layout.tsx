import { Stack } from 'expo-router';
import { palette } from '@/components/ui';

export default function CarritoStackLayout() {
  return (
    <Stack screenOptions={{ headerStyle: { backgroundColor: palette.paper }, headerTintColor: palette.ink, headerShadowVisible: false }}>
      <Stack.Screen name="index" options={{ title: 'Tu carrito' }} />
      <Stack.Screen name="nota" options={{ presentation: 'formSheet', sheetAllowedDetents: [0.5, 0.9], title: 'Nota para cocina' }} />
    </Stack>
  );
}