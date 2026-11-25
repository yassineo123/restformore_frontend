import React from 'react'
import { Text, View } from 'react-native'
import { Button, Header, Page, ui } from '../../../shared/components/AppUI'
import type { AppTheme } from '../../../shared/theme/appTheme'

export function GuidedPlanScreen({ theme, onFinish }: { theme: AppTheme; onFinish: () => void }) {
  return <Page theme={theme} header={<Header theme={theme} particles title="Jouw 14-daagse plan" eyebrow="Routine" minimumHeight={300} />}>
    <Text style={[ui.heading, { color: theme.ink, marginHorizontal: 8 }]}>Je vragen zijn afgerond</Text>
    <Text style={[ui.body, { color: theme.muted, marginHorizontal: 8, marginTop: 12 }]}>Hier komt straks jouw persoonlijke 14-daagse plan te staan. De antwoorden worden nu nog niet automatisch verwerkt.</Text>
    <View style={[ui.spacer, { minHeight: 180 }]} />
    <Button theme={theme} title="Naar mijn routine" onPress={onFinish} />
  </Page>
}
