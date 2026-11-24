import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { Moon } from 'lucide-react-native'
import { Card, Header, MenuRow, Notice, Page, ui } from '../../../shared/components/AppUI'
import type { AppTheme } from '../../../shared/theme/appTheme'

export function AboutScreen({ theme, onBack }: { theme: AppTheme; onBack: () => void }) {
  const [notice, setNotice] = useState('')
  return <Page theme={theme} header={<Header theme={theme} title="Over RFM" onBack={onBack}/>}>
    <View style={{ alignItems: 'center', paddingVertical: 28 }}><Moon size={44} color="#FFC12E" fill="#FFC12E"/><Text style={{ color: theme.ink, fontSize: 30, fontWeight: '800', marginTop: 4 }}>RFM</Text><Text style={{ color: theme.muted, fontSize: 14, marginTop: 8 }}>Rest For More</Text><Text style={{ color: theme.muted, fontSize: 13, marginTop: 6 }}>Versie 1.0</Text><Text style={[ui.body, { color: theme.muted, textAlign: 'center', marginTop: 32 }]}>Een rustige plek om minder met je telefoon bezig te zijn. Elke dag een beetje.</Text></View>
    <Card theme={theme} style={{ marginTop: 6 }}><MenuRow theme={theme} title="Privacybeleid" onPress={() => setNotice('Het privacybeleid is nog niet toegevoegd aan de app.')}/><MenuRow theme={theme} title="Gebruiksvoorwaarden" onPress={() => setNotice('De gebruiksvoorwaarden zijn nog niet toegevoegd aan de app.')}/><MenuRow theme={theme} title="Contact" onPress={() => setNotice('Er is nog geen contactadres ingesteld.')} last/></Card>
    {notice !== '' && <Notice theme={theme}>{notice}</Notice>}
  </Page>
}
