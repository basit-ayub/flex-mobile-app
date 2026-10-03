import { useState } from 'react';
import { Image, Text, TextInput, View } from 'react-native';
import Screen from '../components/Screen';
import PrimaryButton from '../components/PrimaryButton';
import { colors, styles } from '../theme';
import { accounts } from '../data/demoData';
export default function LoginView({ onLogin }) {
  const [roll, setRoll] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  function changeRoll(value) { setRoll(value); setPassword(''); setError(''); }
  function login() {
    const normalized = roll.trim().toLowerCase();
    if (!password) return setError('Enter your password to continue.');
    if (!Object.hasOwn(accounts, normalized) || accounts[normalized].password !== password) return setError('Roll number or password is incorrect. Please try again.');
    onLogin({ roll: normalized, name: accounts[normalized].name, semester: accounts[normalized].semester });
  }
  return <Screen>
    <View style={{ paddingTop: 34, gap: 18 }}>
      <Image source={require('../../assets/portal.png')} accessibilityLabel="Flex Academic Portal" resizeMode="contain" style={{ width: '100%', maxWidth: 300, height: 130, alignSelf: 'center' }} />
      <Text style={[styles.eyebrow, { textAlign: 'center' }]}>FAST ACADEMIC PORTAL REIMAGINED.</Text><Text style={[styles.title, { fontSize: 40, textAlign: 'center' }]}>{'\n'}SIGN IN</Text>
      <Text style={[styles.muted, { textAlign: 'center' }]}>Welcome to Student Portal.</Text>
    </View>
    <View style={[styles.card, { marginTop: 14, gap: 16 }]}>
      <Text style={[styles.heading, { textAlign: 'center' }]}>Enter your Roll Number</Text>
      <Text style={styles.label}>Roll number</Text><TextInput accessibilityLabel="Roll number" style={styles.input} placeholder="e.g. i233018" placeholderTextColor={colors.muted} value={roll} onChangeText={changeRoll} autoCapitalize="none" autoCorrect={false} textContentType="username" />
      {roll.trim().length > 0 && <><Text style={styles.label}>Password</Text><TextInput accessibilityLabel="Password" style={styles.input} placeholder="Enter your password" placeholderTextColor={colors.muted} value={password} onChangeText={value => { setPassword(value); setError(''); }} secureTextEntry autoCapitalize="none" autoCorrect={false} textContentType="password" onSubmitEditing={login} returnKeyType="go" />{error ? <Text accessibilityRole="alert" style={styles.error}>{error}</Text> : null}<PrimaryButton title="Login" onPress={login} /></>}
    </View>
  </Screen>;
}
