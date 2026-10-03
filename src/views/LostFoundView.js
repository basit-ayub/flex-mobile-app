import { Text, TextInput, View } from 'react-native';
import Screen from '../components/Screen';
import PrimaryButton from '../components/PrimaryButton';
import LostFoundCard from '../components/LostFoundCard';
import EmptyState from '../components/EmptyState';
import { colors, styles } from '../theme';
export default function LostFoundView({ posts, filter, onFilter, search, onSearch, sort, onSort, feedback, onCreate, onBack }) {
  const query = search.trim().toLowerCase();
  const visible = posts.filter(post => (filter === 'all' || post.type === filter) && [post.title, post.description, post.location].some(value => value.toLowerCase().includes(query)))
    .slice().sort((a, b) => (sort === 'newest' ? b.incidentDate.localeCompare(a.incidentDate) : a.incidentDate.localeCompare(b.incidentDate)) || a.id.localeCompare(b.id));
  function clear() { onSearch(''); onFilter('all'); onSort('newest'); }
  return <Screen title="Lost & Found" subtitle="Small acts of kindness. Things reunited." onBack={onBack}>
    <PrimaryButton title="+  Create Post" onPress={onCreate} />
    {feedback ? <Text accessibilityLiveRegion="polite" style={styles.feedback}>{feedback}</Text> : null}
    <View style={styles.card}><Text style={styles.label}>Show items</Text><View style={styles.row}>{['found', 'lost', 'all'].map(value => <PrimaryButton key={value} title={value[0].toUpperCase() + value.slice(1)} secondary selected={filter === value} onPress={() => onFilter(value)} />)}</View>
      <TextInput accessibilityLabel="Search items" style={styles.input} placeholder="Search items or locations" placeholderTextColor={colors.muted} value={search} onChangeText={onSearch} />
      <View style={styles.row}><PrimaryButton title="Newest First" secondary selected={sort === 'newest'} onPress={() => onSort('newest')} /><PrimaryButton title="Oldest First" secondary selected={sort === 'oldest'} onPress={() => onSort('oldest')} /></View>
    </View>
    <Text style={styles.muted}>{visible.length} {visible.length === 1 ? 'item' : 'items'} · Sorted by incident date</Text>
    {!posts.length ? <EmptyState title="No posts yet" message="Be the first to help an item find its owner." action="Create Post" onAction={onCreate} /> : !visible.length ? <EmptyState title="No matching items" message="Try another word or browse all lost and found items." action="Clear Search/Filters" onAction={clear} /> : visible.map(post => <LostFoundCard key={post.id} post={post} />)}
  </Screen>;
}
