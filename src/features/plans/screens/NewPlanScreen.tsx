import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Chip, Field, Header, Notice, Page, Toggle, ui } from '../../../shared/components/AppUI'
import { appChoices, validatePlan, type PlanDraft } from '../../../shared/models/app'
import type { AppTheme } from '../../../shared/theme/appTheme'

export function NewPlanScreen({ theme, onBack, onSave, initialApps }: { theme: AppTheme; onBack: () => void; onSave: (plan: PlanDraft) => void; initialApps: string[] }) {
  const [name, setName] = useState('')
  const [days, setDays] = useState([1, 2, 3, 4, 5])
  const [start, setStart] = useState('22:00')
  const [end, setEnd] = useState('06:00')
  const [apps, setApps] = useState(initialApps)
  const [more, setMore] = useState(false)
  const [reminder, setReminder] = useState(true)
  const [error, setError] = useState('')
  const save = () => {
    const draft = { name: name.trim(), days, start: start.trim(), end: end.trim(), apps, reminder }
    const problem = validatePlan(draft)
    if (problem) { setError(problem); return }
    onSave(draft)
  }
  return <Page theme={theme} header={<Header theme={theme} particles title="Nieuw plan" onBack={onBack}/> }>
    <Field theme={theme} label="Naam van je plan" placeholder="Bijvoorbeeld Avondrust" value={name} onChangeText={setName} maxLength={80}/>
    <View style={ui.section}><Text style={[ui.label, { color: theme.ink }]}>Dagen</Text><View style={styles.days}>{[{ day: 1, label: 'ma' }, { day: 2, label: 'di' }, { day: 3, label: 'wo' }, { day: 4, label: 'do' }, { day: 5, label: 'vr' }, { day: 6, label: 'za' }, { day: 0, label: 'zo' }].map(item => <Chip key={item.day} theme={theme} label={item.label} compact selected={days.includes(item.day)} onPress={() => setDays(current => current.includes(item.day) ? current.filter(day => day !== item.day) : [...current, item.day])}/>)}</View></View>
    <View style={ui.section}><Text style={[ui.label, { color: theme.ink }]}>Tijd</Text><View style={styles.times}><View style={styles.time}><Field theme={theme} label="Van" inlineLabel value={start} onChangeText={setStart} placeholder="22:00" keyboardType="numbers-and-punctuation" maxLength={5}/></View><View style={styles.time}><Field theme={theme} label="Tot" inlineLabel value={end} onChangeText={setEnd} placeholder="06:00" keyboardType="numbers-and-punctuation" maxLength={5}/></View></View></View>
    <View style={ui.section}><Text style={[ui.label, { color: theme.ink }]}>Apps blokkeren</Text><View style={styles.chips}>{appChoices.slice(0, more ? undefined : 4).map(app => <Chip key={app} theme={theme} label={app} selected={apps.includes(app)} onPress={() => setApps(current => current.includes(app) ? current.filter(value => value !== app) : [...current, app])}/>)}<Chip theme={theme} label={more ? '− Minder' : '+ Meer'} selected={false} onPress={() => setMore(!more)}/></View><Text style={[styles.hint, { color: theme.muted }]}>Je selectie wordt in dit plan bewaard. Appblokkering is nog niet gekoppeld.</Text></View>
    <View style={[styles.reminder, { borderColor: theme.border, backgroundColor: theme.card }]}><Toggle theme={theme} label="Herinner me 30 minuten vooraf" value={reminder} onChange={setReminder}/></View>
    {error !== '' && <Notice theme={theme}>{error}</Notice>}
    <View style={ui.spacer}/><Button theme={theme} title="Plan opslaan" onPress={save}/>
  </Page>
}
const styles = StyleSheet.create({ days: { flexDirection: 'row', flexWrap: 'wrap', gap: 7 }, times: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 }, time: { flex: 1, minWidth: 125 }, chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 }, hint: { fontSize: 12, lineHeight: 18, marginTop: 10 }, reminder: { borderWidth: 1, borderRadius: 23, paddingHorizontal: 18, marginTop: 24 } })
