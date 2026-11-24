import React, { useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import { CalendarDays, Check, CreditCard, Moon, UserRound } from 'lucide-react-native'
import { BottomNavigation, Card, Header, Page, ui } from '../../../shared/components/AppUI'
import type { AppTheme } from '../../../shared/theme/appTheme'
import type { Tab } from '../../../shared/models/app'

const groups = [
  { title: 'VANDAAG', items: [{ id: 'night', icon: Moon, time: '21:30' }, { id: 'plan', icon: CalendarDays, time: '08:00' }, { id: 'done', icon: Check, time: '07:55' }] },
  { title: 'GISTEREN', items: [{ id: 'card', icon: CreditCard, time: '18:03' }, { id: 'profile', icon: UserRound, time: '17:48' }] },
]
export function NotificationsScreen({ theme, onTab, read, onRead }: { theme: AppTheme; onTab: (tab: Tab) => void; read: string[]; onRead: (ids: string[]) => void }) {
  const [opened, setOpened] = useState<string>()
  return <Page theme={theme} header={<Header theme={theme} eyebrow="Notificatie"><View style={ui.spread}><Text accessibilityRole="header" style={[ui.title, { color: theme.ink, flex: 1 }]}>Meldingen</Text><Pressable accessibilityRole="button" onPress={() => onRead(groups.flatMap(group => group.items.map(item => item.id)))} style={{ minHeight: 44, justifyContent: 'center' }}><Text style={{ color: theme.ink, fontWeight: '700', fontSize: 13 }}>Alles gelezen</Text></Pressable></View></Header>} bottom={<BottomNavigation theme={theme} selected="notifications" onSelect={onTab}/>}>
    {groups.map((group, i) => <View key={group.title} style={{ marginTop: i ? 32 : 0 }}><Text style={[ui.label, { color: theme.muted, marginLeft: 8 }]}>{group.title}</Text><Card theme={theme}>{group.items.map((item, index) => <Pressable key={item.id} accessibilityRole="button" accessibilityLabel={`Voorbeeldmelding ${item.time}, ${read.includes(item.id) ? 'gelezen' : 'ongelezen'}`} onPress={() => { setOpened(opened === item.id ? undefined : item.id); onRead([...new Set([...read, item.id])]) }} style={{ paddingVertical: 16, flexDirection: 'row', alignItems: 'flex-start', gap: 10, borderBottomWidth: index === group.items.length - 1 ? 0 : 1, borderColor: theme.divider }}><View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: theme.soft, justifyContent: 'center', alignItems: 'center' }}><item.icon color={theme.ink} size={23}/></View><View style={{ flex: 1 }}><Text style={{ color: theme.ink, fontSize: 15, fontWeight: '700' }}>main tekst</Text><Text style={{ color: theme.muted, fontSize: 13, marginTop: 3 }}>subtekst</Text>{opened === item.id && <Text style={{ color: theme.muted, fontSize: 13, lineHeight: 19, marginTop: 8 }}>Dit is een voorbeeldmelding uit het ontwerp.</Text>}</View><View style={{ alignItems: 'flex-end', gap: 8 }}><Text style={{ color: theme.muted, fontSize: 12 }}>{item.time}</Text>{!read.includes(item.id) && <View style={{ width: 7, height: 7, borderRadius: 4, backgroundColor: theme.accent }}/>}</View></Pressable>)}</Card></View>)}
  </Page>
}
