import { Link, usePathname } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import DondeEstoy from '@/components/DondeEstoy';
import { Kicker, Screen, palette } from '@/components/ui';

export default function NotFoundScreen() {
  const pathname = usePathname();
  return (
    <Screen>
      <View style={styles.content}>
        <Ionicons name="compass-outline" size={45} color={palette.tomato} />
        <Kicker>ERROR 404</Kicker>
        <Text style={styles.title}>Acá no hay nada.</Text>
        <Text style={styles.copy}>No encontramos la dirección {pathname}.</Text>
        <Link href="/" asChild><Pressable style={styles.link}><Text style={styles.linkText}>Volver al inicio</Text><Ionicons name="arrow-forward" size={17} color={palette.paper} /></Pressable></Link>
      </View>
      <DondeEstoy />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { minHeight: 420, alignItems: 'center', justifyContent: 'center', gap: 13 },
  title: { color: palette.ink, fontSize: 32, fontWeight: '900', textAlign: 'center' },
  copy: { color: palette.muted, fontSize: 15, textAlign: 'center' },
  link: { minHeight: 48, marginTop: 10, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', gap: 10, borderRadius: 7, backgroundColor: palette.pine },
  linkText: { color: palette.paper, fontWeight: '800' },
});