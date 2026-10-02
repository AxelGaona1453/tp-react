import { Stack, router } from 'expo-router';
import { StyleSheet, Text, TextInput } from 'react-native';
import DondeEstoy from '@/components/DondeEstoy';
import { ActionButton, Kicker, Screen, palette } from '@/components/ui';
import { useAppContext } from '@/context/AppContext';

export default function NotaCarritoScreen() {
  const { nota, setNota } = useAppContext();
  return (
    <Screen>
      <Stack.Screen options={{ title: 'Nota para cocina' }} />
      <Kicker>Un detalle importante</Kicker>
      <Text style={styles.heading}>¿Alguna aclaración?</Text>
      <Text style={styles.copy}>La cocina verá este mensaje junto con tu pedido.</Text>
      <TextInput value={nota} onChangeText={setNota} placeholder="Ej.: sin sal, aderezo aparte…" placeholderTextColor={palette.muted} multiline maxLength={180} style={styles.input} />
      <Text style={styles.counter}>{nota.length}/180</Text>
      <ActionButton title="Guardar nota" onPress={() => router.back()} icon="checkmark-outline" />
      <DondeEstoy />
    </Screen>
  );
}

const styles = StyleSheet.create({
  heading: { color: palette.ink, fontSize: 28, fontWeight: '900' },
  copy: { color: palette.muted, fontSize: 14, lineHeight: 21 },
  input: { minHeight: 120, padding: 14, borderRadius: 7, borderWidth: 1, borderColor: palette.line, backgroundColor: palette.paper, color: palette.ink, fontSize: 15, textAlignVertical: 'top' },
  counter: { alignSelf: 'flex-end', marginTop: -10, color: palette.muted, fontSize: 12 },
});