import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import DondeEstoy from '@/components/DondeEstoy';
import { Kicker, Screen, palette } from '@/components/ui';

const articulos: Record<string, { titulo: string; texto: string }> = {
  'pedidos/seguir': { titulo: 'Seguir tu pedido', texto: 'Después de confirmar, recibís un número de turno. La cocina prepara los pedidos en orden de llegada. En la pantalla de turno vas a ver cuántos pedidos tenés adelante y una espera estimada.' },
  'pagos/efectivo': { titulo: 'Medios de pago', texto: 'Por ahora, los pedidos se abonan en efectivo al retirar en el mostrador. El total queda visible en el resumen antes de confirmar.' },
  'cuenta/acceso': { titulo: 'Acceso de cocina', texto: 'El acceso de demostración es cocina / 1234. Al cerrar sesión, la sección de cocina se quita de la navegación.' },
};

export default function ArticuloAyudaScreen() {
  const { slug } = useLocalSearchParams<{ slug: string[] }>();
  const clave = Array.isArray(slug) ? slug.join('/') : slug ?? '';
  const articulo = articulos[clave];

  return (
    <Screen>
      {!articulo ? <View style={styles.empty}><Ionicons name="help-circle-outline" size={34} color={palette.tomato} /><Text style={styles.title}>Artículo no encontrado</Text><Text style={styles.copy}>No hay contenido de ayuda para “{clave}”.</Text></View> : <><Kicker>Centro de ayuda</Kicker><Text style={styles.title}>{articulo.titulo}</Text><Text style={styles.copy}>{articulo.texto}</Text></>}
      <DondeEstoy />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: palette.ink, fontSize: 28, lineHeight: 34, fontWeight: '900' },
  copy: { color: palette.muted, fontSize: 15, lineHeight: 24 },
  empty: { minHeight: 200, alignItems: 'center', justifyContent: 'center', gap: 12 },
});