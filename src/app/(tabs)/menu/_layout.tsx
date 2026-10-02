import { Stack } from 'expo-router';
import { palette } from '@/components/ui';
import { platos } from '@/data/platos';

export default function MenuStackLayout() {
  return (
    <Stack screenOptions={{ headerStyle: { backgroundColor: palette.paper }, headerTintColor: palette.ink, headerShadowVisible: false }}>
      <Stack.Screen name="index" options={{ title: 'Menú del día' }} />
      <Stack.Screen
        name="[id]"
        options={({ route }) => ({
          title: platos.find((plato) => plato.id === Number((route.params as { id?: string } | undefined)?.id))?.nombre ?? 'Plato',
        })}
      />
    </Stack>
  );
}