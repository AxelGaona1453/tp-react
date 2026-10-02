import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import DondeEstoy from '@/components/DondeEstoy';
import { ActionButton, Kicker, kitchenPalette, Screen } from '@/components/ui';
import { useAppContext } from '@/context/AppContext';

export default function LoginScreen() {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');
  const { iniciarSesion } = useAppContext();

  function ingresar() {
    if (!iniciarSesion(usuario.trim().toLowerCase(), clave)) setError('Usuario o contraseña incorrectos.');
  }

  return (
    <Screen tone="kitchen">
      <View style={styles.emblem}><Ionicons name="restaurant" size={25} color={kitchenPalette.paper} /></View>
      <Kicker tone="kitchen">Personal autorizado</Kicker>
      <Text style={styles.title}>Ingreso a cocina</Text>
      <Text style={styles.copy}>Iniciá sesión para gestionar los pedidos del comedor.</Text>
      <TextInput value={usuario} onChangeText={(value) => { setUsuario(value); setError(''); }} autoCapitalize="none" autoCorrect={false} placeholder="Usuario" placeholderTextColor={kitchenPalette.muted} style={styles.input} returnKeyType="next" />
      <TextInput value={clave} onChangeText={(value) => { setClave(value); setError(''); }} secureTextEntry placeholder="Contraseña" placeholderTextColor={kitchenPalette.muted} style={styles.input} onSubmitEditing={ingresar} returnKeyType="done" />
      {error ? <Text accessibilityRole="alert" style={styles.error}>{error}</Text> : null}
      <ActionButton title="Iniciar sesión" onPress={ingresar} icon="arrow-forward" tone="kitchen" />
      <Text style={styles.hint}>Acceso de demostración: cocina / 1234</Text>
      <DondeEstoy />
    </Screen>
  );
}

const styles = StyleSheet.create({
  emblem: { width: 54, height: 54, alignItems: 'center', justifyContent: 'center', borderRadius: 27, backgroundColor: kitchenPalette.wood },
  title: { color: kitchenPalette.ink, fontSize: 30, fontWeight: '900' },
  copy: { color: kitchenPalette.muted, fontSize: 14, lineHeight: 21 },
  input: { minHeight: 50, paddingHorizontal: 14, borderRadius: 7, borderWidth: 1, borderColor: kitchenPalette.line, backgroundColor: kitchenPalette.paper, color: kitchenPalette.ink, fontSize: 15 },
  error: { color: '#B83E32', fontSize: 13, fontWeight: '700' },
  hint: { color: kitchenPalette.muted, fontSize: 12, textAlign: 'center' },
});