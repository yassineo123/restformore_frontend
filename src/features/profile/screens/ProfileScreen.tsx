import React from 'react'
import { Text, View } from 'react-native'
import { ClipboardList, Info, MessageSquare, Sun, UserRound } from 'lucide-react-native'
import { BottomNavigation, Card, Header, MenuRow, Page, ui } from '../../../shared/components/AppUI'
import type { Profile, Route, Tab } from '../../../shared/models/app'
import type { AppTheme } from '../../../shared/theme/appTheme'

export function ProfileScreen({ theme, profile, onTab, onNavigate }: { theme: AppTheme; profile: Profile; onTab: (tab: Tab) => void; onNavigate: (route: Route) => void }) {
  return <Page theme={theme} header={<Header theme={theme} eyebrow="Profiel" curves tall><View style={{ alignItems: 'center', marginTop: 24 }}><View style={{ backgroundColor: theme.primary, width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: theme.primaryText, fontSize: 34, fontWeight: '700' }}>{profile.name.trim().charAt(0).toUpperCase() || '?'}</Text></View><Text style={[ui.title, { color: theme.ink, fontSize: 28, marginTop: 14, textAlign: 'center' }]}>{profile.name}</Text><Text style={{ color: theme.ink, fontSize: 14, marginTop: 4, textAlign: 'center' }}>{profile.email}</Text></View></Header>} bottom={<BottomNavigation theme={theme} selected="profile" onSelect={onTab}/>}>
    <Card theme={theme}><MenuRow theme={theme} title="Gegevens aanpassen" icon={UserRound} onPress={() => onNavigate('editProfile')}/><MenuRow theme={theme} title="Issues & feedback" icon={MessageSquare} onPress={() => onNavigate('feedback')}/><MenuRow theme={theme} title="Instellingen" icon={Sun} onPress={() => onNavigate('settings')} last/></Card>
    <View style={{ marginTop: 16 }}><Card theme={theme}><MenuRow theme={theme} title="Introvragen" icon={ClipboardList} onPress={() => onNavigate('intro')} last/></Card></View>
    <View style={ui.spacer}/><Card theme={theme}><MenuRow theme={theme} title="Over RFM" value="Versie 1.0" icon={Info} onPress={() => onNavigate('about')} last/></Card>
  </Page>
}
