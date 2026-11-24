import React, { useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import { Button, Card, Chip, Header, MenuRow, Notice, Page, Toggle, ui } from '../../../shared/components/AppUI'
import { appChoices } from '../../../shared/models/app'
import type { Appearance, AppTheme } from '../../../shared/theme/appTheme'

export function SettingsScreen({ theme, appearance, onAppearance, notifications, onNotifications, selectedApps, onApps, onBack, onExit }: { theme: AppTheme; appearance: Appearance; onAppearance: (value: Appearance) => void; notifications: boolean; onNotifications: (value: boolean) => void; selectedApps: string[]; onApps: (apps: string[]) => void; onBack: () => void; onExit: () => void }) {
  const [notice, setNotice] = useState('')
  const [showApps, setShowApps] = useState(false)
  return <Page theme={theme} header={<Header theme={theme} title="Instellingen" onBack={onBack}/>}>
    <Text style={[ui.label, { color: theme.muted, marginLeft: 8 }]}>DIGITALE BALANS</Text>
    <Card theme={theme}><MenuRow theme={theme} title="Geblokkeerde apps" value={`${selectedApps.length} apps`} onPress={() => setShowApps(!showApps)}/><MenuRow theme={theme} title="NFC-pasje" value="Niet gekoppeld" onPress={() => setNotice('Een NFC-pasje koppelen is nog niet beschikbaar.')}/><Toggle theme={theme} label="Meldingen" value={notifications} onChange={onNotifications} subtitle="Toon de voorbeeldmeldingen in de app"/><MenuRow theme={theme} title="Noodtoegang" value="Uit" onPress={() => setNotice('Noodtoegang is nog niet beschikbaar. Er worden momenteel geen apps geblokkeerd.')} last/></Card>
    {showApps && <Card theme={theme} style={{ marginTop: 14, paddingVertical: 16 }}><Text style={[ui.body, { color: theme.muted, marginBottom: 12 }]}>Kies je apps. Dit is een lokale voorkeur; apps worden nog niet daadwerkelijk geblokkeerd.</Text><View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>{appChoices.map(app => <Chip key={app} theme={theme} label={app} selected={selectedApps.includes(app)} onPress={() => onApps(selectedApps.includes(app) ? selectedApps.filter(value => value !== app) : [...selectedApps, app])}/>)}</View></Card>}
    <Text style={[ui.label, { color: theme.muted, marginLeft: 8, marginTop: 28 }]}>VOORKEUREN</Text>
    <Card theme={theme}><Toggle theme={theme} label="Dag/nacht cyclus" value={appearance === 'system'} onChange={value => onAppearance(value ? 'system' : theme.dark ? 'dark' : 'light')} subtitle="Volgt automatisch de apparaatinstelling"/>
      <View style={{ paddingVertical: 12, borderTopWidth: 1, borderBottomWidth: 1, borderColor: theme.divider }}><Text style={{ color: theme.muted, fontSize: 12, marginBottom: 8 }}>Vaste modus{appearance === 'system' ? ' (cyclus staat aan)' : ''}</Text><View style={ui.row}><View style={{ flex: 1 }}><Button theme={theme} title="Dag" secondary={appearance !== 'light'} onPress={() => onAppearance('light')}/></View><View style={{ flex: 1 }}><Button theme={theme} title="Nacht" secondary={appearance !== 'dark'} onPress={() => onAppearance('dark')}/></View></View></View>
      <MenuRow theme={theme} title="Taal" value="Nederlands" onPress={() => setNotice('De app is op dit moment beschikbaar in het Nederlands.')} last/>
    </Card>
    {notice !== '' && <Notice theme={theme}>{notice}</Notice>}
    <View style={ui.spacer}/><Pressable accessibilityRole="button" onPress={onExit} style={{ minHeight: 48, padding: 12, alignItems: 'center', justifyContent: 'center' }}><Text style={{ color: theme.ink, fontSize: 15, fontWeight: '700' }}>Terug naar welkom</Text></Pressable>
  </Page>
}
