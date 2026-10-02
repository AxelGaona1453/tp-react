import { router, Stack } from 'expo-router';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AppProvider, useAppContext } from '@/context/AppContext';
import { palette } from '@/components/ui';

export const unstable_settings = { anchor: '(tabs)' };

function RootNavigator() {
  const { usuario } = useAppContext();

  useEffect(() => {
    if (usuario) router.replace('/cocina');
  }, [usuario]);

  return (
    <Stack
      screenOptions={{
        headerBackButtonDisplayMode: 'minimal',
        headerStyle: { backgroundColor: palette.paper },
        headerTintColor: palette.ink,
        headerShadowVisible: false,
        contentStyle: { backgroundColor: palette.canvas },
      }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="buscar" options={{ title: 'Buscar platos' }} />
      <Stack.Screen name="categorias/[categoria]" options={{ title: 'Categoría' }} />
      <Stack.Screen name="confirmar" options={{ presentation: 'modal', title: 'Confirmar pedido' }} />
      <Stack.Screen name="turno/[numero]" options={{ title: 'Tu turno' }} />
      <Stack.Screen name="ayuda/index" options={{ title: 'Ayuda' }} />
      <Stack.Screen name="ayuda/[...slug]" options={{ title: 'Ayuda' }} />
      <Stack.Screen name="pedido" options={{ headerShown: false }} />
      <Stack.Protected guard={!usuario}>
        <Stack.Screen name="login" options={{ presentation: 'modal', title: 'Acceso de cocina' }} />
      </Stack.Protected>
      <Stack.Protected guard={Boolean(usuario)}>
        <Stack.Screen name="(cocina)" options={{ headerShown: false }} />
      </Stack.Protected>
      <Stack.Screen name="+not-found" options={{ title: 'Página no encontrada' }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppProvider>
        <RootNavigator />
      </AppProvider>
    </GestureHandlerRootView>
  );
}
