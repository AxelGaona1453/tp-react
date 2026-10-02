import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import DishLink from '@/components/DishLink';
import DondeEstoy from '@/components/DondeEstoy';
import { Screen, palette } from '@/components/ui';
import { categorias, nombresCategoria, platos } from '@/data/platos';

export default function MenuScreen() {
  return (
    <Screen>
      {categorias.map((categoria) => {
        const destacados = platos.filter((plato) => plato.categoria === categoria);
        return (
          <View key={categoria} style={styles.category}>
            <Link href={{ pathname: '/categorias/[categoria]', params: { categoria } }} asChild>
              <Pressable>
                <Text style={styles.categoryTitle}>{nombresCategoria[categoria]} →</Text>
              </Pressable>
            </Link>
            {destacados.map((plato) => <DishLink key={plato.id} plato={plato} />)}
          </View>
        );
      })}
      <DondeEstoy />
    </Screen>
  );
}

const styles = StyleSheet.create({
  category: { marginBottom: 10, paddingHorizontal: 15 },
  categoryTitle: { paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: palette.line, color: palette.pine, fontSize: 20, fontWeight: '700' },
});