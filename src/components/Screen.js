import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { styles } from '../theme';
import PrimaryButton from './PrimaryButton';
export default function Screen({ children, title, subtitle, onBack, backLabel = 'Back to Dashboard' }) {
  return <KeyboardAvoidingView style={styles.screen} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
    <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" keyboardDismissMode="on-drag" automaticallyAdjustKeyboardInsets>
      {onBack && <View style={{ alignSelf: 'flex-start' }}><PrimaryButton title={`←  ${backLabel}`} onPress={onBack} secondary /></View>}
      {title && <View style={{ gap: 6 }}><Text style={styles.eyebrow}>STUDENT PORTAL</Text><Text accessibilityRole="header" style={styles.title}>{title}</Text>{subtitle && <Text style={styles.muted}>{subtitle}</Text>}</View>}
      {children}
    </ScrollView>
  </KeyboardAvoidingView>;
}
