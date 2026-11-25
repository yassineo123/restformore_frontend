import React, { useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import { Check, Circle } from 'lucide-react-native'
import { Button, Header, Notice, Page, ui } from '../../../shared/components/AppUI'
import type { AppTheme } from '../../../shared/theme/appTheme'

export const questionnaire = [
  { title: 'Hoe laat ga je meestal naar bed?', subtitle: 'Kies het moment dat het beste bij een gewone avond past.', answers: ['Voor 21:00', '21:00 – 22:00', '22:00 – 23:00', 'Na 23:00'] },
  { title: 'Hoe laat word je meestal wakker?', subtitle: 'Denk aan een gewone dag waarop je geen wekker hoeft te zetten.', answers: ['Voor 06:00', '06:00 – 07:00', '07:00 – 08:00', 'Na 08:00'] },
  { title: 'Hoe uitgerust voel je je als je wakker wordt?', subtitle: 'Er is geen goed of fout antwoord.', answers: ['Helemaal niet', 'Een beetje', 'Best goed', 'Heel uitgerust'] },
  { title: 'Hoeveel schermtijd heb je in het uur voor bed?', subtitle: 'Tel je telefoon, tablet, televisie en computer mee.', answers: ['Geen', 'Minder dan 15 min', '15 – 30 min', 'Meer dan 30 min'] },
  { title: 'Wat helpt jou om tot rust te komen?', subtitle: 'Kies wat je het liefst zou willen proberen.', answers: ['Lezen', 'Muziek luisteren', 'Ademhalen of mediteren', 'Een rustige wandeling'] },
  { title: 'Hoe vaak lukt het om op vaste tijden te slapen?', subtitle: 'Kijk naar de afgelopen twee weken.', answers: ['Bijna nooit', 'Soms', 'Meestal', 'Bijna altijd'] },
  { title: 'Wat houdt je ’s avonds het vaakst wakker?', subtitle: 'Kies de grootste aanleiding voor jou.', answers: ['Mijn telefoon', 'Gedachten of stress', 'Geluid of licht', 'Ik weet het niet'] },
  { title: 'Hoeveel tijd wil je per dag voor rust maken?', subtitle: 'Kies een haalbare hoeveelheid tijd.', answers: ['5 minuten', '10 minuten', '20 minuten', 'Meer dan 20 minuten'] },
  { title: 'Wanneer wil je vooral meer rust ervaren?', subtitle: 'Dit helpt om je routine straks beter te laten aansluiten.', answers: ['In de ochtend', 'Overdag', 'In de avond', 'Tijdens het slapen'] },
  { title: 'Hoe gemotiveerd ben je om iets nieuws te proberen?', subtitle: 'Kies het antwoord dat nu het meest klopt.', answers: ['Ik wil rustig beginnen', 'Een beetje gemotiveerd', 'Erg gemotiveerd', 'Ik ben er helemaal klaar voor'] },
] as const

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
  return <Page theme={theme} header={<Header theme={theme} particles onBack={previous} minimumHeight={280}>
    <View style={[ui.spread, { marginTop: 8 }]}><Text style={{ color: theme.ink, fontSize: 13 }}>Vraag {index + 1} van 10</Text><Text style={{ color: theme.ink, fontSize: 13 }}>Slaap en ritme</Text></View>
    <View accessibilityRole="progressbar" accessibilityValue={{ min: 0, max: 10, now: index + 1 }} style={{ height: 6, backgroundColor: theme.active, borderRadius: 3, marginTop: 8 }}><View style={{ width: `${(index + 1) * 10}%`, height: 6, borderRadius: 3, backgroundColor: theme.primary }}/></View>
    <Text accessibilityRole="header" style={[ui.title, { color: theme.ink, marginTop: 24 }]}>Slaap en ritme</Text>
  </Header>}>
    <Text style={[ui.body, { color: theme.muted, marginBottom: 18, marginHorizontal: 8 }]}>{questionnaire[index].subtitle}</Text>
    <Text style={[ui.heading, { color: theme.ink, marginHorizontal: 8, marginBottom: 18 }]}>{questionnaire[index].title}</Text>
    <View accessibilityRole="radiogroup" accessibilityLabel={`Antwoorden voor vraag ${index + 1}`} style={{ gap: 12 }}>{questionnaire[index].answers.map((answer, answerIndex) => <Pressable key={answer} accessibilityRole="radio" accessibilityState={{ checked: answers[index] === answerIndex }} onPress={() => { setAnswers(current => { const nextAnswers = [...current]; nextAnswers[index] = answerIndex; return nextAnswers }); setShowError(false) }} style={{ minHeight: 66, paddingHorizontal: 22, paddingVertical: 18, borderRadius: 24, borderWidth: answers[index] === answerIndex ? 2 : 1, borderColor: answers[index] === answerIndex ? theme.ink : theme.border, backgroundColor: answers[index] === answerIndex ? theme.soft : theme.card, flexDirection: 'row', alignItems: 'center', gap: 12 }}><Text style={{ flex: 1, color: theme.ink, fontSize: 16, fontWeight: '700' }}>{answer}</Text>{answers[index] === answerIndex ? <Check color={theme.ink} size={24}/> : <Circle color={theme.border} size={24}/>}</Pressable>)}</View>
    {showError && <Notice theme={theme}>Kies een antwoord om verder te gaan.</Notice>}
    <View style={ui.spacer}/><View style={ui.row}><Button theme={theme} title="Vorige" onPress={previous} secondary/><View style={{ flex: 1 }}><Button theme={theme} title={index === 9 ? 'Afronden' : 'Volgende'} onPress={next}/></View></View>
  </Page>
}
