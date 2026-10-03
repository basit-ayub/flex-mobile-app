import { Pressable, Text, StyleSheet } from 'react-native';
import { colors } from '../theme';
export default function PrimaryButton({ title, onPress, secondary = false, selected = false, disabled = false }) {
  return <Pressable accessibilityRole="button" accessibilityState={{ disabled, selected }} onPress={onPress} disabled={disabled} style={({ pressed }) => [s.button, secondary && s.secondary, selected && s.selected, (pressed || disabled) && { opacity: 0.65 }]}>
    <Text style={[s.text, secondary && { color: colors.primary }]}>{title}</Text>
  </Pressable>;
}
const s = StyleSheet.create({ button: { minHeight: 46, paddingVertical: 12, paddingHorizontal: 16, borderRadius: 12, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center' }, secondary: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border }, selected: { backgroundColor: colors.selected, borderColor: colors.primary }, text: { color: 'white', fontSize: 14, fontWeight: '600', textAlign: 'center' } });
