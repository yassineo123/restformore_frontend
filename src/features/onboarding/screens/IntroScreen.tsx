import React from 'react'
import { Text, useWindowDimensions, View } from 'react-native'
import { Button, Header, Page, ui } from '../../../shared/components/AppUI'
import { Landscape } from '../../auth/components/Landscape'
import { colors } from '../../../shared/theme/colors'
import type { AppTheme } from '../../../shared/theme/appTheme'
import { AmbientParticles } from '../../../shared/components/AmbientParticles'

export function IntroScreen({ theme, onBack, onLater, onNext }: { theme: AppTheme; onBack: () => void; onLater: () => void; onNext: () => void }) {
  const { height } = useWindowDimensions()
  return <Page theme={theme} header={<View style={{ minHeight: Math.max(245, Math.min(height * 0.35, 300)) }}><Landscape theme={theme.dark ? colors.dark : colors.light} sunrise/><AmbientParticles theme={theme}/><Header theme={theme} title="Een paar vragen." onBack={onBack} transparent minimumHeight={190}/></View>}>
    <Text style={[ui.body, { color: theme.ink, fontSize: 17, lineHeight: 23, marginHorizontal: 8, marginTop: 8 }]}>We stellen je 10 korte vragen. Op basis van jouw antwoorden maken we een 14-daags plan dat bij jou past.</Text>
    <Text style={[ui.body, { color: theme.muted, fontSize: 13, lineHeight: 19, marginHorizontal: 8, marginTop: 12 }]}>De vragen zijn nu voorbeeldvragen. Een persoonlijk plan wordt nog niet automatisch samengesteld.</Text>
    <View style={ui.spacer}/><View style={[ui.row, { marginBottom: 32 }]}><Button theme={theme} title="Later" secondary onPress={onLater}/><View style={{ flex: 1 }}><Button theme={theme} title="Volgende" onPress={onNext}/></View></View>
  </Page>
}
