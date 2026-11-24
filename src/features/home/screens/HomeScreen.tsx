import React, { useState } from 'react'
import { Pressable, Text, useWindowDimensions, View } from 'react-native'
import { CirclePlus, X } from 'lucide-react-native'
import { BottomNavigation, Card, Notice, Page, Sky, ui } from '../../../shared/components/AppUI'
import { weekdays, type Plan, type Tab } from '../../../shared/models/app'
import type { AppTheme } from '../../../shared/theme/appTheme'

export function HomeScreen({ theme, plans, onNewPlan, onRemovePlan, onTab, message }: { theme: AppTheme; plans: Plan[]; onNewPlan: () => void; onRemovePlan: (id: string) => void; onTab: (tab: Tab) => void; message?: string }) {
  const { height } = useWindowDimensions()
  const [showNotice, setShowNotice] = useState(true)
  return <Page theme={theme} header={<View style={{ height: Math.max(220, Math.min(height * 0.53, 466)) }}><Sky theme={theme} curves/></View>} bottom={<BottomNavigation theme={theme} selected="home" onSelect={onTab}/>} contentStyle={{ marginTop: -14 }}>
    <Card theme={theme} style={{ minHeight: 224, paddingTop: 4, paddingBottom: 18 }}>
      <View style={ui.spread}><Text accessibilityRole="header" style={[ui.heading, { color: theme.ink, flex: 1 }]}>Mijn plannen</Text><Pressable accessibilityRole="button" accessibilityLabel="Nieuw plan toevoegen" onPress={onNewPlan} style={{ minWidth: 44, minHeight: 44, justifyContent: 'center', alignItems: 'center' }}><CirclePlus size={22} color={theme.ink} strokeWidth={1.8}/></Pressable></View>
      {!plans.length && <Text style={[ui.body, { color: theme.muted, fontSize: 14, marginTop: 16 }]}>Nog geen plannen. Voeg iets toe voor jezelf.</Text>}
      {plans.map(plan => <View key={plan.id} style={{ paddingVertical: 12, borderBottomWidth: 1, borderColor: theme.divider, flexDirection: 'row', gap: 8, alignItems: 'center' }}><View style={{ flex: 1 }}><Text style={{ color: theme.ink, fontSize: 16, fontWeight: '700' }}>{plan.name}</Text><Text style={{ color: theme.muted, fontSize: 13, lineHeight: 20, marginTop: 4 }}>{plan.start} – {plan.end} · {[1, 2, 3, 4, 5, 6, 0].filter(day => plan.days.includes(day)).map(day => weekdays[day]).join(', ')}</Text></View><Pressable accessibilityRole="button" accessibilityLabel={`Verwijder plan ${plan.name}`} onPress={() => onRemovePlan(plan.id)} style={{ width: 44, minHeight: 44, alignItems: 'center', justifyContent: 'center' }}><X size={22} color={theme.ink}/></Pressable></View>)}
    </Card>
    {message && <Notice theme={theme}>{message}</Notice>}
    {showNotice && <View style={{ minHeight: 58, marginTop: 14, backgroundColor: theme.soft, borderRadius: 24, paddingLeft: 18, paddingRight: 4, flexDirection: 'row', alignItems: 'center' }}><Text style={{ flex: 1, color: theme.ink, fontSize: 14, lineHeight: 20, fontWeight: '700' }}>Neem vandaag een moment voor jezelf.</Text><Pressable accessibilityRole="button" accessibilityLabel="Melding sluiten" onPress={() => setShowNotice(false)} style={{ width: 44, minHeight: 44, alignItems: 'center', justifyContent: 'center' }}><X size={22} color={theme.ink}/></Pressable></View>}
  </Page>
}
