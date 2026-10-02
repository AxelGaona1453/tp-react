import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import DondeEstoy from '@/components/DondeEstoy';
import { ActionButton, Screen, palette } from '@/components/ui';
import { useAppContext } from '@/context/AppContext';
import { nombresCategoria, platos } from '@/data/platos';

export default function DetallePlatoScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { agregarAlCarrito } = useAppContext();
  const [agregado, setAgregado] = useState(false);
  const plato = platos.find((item) => item.id === Number(id));

  return (
    <Screen>
      {!plato ? <View style={styles.empty}><Ionicons name="alert-circle-outline" size={30} color={palette.tomato} /><Text style={styles.emptyText}>No encontramos un plato con el código “{id}”.</Text></View> : (
        <>
          <Text style={styles.name}>{plato.nombre}</Text>
          <Text style={styles.category}>{nombresCategoria[plato.categoria].toUpperCase()}</Text>
          <Text style={styles.description}>{plato.descripcion}</Text>
          <View style={styles.priceRow}><Text style={styles.priceLabel}>Precio</Text><Text style={styles.price}>${plato.precio.toLocaleString('es-AR')}</Text></View>
          <ActionButton title={agregado ? 'Sumar otro al carrito' : 'Agregar al carrito'} icon="bag-add-outline" onPress={() => { agregarAlCarrito(plato); setAgregado(true); }} />
          {agregado ? <Text style={styles.feedback}>Listo, ya está en tu carrito.</Text> : null}
        </>
      )}
      <DondeEstoy />
    </Screen>
  );
}

const styles = StyleSheet.create({
  name: { color: palette.ink, fontSize: 24, fontWeight: '800', marginBottom: 5 },
  category: { color: palette.pine, fontSize: 14, marginBottom: 15 },
  description: { color: palette.muted, fontSize: 16, marginBottom: 20 },
  priceRow: { minHeight: 62, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderTopWidth: StyleSheet.hairlineWidth, borderBottomWidth: StyleSheet.hairlineWidth, borderColor: palette.line },
  priceLabel: { color: palette.muted, fontSize: 14 },
  price: { color: palette.leaf, fontSize: 28, fontWeight: '800' },
  feedback: { textAlign: 'center', color: palette.leaf, fontWeight: '700' },
  empty: { minHeight: 180, alignItems: 'center', justifyContent: 'center', gap: 12 },
  emptyText: { color: palette.ink, fontSize: 17, textAlign: 'center' },
});