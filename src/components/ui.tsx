import type { ComponentProps, ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export const palette = {
  canvas: '#FFF8ED',
  paper: '#FFFEFA',
  surface: '#FFF0D5',
  ink: '#3A2921',
  pine: '#C45A3C',
  leaf: '#D87535',
  tomato: '#D84335',
  mustard: '#E5B445',
  danger: '#A9362D',
  muted: '#796458',
  line: '#EADCCB',
};

export const kitchenPalette = {
  canvas: '#F5F0E8',
  paper: '#FFFFFF',
  surface: '#EFE3D3',
  ink: '#403126',
  wood: '#956A45',
  woodDark: '#704A31',
  muted: '#786755',
  line: '#E1D4C3',
};

type IconName = ComponentProps<typeof Ionicons>['name'];
type Tone = 'food' | 'kitchen';

export function Screen({ children, tone = 'food' }: { children: ReactNode; tone?: Tone }) {
  return (
    <ScrollView
      style={[styles.screen, { backgroundColor: tone === 'kitchen' ? kitchenPalette.canvas : palette.canvas }]}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled">
      {children}
    </ScrollView>
  );
}

export function Kicker({ children, tone = 'food' }: { children: ReactNode; tone?: Tone }) {
  return <Text style={[styles.kicker, { color: tone === 'kitchen' ? kitchenPalette.wood : palette.tomato }]}>{children}</Text>;
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return <Text style={styles.sectionTitle}>{children}</Text>;
}

export function ActionButton({
  title,
  onPress,
  icon,
  disabled = false,
  variant = 'primary',
  tone = 'food',
}: {
  title: string;
  onPress: () => void;
  icon?: IconName;
  disabled?: boolean;
  variant?: 'primary' | 'dark' | 'quiet' | 'danger';
  tone?: Tone;
}) {
  const foreground = tone === 'kitchen' ? kitchenPalette.woodDark : palette.pine;
  const surface = tone === 'kitchen' ? kitchenPalette.surface : palette.surface;
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        variant === 'primary' && styles.buttonPrimary,
        variant === 'dark' && styles.buttonDark,
        variant === 'quiet' && styles.buttonQuiet,
        variant === 'danger' && styles.buttonDanger,
        variant === 'primary' && { backgroundColor: tone === 'kitchen' ? kitchenPalette.wood : palette.tomato },
        variant === 'dark' && { backgroundColor: tone === 'kitchen' ? kitchenPalette.woodDark : palette.pine },
        variant === 'quiet' && { backgroundColor: surface },
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
      ]}>
      {icon ? <Ionicons name={icon} size={18} color={variant === 'quiet' ? foreground : palette.paper} /> : null}
      <Text style={[styles.buttonText, variant === 'quiet' && styles.buttonQuietText, variant === 'quiet' && { color: foreground }]}>{title}</Text>
    </Pressable>
  );
}

export function Pill({ children, active = false }: { children: ReactNode; active?: boolean }) {
  return (
    <View style={[styles.pill, active && styles.pillActive]}>
      <Text style={[styles.pillText, active && styles.pillTextActive]}>{children}</Text>
    </View>
  );
}

export function Hairline() {
  return <View style={styles.hairline} />;
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: palette.canvas },
  content: { width: '100%', maxWidth: 720, alignSelf: 'center', padding: 20, gap: 16, paddingBottom: 32 },
  kicker: { color: palette.tomato, fontSize: 11, fontWeight: '800', letterSpacing: 1.4, textTransform: 'uppercase' },
  sectionTitle: { color: palette.ink, fontSize: 19, fontWeight: '800' },
  button: { minHeight: 48, borderRadius: 9, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 9 },
  buttonPrimary: { backgroundColor: palette.tomato },
  buttonDark: { backgroundColor: palette.pine },
  buttonQuiet: { backgroundColor: '#FFF3E0' },
  buttonDanger: { backgroundColor: palette.danger },
  buttonText: { color: palette.paper, fontSize: 15, fontWeight: '800' },
  buttonQuietText: { color: palette.pine },
  disabled: { opacity: 0.42 },
  pressed: { opacity: 0.82 },
  pill: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20, backgroundColor: '#F8E7C8' },
  pillActive: { backgroundColor: palette.pine },
  pillText: { color: palette.pine, fontSize: 12, fontWeight: '700', textTransform: 'capitalize' },
  pillTextActive: { color: palette.paper },
  hairline: { height: StyleSheet.hairlineWidth, backgroundColor: palette.line },
});