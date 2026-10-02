import { StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, usePathname, useSegments } from 'expo-router';
import { palette } from '@/components/ui';

const DEBUG = false;

export default function DondeEstoy() {
  const pathname = usePathname();
  const segments = useSegments();
  const params = useLocalSearchParams();

  if (!DEBUG) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>NAVEGACIÓN</Text>
      <Text style={styles.value}>{pathname}</Text>
      <Text style={styles.value}>{segments.join(' / ')}</Text>
      <Text style={styles.value}>{JSON.stringify(params)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 18, padding: 12, gap: 4, borderWidth: 1, borderColor: palette.line, borderRadius: 6 },
  label: { color: palette.tomato, fontSize: 10, fontWeight: '800' },
  value: { color: palette.muted, fontSize: 11 },
});