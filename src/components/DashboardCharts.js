import { ScrollView, Text, View } from 'react-native';
import { BarChart, PieChart } from 'react-native-chart-kit';
import ChartCard from './ChartCard';
import { colors, styles } from '../theme';

const chartConfig = {
  backgroundGradientFrom: colors.white,
  backgroundGradientTo: colors.white,
  color: (opacity = 1) => `rgba(67, 142, 93, ${opacity})`,
  labelColor: () => colors.muted,
  decimalPlaces: 0,
  fillShadowGradientFrom: '#438E5D',
  fillShadowGradientTo: '#438E5D',
  fillShadowGradientFromOpacity: 1,
  fillShadowGradientToOpacity: 1,
  propsForBackgroundLines: { stroke: colors.border, strokeDasharray: '4 4' },
  barPercentage: 0.65,
};
export default function DashboardCharts({ summary }) {
  const { measured, unmeasured, attendedTotal, missedTotal, overall } = summary;
  const barData = { labels: measured.map(course => course.code), datasets: [{ data: measured.map(course => course.percentage) }] };
  const pieData = [
    { name: 'Attended', sessions: attendedTotal, color: '#438E5D', legendFontColor: colors.text, legendFontSize: 13 },
    { name: 'Missed', sessions: missedTotal, color: '#F0BF99', legendFontColor: colors.text, legendFontSize: 13 },
  ];
  return <>
    <ChartCard title="Attendance by Course" subtitle="Percentage of sessions attended in each registered course">
      {width => <View style={{ gap: 12 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator accessibilityLabel="Course attendance chart; scroll horizontally for more courses">
          <BarChart data={barData} width={Math.max(width, measured.length * 72 + 64)} height={240} chartConfig={chartConfig} fromZero yAxisLabel="" yAxisSuffix="%" showValuesOnTopOfBars showBarTops={false} />
        </ScrollView>
        <Text style={styles.muted}>{measured.map(course => `${course.code}: ${course.percentage}%`).join(' · ')}</Text>
        {unmeasured.length > 0 && <Text style={styles.muted}>No sessions yet: {unmeasured.join(', ')}</Text>}
      </View>}
    </ChartCard>
    <ChartCard title="Attended vs Missed Sessions" subtitle="Across all currently registered courses">
      {width => <View style={{ gap: 12 }}>
        <PieChart data={pieData.filter(slice => slice.sessions > 0)} width={width} height={Math.min(230, width)} chartConfig={chartConfig} accessor="sessions" backgroundColor="transparent" paddingLeft="0" center={[width / 4, 0]} hasLegend={false} absolute />
        <View style={styles.row}>{pieData.map(slice => <View key={slice.name} style={styles.row}><View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: slice.color }} /><Text style={styles.text}>{slice.name}: {slice.sessions}</Text></View>)}</View>
        <Text style={styles.label}>Overall attendance: {overall}%</Text>
      </View>}
    </ChartCard>
  </>;
}
