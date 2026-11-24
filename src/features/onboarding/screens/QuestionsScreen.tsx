import React, { useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import { Check, Circle } from 'lucide-react-native'
import { Button, Header, Notice, Page, ui } from '../../../shared/components/AppUI'
import type { AppTheme } from '../../../shared/theme/appTheme'

export function QuestionsScreen({ theme, initialAnswers, onBack, onComplete }: { theme: AppTheme; initialAnswers: number[]; onBack: () => void; onComplete: (answers: number[]) => void }) {
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<number[]>(initialAnswers)
  const [showError, setShowError] = useState(false)
  const previous = () => { setShowError(false); if (index === 0) onBack(); else setIndex(index - 1) }
  const next = () => {
    if (answers[index] === undefined) { setShowError(true); return }
    setShowError(false)
    if (index === 9) onComplete(answers)
    else setIndex(index + 1)
  }
  return <Page theme={theme} header={<Header theme={theme} onBack={previous} minimumHeight={280}>
    <View style={[ui.spread, { marginTop: 8 }]}><Text style={{ color: theme.ink, fontSize: 13 }}>Vraag {index + 1} van 10</Text><Text style={{ color: theme.ink, fontSize: 13 }}>Slaap en ritme</Text></View>
    <View accessibilityRole="progressbar" accessibilityValue={{ min: 0, max: 10, now: index + 1 }} style={{ height: 6, backgroundColor: theme.active, borderRadius: 3, marginTop: 8 }}><View style={{ width: `${(index + 1) * 10}%`, height: 6, borderRadius: 3, backgroundColor: theme.primary }}/></View>
    <Text accessibilityRole="header" style={[ui.title, { color: theme.ink, marginTop: 24 }]}>*vraag* {index + 1}</Text>
  </Header>}>
    <Text style={[ui.body, { color: theme.muted, marginBottom: 18, marginHorizontal: 8 }]}>*subtekst hier - kan leuk zijn*</Text>
    <View accessibilityRole="radiogroup" accessibilityLabel={`Antwoorden voor vraag ${index + 1}`} style={{ gap: 12 }}>{[0, 1, 2, 3].map(answer => <Pressable key={answer} accessibilityRole="radio" accessibilityState={{ checked: answers[index] === answer }} onPress={() => { setAnswers(current => { const nextAnswers = [...current]; nextAnswers[index] = answer; return nextAnswers }); setShowError(false) }} style={{ minHeight: 66, paddingHorizontal: 22, paddingVertical: 18, borderRadius: 24, borderWidth: answers[index] === answer ? 2 : 1, borderColor: answers[index] === answer ? theme.ink : theme.border, backgroundColor: answers[index] === answer ? theme.soft : theme.card, flexDirection: 'row', alignItems: 'center', gap: 12 }}><Text style={{ flex: 1, color: theme.ink, fontSize: 16, fontWeight: '700' }}>antwoord {answer + 1}</Text>{answers[index] === answer ? <Check color={theme.ink} size={24}/> : <Circle color={theme.border} size={24}/>}</Pressable>)}</View>
    {showError && <Notice theme={theme}>Kies een antwoord om verder te gaan.</Notice>}
    <View style={ui.spacer}/><View style={ui.row}><Button theme={theme} title="Vorige" onPress={previous} secondary/><View style={{ flex: 1 }}><Button theme={theme} title={index === 9 ? 'Afronden' : 'Volgende'} onPress={next}/></View></View>
  </Page>
}
