import { StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import DondeEstoy from '@/components/DondeEstoy';
import { ActionButton, Kicker, kitchenPalette, Screen } from '@/components/ui';
import { useAppContext } from '@/context/AppContext';

export default function AtendidosScreen() {
  const { historialAtendidos, cerrarSesion } = useAppContext();
  const lista = [...historialAtendidos].reverse();

  return (
    <Screen tone="kitchen">
      <Kicker tone="kitchen">Historial de cocina</Kicker>
      <Text style={styles.title}>Pedidos atendidos</Text>
      {lista.length === 0 ? <View style={styles.empty}><Ionicons name="receipt-outline" size={34} color={kitchenPalette.muted} /><Text style={styles.copy}>Todavía no hay pedidos en el historial.</Text></View> : (
        <View style={styles.list}>{lista.map((pedido) => (
          <View key={pedido.numero} style={styles.order}>
            <View style={styles.orderHead}><Text style={styles.number}>TURNO #{String(pedido.numero).padStart(3, '0')}</Text><Text style={styles.time}>{pedido.fecha.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}</Text></View>
            <Text style={styles.copy}>{pedido.items.map((item) => `${item.cantidad} × ${item.plato.nombre}`).join(' · ')}</Text>
            <Text style={styles.total}>${pedido.total.toLocaleString('es-AR')}</Text>
          </View>
        ))}</View>
      )}
      <ActionButton title="Cerrar sesión" icon="log-out-outline" variant="quiet" onPress={cerrarSesion} tone="kitchen" />
      <DondeEstoy />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: kitchenPalette.ink, fontSize: 28, fontWeight: '900' },
  list: { gap: 9 },
  order: { gap: 8, padding: 14, borderRadius: 7, backgroundColor: kitchenPalette.paper, borderWidth: 1, borderColor: kitchenPalette.line },
  orderHead: { flexDirection: 'row', justifyContent: 'space-between' },
  number: { color: kitchenPalette.wood, fontSize: 12, fontWeight: '900' },
  time: { color: kitchenPalette.muted, fontSize: 12 },
  copy: { color: kitchenPalette.muted, fontSize: 13, lineHeight: 19 },
  total: { color: kitchenPalette.ink, fontSize: 14, fontWeight: '800' },
  empty: { minHeight: 200, alignItems: 'center', justifyContent: 'center', gap: 10 },
});