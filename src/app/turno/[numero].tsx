import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import DondeEstoy from '@/components/DondeEstoy';
import { Kicker, Screen, palette } from '@/components/ui';
import { useAppContext } from '@/context/AppContext';

export default function TurnoScreen() {
  const { numero } = useLocalSearchParams<{ numero: string }>();
  const { pedidosPendientes } = useAppContext();
  const pedidoNumero = Number(numero);
  const posicion = pedidosPendientes.findIndex((pedido) => pedido.numero === pedidoNumero);
  const valido = Number.isInteger(pedidoNumero) && pedidoNumero > 0;
  const espera = posicion < 0 ? 0 : posicion * 3;

  return (
    <Screen>
      <View style={styles.hero}>
        <Ionicons name={valido ? 'ticket-outline' : 'alert-circle-outline'} size={34} color={palette.mustard} />
        <Kicker>Tu pedido está en cocina</Kicker>
        <Text style={styles.label}>TURNO</Text>
        <Text style={styles.number}>{valido ? `#${String(pedidoNumero).padStart(3, '0')}` : '—'}</Text>
        <Text style={styles.copy}>{valido ? 'Guardá este número y acercate cuando te llamemos.' : `El turno “${numero}” no es válido.`}</Text>
      </View>
      {valido ? <View style={styles.wait}><Text style={styles.waitValue}>{posicion < 0 ? 'En preparación' : `~${espera} min`}</Text><Text style={styles.waitLabel}>{posicion < 0 ? 'Tu pedido ya fue retirado o no está en cola' : `${posicion} ${posicion === 1 ? 'pedido' : 'pedidos'} antes que el tuyo`}</Text></View> : null}
      <DondeEstoy />
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { minHeight: 330, padding: 25, alignItems: 'center', justifyContent: 'center', gap: 12, borderRadius: 8, backgroundColor: palette.pine },
  label: { color: '#DDE6D5', fontSize: 11, fontWeight: '800', letterSpacing: 2 },
  number: { color: palette.paper, fontSize: 66, lineHeight: 72, fontWeight: '900' },
  copy: { maxWidth: 270, color: '#E0E8DC', fontSize: 14, lineHeight: 21, textAlign: 'center' },
  wait: { alignItems: 'center', gap: 5, padding: 17, borderRadius: 8, backgroundColor: palette.paper },
  waitValue: { color: palette.tomato, fontSize: 22, fontWeight: '900' },
  waitLabel: { color: palette.muted, fontSize: 13, textAlign: 'center' },
});