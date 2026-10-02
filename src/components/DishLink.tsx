import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text } from 'react-native';
import type { Plato } from '@/data/platos';
import { palette } from '@/components/ui';

export default function DishLink({ plato }: { plato: Plato }) {
  return (
    <Link href={{ pathname: '/menu/[id]', params: { id: String(plato.id) } }} asChild>
      <Pressable style={styles.row}>
        <Text style={styles.name}>{plato.nombre}</Text>
        <Text style={styles.price}>${plato.precio.toLocaleString('es-AR')}</Text>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  row: { minHeight: 48, paddingVertical: 12, borderBottomWidth: StyleSheet.hairlineWidth, borderColor: '#F0F0F0', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  name: { flex: 1, color: palette.ink, fontSize: 16 },
  price: { color: palette.leaf, fontSize: 16, fontWeight: '700' },
});