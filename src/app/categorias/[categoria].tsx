import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import DishLink from '@/components/DishLink';
import DondeEstoy from '@/components/DondeEstoy';
import { Kicker, Screen, palette } from '@/components/ui';
import { categorias, nombresCategoria, platos } from '@/data/platos';

export default function CategoriaScreen() {
  const { categoria } = useLocalSearchParams<{ categoria: string }>();
  const valida = categorias.includes(categoria as (typeof categorias)[number]);
  const resultados = valida ? platos.filter((plato) => plato.categoria === categoria) : [];

  return (
    <Screen>
      {!valida ? <View style={styles.empty}><Text style={styles.title}>Categoría inexistente</Text><Text style={styles.copy}>“{categoria}” no forma parte del menú.</Text></View> : (
        <>
          <Kicker>Explorá el menú</Kicker>
          <Text style={styles.title}>{nombresCategoria[categoria as (typeof categorias)[number]]}</Text>
          <Text style={styles.copy}>{resultados.length} propuestas preparadas para hoy.</Text>
          <View style={styles.list}>{resultados.map((plato) => <DishLink key={plato.id} plato={plato} />)}</View>
        </>
      )}
      <DondeEstoy />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: palette.ink, fontSize: 32, fontWeight: '900' },
  copy: { color: palette.muted, fontSize: 15, lineHeight: 22 },
  list: { backgroundColor: palette.paper, borderRadius: 8, paddingHorizontal: 15 },
  empty: { minHeight: 180, justifyContent: 'center', gap: 10 },
});