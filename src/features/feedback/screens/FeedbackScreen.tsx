import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { Button, Chip, Field, Header, Notice, Page, ui } from '../../../shared/components/AppUI'
import type { AppTheme } from '../../../shared/theme/appTheme'

export function FeedbackScreen({ theme, onBack }: { theme: AppTheme; onBack: () => void }) {
  const [category, setCategory] = useState('Probleem')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  return <Page theme={theme} header={<Header theme={theme} title="Issues & feedback" onBack={onBack}/>}>
    <Text style={[ui.label, { color: theme.ink }]}>Waar gaat het over?</Text><View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>{['Probleem', 'Idee', 'Anders'].map(value => <Chip key={value} theme={theme} label={value} selected={category === value} onPress={() => setCategory(value)}/>)}</View>
    <View style={ui.section}><Field theme={theme} label="Bericht" placeholder="Beschrijf wat je opvalt of wat beter kan." value={message} onChangeText={value => { setMessage(value); setSubmitted(false) }} multiline maxLength={3000} error={submitted && !message.trim() ? 'Schrijf eerst een bericht.' : undefined}/></View>
    <View style={{ marginTop: 32 }}><Button theme={theme} title="Versturen" onPress={() => setSubmitted(true)}/></View>
    {submitted && message.trim() !== '' && <Notice theme={theme}>Je bericht is niet verstuurd. Er is nog geen feedbackdienst gekoppeld. Je tekst blijft staan zolang dit scherm open is.</Notice>}
  </Page>
}
