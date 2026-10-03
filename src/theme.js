import { StyleSheet } from 'react-native';
export const colors = { background: '#F5FAF6', white: '#FFFFFF', pale: '#E2F3E6', selected: '#C4E6CE', primary: '#2E7047', text: '#20352A', muted: '#5C7063', border: '#DCE8DF', warning: '#FFF3DC', warningText: '#795217', error: '#FCE8E8', errorText: '#A32B2B' };
export const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, gap: 18, width: '100%', maxWidth: 680, alignSelf: 'center', paddingBottom: 36 },
  card: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border, borderRadius: 18, padding: 18, gap: 12 },
  row: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 8 },
  between: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 12 },
  title: { fontSize: 30, fontWeight: '700', color: colors.text, letterSpacing: -0.7 },
  heading: { fontSize: 20, fontWeight: '700', color: colors.text },
  text: { fontSize: 15, lineHeight: 23, color: colors.text },
  muted: { fontSize: 14, lineHeight: 21, color: colors.muted },
  eyebrow: { fontSize: 12, fontWeight: '700', letterSpacing: 2, color: colors.primary },
  label: { fontSize: 14, fontWeight: '600', color: colors.text },
  input: { borderWidth: 1, borderColor: colors.border, borderRadius: 12, padding: 14, minHeight: 50, backgroundColor: colors.white, color: colors.text, fontSize: 16 },
  badge: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8, overflow: 'hidden', backgroundColor: colors.pale, color: colors.primary, fontSize: 12, fontWeight: '600' },
  feedback: { backgroundColor: colors.pale, borderRadius: 12, padding: 14, color: colors.primary, lineHeight: 21 },
  error: { backgroundColor: colors.error, borderRadius: 12, padding: 14, color: colors.errorText, lineHeight: 21 },
});
