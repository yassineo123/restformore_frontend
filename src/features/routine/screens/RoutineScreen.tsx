import React, { useState } from 'react'
import { Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import { CalendarDays } from 'lucide-react-native'
import { BottomNavigation, Button, Card, Header, Page, ui } from '../../../shared/components/AppUI'
import { plansForDate, routineDate, type Plan, type Tab } from '../../../shared/models/app'
import type { AppTheme } from '../../../shared/theme/appTheme'

export function RoutineScreen({ theme, plans, startedAt, onTab, onNewPlan }: { theme: AppTheme; plans: Plan[]; startedAt: number; onTab: (tab: Tab) => void; onNewPlan: () => void }) {
  const [day, setDay] = useState(1)
  const { fontScale } = useWindowDimensions()
  const date = routineDate(startedAt, day)
  const today = new Date()
  const isToday = date.toDateString() === today.toDateString()
  const matching = plansForDate(plans, date)
  return <Page theme={theme} header={<Header theme={theme} particles title="Jouw Routine" eyebrow="Routine" curves>
    <View style={[styles.badge, { backgroundColor: theme.active }]}><Text style={{ color: theme.ink, fontSize: 13, fontWeight: '700' }}>Jouw 14-daagse overzicht</Text></View>
    <View style={styles.calendar}>{Array.from({ length: 14 }, (_, i) => i + 1).map(value => <View key={value} style={[styles.dayCell, { minWidth: 44 * fontScale }]}><Pressable accessibilityRole="button" accessibilityLabel={`Dag ${value}`} accessibilityState={{ selected: day === value }} onPress={() => setDay(value)} style={({ pressed }) => [styles.day, { minWidth: 44 * fontScale, minHeight: 44 * fontScale, backgroundColor: day === value ? theme.accent : theme.active, opacity: pressed ? 0.7 : 1 }]}><Text style={{ color: day === value ? theme.accentText : theme.ink, fontSize: 15, fontWeight: '700' }}>{value}</Text></Pressable></View>)}</View>
  </Header>} bottom={<BottomNavigation theme={theme} selected="routine" onSelect={onTab}/>}>
    <Card theme={theme} style={{ minHeight: 224, paddingVertical: 20 }}><Text style={[ui.label, { color: theme.muted }]}>{isToday ? 'VANDAAG' : date.toLocaleDateString('nl-NL', { weekday: 'short', day: 'numeric', month: 'short' }).toUpperCase()} · DAG {day}</Text>
      {matching.map(plan => <View key={plan.id} style={[styles.plan, { borderColor: theme.divider }]}><CalendarDays color={theme.ink} size={23}/><View style={{ flex: 1 }}><Text style={{ color: theme.ink, fontWeight: '700', fontSize: 16 }}>{plan.name}</Text><Text style={{ color: theme.muted, fontSize: 14, marginTop: 4 }}>{plan.start} – {plan.end}</Text></View></View>)}
      {!matching.length && <Text style={[ui.body, { color: theme.muted, marginTop: 14 }]}>Geen plannen voor deze dag.</Text>}
    </Card>
    <View style={{ marginTop: 20 }}><Button theme={theme} secondary title="Nieuw plan" onPress={onNewPlan}/></View>
  </Page>
}
const styles = StyleSheet.create({ badge: { alignSelf: 'flex-start', borderRadius: 20, paddingHorizontal: 18, paddingVertical: 9, marginTop: 42 }, calendar: { flexDirection: 'row', flexWrap: 'wrap', rowGap: 6, marginTop: 22 }, dayCell: { width: `${100 / 7}%`, minWidth: 44, alignItems: 'center' }, day: { minWidth: 44, minHeight: 44, borderRadius: 24, alignItems: 'center', justifyContent: 'center', padding: 8 }, plan: { minHeight: 76, flexDirection: 'row', alignItems: 'center', gap: 12, borderBottomWidth: 1, paddingVertical: 14 } })
