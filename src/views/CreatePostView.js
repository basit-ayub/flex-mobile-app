import { useState } from 'react';
import { View, Text, TextInput, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Screen from '../components/Screen';
import PrimaryButton from '../components/PrimaryButton';
import { colors, styles } from '../theme';

function validateDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return 'Use YYYY-MM-DD for the incident date.';
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  if (year < 1000 || date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) return 'Enter a real calendar date.';
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (date > today) return 'The incident date cannot be in the future.';
  return '';
}
export default function CreatePostView({ onBack, onSubmit }) {
  const [form, setForm] = useState({ type: 'found', title: '', description: '', location: '', incidentDate: '', priority: 'Normal', contact: '', imageUri: null });
  const [errors, setErrors] = useState({});
  const [photoMessage, setPhotoMessage] = useState('');
  const [picking, setPicking] = useState(false);
  function change(field, value) { setForm(previous => ({ ...previous, [field]: value })); setErrors(previous => ({ ...previous, [field]: '' })); }
  async function pickPicture() {
    setPicking(true); setPhotoMessage('');
    try {
      // The system image-only picker does not need broad photo-library permission.
      const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], allowsEditing: false, quality: 0.8 });
      if (!result.canceled && result.assets?.[0]?.uri) change('imageUri', result.assets[0].uri);
    } catch {
      setPhotoMessage('Photo access was unavailable or denied. You can allow access in device settings, try again, or post without a picture.');
    } finally { setPicking(false); }
  }
  function submit() {
    const nextErrors = {};
    ['title', 'description', 'location', 'incidentDate', 'contact'].forEach(field => { if (!form[field].trim()) nextErrors[field] = 'This field is required.'; });
    if (form.incidentDate.trim()) nextErrors.incidentDate = validateDate(form.incidentDate.trim());
    if (!['found', 'lost'].includes(form.type)) nextErrors.type = 'Choose Lost or Found.';
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;
    onSubmit({ ...form, title: form.title.trim(), description: form.description.trim(), location: form.location.trim(), incidentDate: form.incidentDate.trim(), contact: form.contact.trim() });
  }
  function field(key, label, options = {}) {
    return <View style={{ gap: 8 }}><Text style={styles.label}>{label}</Text><TextInput accessibilityLabel={label} style={[styles.input, options.multiline && { minHeight: 110, textAlignVertical: 'top' }]} placeholderTextColor={colors.muted} value={form[key]} onChangeText={value => change(key, value)} {...options} />{errors[key] ? <Text accessibilityRole="alert" style={{ color: colors.errorText }}>{errors[key]}</Text> : null}</View>;
  }
  return <Screen title="Help it find its way." subtitle="Share the details with your campus community." onBack={onBack} backLabel="Back to Listings">
    <View style={styles.card}><Text style={styles.label}>I want to report something…</Text><View style={styles.row}>{['found', 'lost'].map(type => <PrimaryButton key={type} title={type === 'found' ? 'Found' : 'Lost'} secondary selected={form.type === type} onPress={() => change('type', type)} />)}</View>
      {field('title', 'Title', { placeholder: 'e.g. Black wallet' })}
      {field('description', 'Description', { placeholder: 'Add details that will help identify the item', multiline: true })}
      {field('location', form.type === 'found' ? 'Found at' : 'Last seen at', { placeholder: 'Building, room, or nearby landmark' })}
      {field('incidentDate', form.type === 'found' ? 'Date found' : 'Date lost', { placeholder: 'YYYY-MM-DD', maxLength: 10, autoCorrect: false, autoCapitalize: 'none' })}
      <Text style={styles.label}>Priority</Text><View style={styles.row}>{['Low', 'Normal', 'High'].map(priority => <PrimaryButton key={priority} title={priority} secondary selected={form.priority === priority} onPress={() => change('priority', priority)} />)}</View>
      {field('contact', 'Contact', { placeholder: 'University email or other contact text', autoCapitalize: 'none' })}
      <Text style={styles.label}>Picture · optional</Text>
      {form.imageUri && <><Image source={{ uri: form.imageUri }} style={{ height: 190, width: '100%', borderRadius: 12 }} resizeMode="contain" accessibilityLabel="Selected picture preview" /><PrimaryButton title="Remove Picture" secondary onPress={() => change('imageUri', null)} /></>}
      <PrimaryButton title={picking ? 'Opening photo library…' : 'Choose Picture'} secondary disabled={picking} onPress={pickPicture} />
      {photoMessage ? <Text accessibilityRole="alert" style={styles.error}>{photoMessage}</Text> : null}
      <Text style={styles.muted}>All fields except picture are required. Contact details appear on the post.</Text>
      {Object.values(errors).some(Boolean) && <Text accessibilityRole="alert" style={styles.error}>Please check the highlighted fields above.</Text>}
      <PrimaryButton title="Publish Post" onPress={submit} disabled={picking} /><PrimaryButton title="Cancel" secondary onPress={onBack} />
    </View>
  </Screen>;
}
