import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import DondeEstoy from '@/components/DondeEstoy';
import { Kicker, Screen, palette } from '@/components/ui';

const temas = [
  { ruta: '/ayuda/pedidos/seguir', titulo: 'Seguir un pedido', texto: 'Turnos y tiempos de espera' },
  { ruta: '/ayuda/pagos/efectivo', titulo: 'Medios de pago', texto: 'Cómo pagar en el comedor' },
  { ruta: '/ayuda/cuenta/acceso', titulo: 'Acceso de cocina', texto: 'Ingreso del personal' },
] as const;

export default function AyudaScreen() {
  return (
    <Screen>
      <Kicker>Estamos para ayudarte</Kicker>
      <Text style={styles.title}>Ayuda</Text>
      <Text style={styles.copy}>Elegí un tema para ver la información.</Text>
      <View style={styles.list}>{temas.map((tema) => (
        <Link key={tema.ruta} href={tema.ruta} asChild>
          <Pressable style={styles.row}><View style={styles.text}><Text style={styles.name}>{tema.titulo}</Text><Text style={styles.copy}>{tema.texto}</Text></View><Ionicons name="chevron-forward" size={18} color={palette.pine} /></Pressable>
        </Link>
      ))}</View>
      <DondeEstoy />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: palette.ink, fontSize: 34, fontWeight: '900' },
  copy: { color: palette.muted, fontSize: 14, lineHeight: 21 },
  list: { paddingHorizontal: 14, borderRadius: 8, backgroundColor: palette.paper },
  row: { minHeight: 72, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12, borderBottomWidth: StyleSheet.hairlineWidth, borderColor: palette.line },
  text: { flex: 1, gap: 4 },
  name: { color: palette.ink, fontSize: 15, fontWeight: '800' },
});