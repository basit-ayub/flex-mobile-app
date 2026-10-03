import { useState } from 'react';
import { Text, View } from 'react-native';
import { styles } from '../theme';
export default function ChartCard({ title, subtitle, children }) {
  const [width, setWidth] = useState(0);
  return <View style={styles.card}>
    <Text accessibilityRole="header" style={styles.heading}>{title}</Text>
    <Text style={styles.muted}>{subtitle}</Text>
    {/* Measure the inner surface: card padding is already excluded. */}
    <View onLayout={event => setWidth(Math.floor(event.nativeEvent.layout.width))} style={{ width: '100%' }}>
      {width > 0 && children(width)}
    </View>
  </View>;
}
