import { Drawer } from 'expo-router/drawer';
import { kitchenPalette } from '@/components/ui';

export default function CocinaLayout() {
  return (
    <Drawer screenOptions={{ headerStyle: { backgroundColor: kitchenPalette.paper }, headerTintColor: kitchenPalette.ink, headerShadowVisible: false, drawerStyle: { backgroundColor: kitchenPalette.paper }, drawerActiveTintColor: kitchenPalette.wood, drawerInactiveTintColor: kitchenPalette.muted }}>
      <Drawer.Screen name="cocina/index" options={{ title: 'Pedidos', drawerLabel: 'Pedidos' }} />
      <Drawer.Screen name="cocina/atendidos" options={{ title: 'Atendidos', drawerLabel: 'Atendidos' }} />
    </Drawer>
  );
}