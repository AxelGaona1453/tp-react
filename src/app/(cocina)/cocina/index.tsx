import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import DondeEstoy from '@/components/DondeEstoy';
import { ActionButton, Kicker, kitchenPalette, Screen } from '@/components/ui';
import { useAppContext } from '@/context/AppContext';

export default function CocinaScreen() {
  const { pedidosPendientes, atenderSiguiente, cerrarSesion } = useAppContext();
  const pedido = pedidosPendientes[0];

  return (
    <Screen tone="kitchen">
      <Kicker tone="kitchen">Panel de cocina</Kicker>
      <Text style={styles.title}>Comanda actual</Text>
      <View style={styles.queue}><Text style={styles.queueValue}>{pedidosPendientes.length}</Text><Text style={styles.queueLabel}>pedidos en espera</Text></View>
      {pedido ? (
        <View style={styles.order}>
          <View style={styles.orderTop}><Text style={styles.turn}>TURNO #{String(pedido.numero).padStart(3, '0')}</Text><Text style={styles.time}>{pedido.fecha.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}</Text></View>
          {pedido.items.map((item) => <View key={item.plato.id} style={styles.item}><Text style={styles.itemName}>{item.plato.nombre}</Text><Text style={styles.quantity}>× {item.cantidad}</Text></View>)}
          {pedido.nota ? <View style={styles.note}><Text style={styles.noteLabel}>ACLARACIÓN</Text><Text style={styles.noteCopy}>{pedido.nota}</Text></View> : null}
          <Text style={styles.total}>Total · ${pedido.total.toLocaleString('es-AR')}</Text>
          <ActionButton title="Atender siguiente" icon="checkmark-circle-outline" onPress={atenderSiguiente} tone="kitchen" />
        </View>
      ) : <View style={styles.empty}><Ionicons name="checkmark-done-outline" size={36} color={kitchenPalette.wood} /><Text style={styles.emptyTitle}>La fila está vacía</Text><Text style={styles.emptyCopy}>Los nuevos pedidos aparecerán acá en orden de llegada.</Text></View>}
      <Link href="/cocina/atendidos" asChild><Pressable style={styles.history}><Text style={styles.historyText}>Ver pedidos atendidos</Text><Ionicons name="arrow-forward" size={17} color={kitchenPalette.wood} /></Pressable></Link>
      <ActionButton title="Cerrar sesión" icon="log-out-outline" variant="quiet" onPress={cerrarSesion} tone="kitchen" />
      <DondeEstoy />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: kitchenPalette.ink, fontSize: 30, fontWeight: '900' },
  queue: { flexDirection: 'row', alignItems: 'baseline', gap: 8, paddingVertical: 5 },
  queueValue: { color: kitchenPalette.wood, fontSize: 30, fontWeight: '900' },
  queueLabel: { color: kitchenPalette.muted, fontSize: 14 },
  order: { gap: 14, padding: 18, borderRadius: 8, backgroundColor: kitchenPalette.paper, borderWidth: 1, borderColor: kitchenPalette.line },
  orderTop: { flexDirection: 'row', justifyContent: 'space-between' },
  turn: { color: kitchenPalette.wood, fontSize: 12, fontWeight: '900', letterSpacing: 1 },
  time: { color: kitchenPalette.muted, fontSize: 12 },
  item: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  itemName: { color: kitchenPalette.ink, fontSize: 16, fontWeight: '800' },
  quantity: { color: kitchenPalette.wood, fontWeight: '800' },
  note: { padding: 11, gap: 5, backgroundColor: '#F1E4D3' },
  noteLabel: { color: kitchenPalette.woodDark, fontSize: 10, fontWeight: '900', letterSpacing: 1 },
  noteCopy: { color: kitchenPalette.ink, fontSize: 14 },
  total: { paddingTop: 10, borderTopWidth: StyleSheet.hairlineWidth, borderColor: kitchenPalette.line, color: kitchenPalette.muted, fontWeight: '700' },
  empty: { minHeight: 210, alignItems: 'center', justifyContent: 'center', gap: 9, padding: 20, borderRadius: 8, backgroundColor: kitchenPalette.paper, borderWidth: 1, borderColor: kitchenPalette.line },
  emptyTitle: { color: kitchenPalette.ink, fontSize: 18, fontWeight: '800' },
  emptyCopy: { color: kitchenPalette.muted, fontSize: 13, lineHeight: 19, textAlign: 'center' },
  history: { minHeight: 48, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  historyText: { color: kitchenPalette.wood, fontWeight: '800' },
});