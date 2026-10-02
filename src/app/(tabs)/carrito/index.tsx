import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import DondeEstoy from '@/components/DondeEstoy';
import { ActionButton, Kicker, Screen, SectionTitle, palette } from '@/components/ui';
import { useAppContext } from '@/context/AppContext';

export default function CarritoScreen() {
  const { carrito, deshacerUltimo, pilaDeshacer, nota } = useAppContext();
  const total = carrito.reduce((suma, item) => suma + item.plato.precio * item.cantidad, 0);

  return (
    <Screen>
      <Kicker>Tu pedido</Kicker>
      <Text style={styles.title}>El carrito</Text>
      {carrito.length === 0 ? (
        <View style={styles.empty}><Ionicons name="bag-handle-outline" size={34} color={palette.pine} /><SectionTitle>Tu carrito está vacío</SectionTitle><Text style={styles.copy}>El menú de hoy tiene algo para vos.</Text><Link href="/menu" asChild><Pressable style={styles.menuLink}><Text style={styles.menuLinkText}>Ir al menú</Text><Ionicons name="arrow-forward" size={16} color={palette.pine} /></Pressable></Link></View>
      ) : (
        <>
          <View style={styles.items}>{carrito.map(({ plato, cantidad }) => <View key={plato.id} style={styles.item}><View style={styles.itemText}><Text style={styles.name}>{plato.nombre}</Text><Text style={styles.copy}>{cantidad} × ${plato.precio.toLocaleString('es-AR')}</Text></View><Text style={styles.itemTotal}>${(plato.precio * cantidad).toLocaleString('es-AR')}</Text></View>)}</View>
          <View style={styles.totalRow}><Text style={styles.totalLabel}>Total</Text><Text style={styles.total}>${total.toLocaleString('es-AR')}</Text></View>
          <Link href="/carrito/nota" asChild><Pressable style={styles.noteLink}><Ionicons name="create-outline" size={18} color={palette.pine} /><Text style={styles.noteText}>{nota ? 'Editar nota para cocina' : 'Agregar nota para cocina'}</Text><Ionicons name="chevron-forward" size={17} color={palette.pine} /></Pressable></Link>
          <ActionButton title="Deshacer último" onPress={deshacerUltimo} icon="arrow-undo-outline" variant="quiet" disabled={pilaDeshacer.vacia} />
          <Link href="/confirmar" asChild><Pressable style={styles.confirm}><Text style={styles.confirmText}>Continuar al resumen</Text><Ionicons name="arrow-forward" size={18} color={palette.paper} /></Pressable></Link>
        </>
      )}
      <DondeEstoy />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: palette.ink, fontSize: 34, fontWeight: '900' },
  empty: { minHeight: 260, alignItems: 'center', justifyContent: 'center', gap: 12 },
  copy: { color: palette.muted, fontSize: 13 },
  menuLink: { flexDirection: 'row', alignItems: 'center', gap: 8, padding: 10 },
  menuLinkText: { color: palette.pine, fontWeight: '800' },
  items: { paddingHorizontal: 15, borderRadius: 8, backgroundColor: palette.paper },
  item: { minHeight: 70, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12, borderBottomWidth: StyleSheet.hairlineWidth, borderColor: palette.line },
  itemText: { flex: 1, gap: 5 },
  name: { color: palette.ink, fontSize: 15, fontWeight: '800' },
  itemTotal: { color: palette.pine, fontSize: 15, fontWeight: '900' },
  totalRow: { minHeight: 58, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderTopWidth: 1, borderColor: palette.line },
  totalLabel: { color: palette.muted, fontSize: 14 },
  total: { color: palette.ink, fontSize: 24, fontWeight: '900' },
  noteLink: { minHeight: 52, flexDirection: 'row', alignItems: 'center', gap: 10 },
  noteText: { flex: 1, color: palette.pine, fontWeight: '800' },
  confirm: { minHeight: 52, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: 7, backgroundColor: palette.tomato },
  confirmText: { color: palette.paper, fontWeight: '800' },
});