import { Tabs } from 'expo-router/js-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAppContext } from '@/context/AppContext';
import { palette } from '@/components/ui';

export default function TabsLayout() {
  const { carrito } = useAppContext();
  const cantidad = carrito.reduce((suma, item) => suma + item.cantidad, 0);

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: palette.pine, tabBarStyle: { backgroundColor: palette.paper, borderTopColor: palette.line } }}>
      <Tabs.Screen name="index" options={{ title: 'Inicio', tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} /> }} />
      <Tabs.Screen name="menu" options={{ title: 'Menú', headerShown: false, tabBarIcon: ({ color, size }) => <Ionicons name="restaurant" size={size} color={color} /> }} />
      <Tabs.Screen name="carrito" options={{ title: 'Carrito', headerShown: false, tabBarBadge: cantidad || undefined, tabBarIcon: ({ color, size }) => <Ionicons name="cart" size={size} color={color} /> }} />
    </Tabs>
  );
}