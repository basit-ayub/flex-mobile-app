import { Text, View } from 'react-native';
import { styles } from '../theme';
import PrimaryButton from './PrimaryButton';
export default function EmptyState({ title, message, action, onAction }) {
  return <View style={styles.card}><Text style={styles.heading}>{title}</Text><Text style={styles.muted}>{message}</Text>{action && <PrimaryButton title={action} onPress={onAction} />}</View>;
}
