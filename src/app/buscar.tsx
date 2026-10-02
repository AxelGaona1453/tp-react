import * as Linking from 'expo-linking';
import * as Clipboard from 'expo-clipboard';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Platform, Pressable, Share, StyleSheet, Text, TextInput, View } from 'react-native';
import DishLink from '@/components/DishLink';
import DondeEstoy from '@/components/DondeEstoy';
import { ActionButton, Kicker, Pill, Screen, palette } from '@/components/ui';
import { categorias, nombresCategoria, platos } from '@/data/platos';

function normalizar(texto: string) {
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es-AR');
}

export default function BuscarScreen() {
  const { q = '', categoria = '' } = useLocalSearchParams<{ q?: string; categoria?: string }>();
  const [estadoCompartir, setEstadoCompartir] = useState('');
  const termino = Array.isArray(q) ? q[0] ?? '' : q;
  const filtro = Array.isArray(categoria) ? categoria[0] ?? '' : categoria;
  const resultados = platos.filter((plato) => {
    const texto = normalizar(`${plato.nombre} ${plato.descripcion}`);
    return (!termino || texto.includes(normalizar(termino))) && (!filtro || plato.categoria === filtro);
  });

  async function compartirBusqueda() {
    const url = Linking.createURL('/buscar', { queryParams: { q: termino, categoria: filtro } });
    if (Platform.OS === 'web') {
      const copiado = await Clipboard.setStringAsync(url);
      setEstadoCompartir(copiado ? 'Enlace copiado' : 'No se pudo copiar el enlace');
      return;
    }
    await Share.share({ message: `Mirá estos platos del Comedor IPF: ${url}` });
    setEstadoCompartir('Enlace listo para compartir');
  }

  return (
    <Screen>
      <Kicker>Encontrá algo rico</Kicker>
      <Text style={styles.title}>Buscar</Text>
      <TextInput accessibilityLabel="Buscar platos" placeholder="Probá con chipá o milanesa" placeholderTextColor={palette.muted} value={termino} onChangeText={(texto) => router.setParams({ q: texto })} style={styles.input} returnKeyType="search" />
      <View style={styles.filters}>
        <Pressable onPress={() => router.setParams({ categoria: '' })}><Pill active={!filtro}>Todos</Pill></Pressable>
        {categorias.map((item) => <Pressable key={item} onPress={() => router.setParams({ categoria: filtro === item ? '' : item })}><Pill active={filtro === item}>{nombresCategoria[item]}</Pill></Pressable>)}
      </View>
      <Text style={styles.count}>{resultados.length} {resultados.length === 1 ? 'resultado' : 'resultados'}</Text>
      <View style={styles.list}>{resultados.map((plato) => <DishLink key={plato.id} plato={plato} />)}</View>
      {resultados.length === 0 ? <Text style={styles.empty}>No encontramos platos con esos filtros.</Text> : null}
      <ActionButton title={estadoCompartir || 'Compartir búsqueda'} onPress={compartirBusqueda} icon="share-outline" variant="quiet" />
      <DondeEstoy />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: palette.ink, fontSize: 34, fontWeight: '900' },
  input: { minHeight: 52, paddingHorizontal: 15, borderWidth: 1, borderColor: palette.line, borderRadius: 7, backgroundColor: palette.paper, color: palette.ink, fontSize: 15 },
  filters: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  count: { color: palette.muted, fontSize: 13, fontWeight: '700' },
  list: { paddingHorizontal: 14, borderRadius: 8, backgroundColor: palette.paper },
  empty: { paddingVertical: 20, color: palette.muted, textAlign: 'center' },
});