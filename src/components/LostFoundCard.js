import { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { colors, styles } from '../theme';
export default function LostFoundCard({ post }) {
  const [imageFailed, setImageFailed] = useState(false);
  return <View style={styles.card}>
    {post.imageUri && !imageFailed ? <Image source={{ uri: post.imageUri }} accessibilityLabel={post.title} onError={() => setImageFailed(true)} resizeMode="contain" style={{ height: 180, width: '100%', borderRadius: 12, backgroundColor: colors.background }} /> : <View style={{ height: 90, borderRadius: 12, backgroundColor: colors.pale, alignItems: 'center', justifyContent: 'center', gap: 5 }}><Text style={{ fontSize: 28, color: colors.primary }}>◇</Text><Text style={styles.muted}>No photo attached</Text></View>}
    <View style={styles.row}><Text style={styles.badge}>{post.type === 'found' ? 'Found' : 'Lost'}</Text><Text style={[styles.badge, post.priority === 'High' && { backgroundColor: colors.warning, color: colors.warningText }]}>{post.priority} priority</Text></View>
    <Text style={styles.heading}>{post.title}</Text><Text style={styles.text}>{post.description}</Text>
    <Text style={styles.muted}>{post.type === 'found' ? 'Found at' : 'Last seen at'}: {post.location}</Text>
    <Text style={styles.muted}>Date {post.type === 'found' ? 'found' : 'lost'}: {post.incidentDate}</Text>
    <Text selectable style={styles.text}>Contact: {post.contact}</Text>
  </View>;
}
