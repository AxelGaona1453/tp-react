import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import DondeEstoy from '@/components/DondeEstoy';
import { ActionButton, Kicker, Screen, palette } from '@/components/ui';
import { useAppContext } from '@/context/AppContext';

export default function ConfirmarScreen() {
  const { carrito, nota, confirmarPedido } = useAppContext();
  const total = carrito.reduce((suma, item) => suma + item.plato.precio * item.cantidad, 0);

  function confirmar() {
    const numero = confirmarPedido();
    if (numero !== undefined) router.replace({ pathname: '/turno/[numero]', params: { numero: String(numero) } });
  }

  return (
    <Screen>
      <Kicker>Último paso</Kicker>
      <Text style={styles.title}>Revisá tu pedido</Text>
      {carrito.length === 0 ? <View style={styles.empty}><Ionicons name="bag-outline" size={30} color={palette.muted} /><Text style={styles.copy}>No hay productos para confirmar.</Text></View> : (
        <>
          <View style={styles.list}>{carrito.map(({ plato, cantidad }) => <View key={plato.id} style={styles.row}><Text style={styles.item}>{plato.nombre} <Text style={styles.quantity}>× {cantidad}</Text></Text><Text style={styles.amount}>${(plato.precio * cantidad).toLocaleString('es-AR')}</Text></View>)}</View>
          {nota ? <View style={styles.note}><Text style={styles.noteLabel}>Nota para cocina</Text><Text style={styles.copy}>{nota}</Text></View> : null}
          <View style={styles.totalRow}><Text style={styles.totalLabel}>Total a pagar</Text><Text style={styles.total}>${total.toLocaleString('es-AR')}</Text></View>
          <ActionButton title="Confirmar pedido" onPress={confirmar} icon="checkmark-circle-outline" />
          <Text style={styles.hint}>Al confirmar, te asignamos un turno y el pedido entra al final de la fila.</Text>
        </>
      )}
      <DondeEstoy />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: palette.ink, fontSize: 30, fontWeight: '900' },
  list: { paddingHorizontal: 14, borderRadius: 8, backgroundColor: palette.paper },
  row: { minHeight: 56, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10, borderBottomWidth: StyleSheet.hairlineWidth, borderColor: palette.line },
  item: { flex: 1, color: palette.ink, fontSize: 14, fontWeight: '700' },
  quantity: { color: palette.muted, fontWeight: '500' },
  amount: { color: palette.pine, fontWeight: '800' },
  note: { padding: 13, gap: 6, borderLeftWidth: 3, borderLeftColor: palette.mustard, backgroundColor: '#FFF3E0' },
  noteLabel: { color: palette.ink, fontSize: 12, fontWeight: '900' },
  copy: { color: palette.muted, lineHeight: 21 },
  totalRow: { minHeight: 58, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderTopWidth: 1, borderColor: palette.line },
  totalLabel: { color: palette.muted },
  total: { color: palette.ink, fontSize: 25, fontWeight: '900' },
  hint: { color: palette.muted, fontSize: 12, lineHeight: 18, textAlign: 'center' },
  empty: { minHeight: 180, alignItems: 'center', justifyContent: 'center', gap: 10 },
});