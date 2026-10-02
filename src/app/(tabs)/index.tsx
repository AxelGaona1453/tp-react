import { Link } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import DondeEstoy from '@/components/DondeEstoy';
import { Screen, palette } from '@/components/ui';
import { useAppContext } from '@/context/AppContext';

const accesos = [
  { href: '/menu' as const, title: 'Menú', icon: 'restaurant' as const, color: palette.pine },
  { href: '/buscar' as const, title: 'Buscar', icon: 'search' as const, color: palette.leaf },
  { href: '/ayuda' as const, title: 'Ayuda', icon: 'help-circle' as const, color: palette.mustard },
];

export default function InicioScreen() {
  const { usuario } = useAppContext();

  return (
    <Screen>
      <View style={styles.intro}>
        <Text style={styles.title}>🍽️ Comedor IPF</Text>
        <Text style={styles.subtitle}>¡Bienvenido! Pedí tu comida desde el celular</Text>
      </View>

      <View style={styles.tiles}>
        {accesos.map((acceso) => (
          <View key={acceso.href} style={styles.tileWrap}>
            <Link href={acceso.href} asChild>
              <Pressable style={styles.tile}>
                <Ionicons name={acceso.icon} size={32} color={acceso.color} />
                <Text style={styles.tileText}>{acceso.title}</Text>
              </Pressable>
            </Link>
          </View>
        ))}
        <View style={styles.tileWrap}>
          <Link href={usuario ? '/cocina' : '/login'} asChild>
            <Pressable style={styles.tile}>
              <Ionicons name={usuario ? 'restaurant' : 'lock-closed'} size={32} color={palette.danger} />
              <Text style={styles.tileText}>Cocina</Text>
            </Pressable>
          </Link>
        </View>
      </View>
      <DondeEstoy />
    </Screen>
  );
}

const styles = StyleSheet.create({
  intro: { alignItems: 'center', paddingTop: 4, paddingBottom: 18, gap: 8 },
  title: { color: palette.ink, fontSize: 28, fontWeight: '800', textAlign: 'center' },
  subtitle: { color: palette.muted, fontSize: 16, textAlign: 'center' },
  tiles: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 15 },
  tileWrap: { width: '47%' },
  tile: { width: '100%', minHeight: 112, backgroundColor: palette.surface, borderRadius: 12, padding: 18, alignItems: 'center', justifyContent: 'center', gap: 8 },
  tileText: { color: palette.ink, fontSize: 16, fontWeight: '600' },
});