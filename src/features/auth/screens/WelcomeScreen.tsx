import React, { useState } from 'react'
import { Platform, Pressable, ScrollView, StatusBar, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Landscape } from '../components/Landscape'
import { PrimaryButton } from '../components/PrimaryButton'
import type { Theme } from '../../../shared/theme/colors'

export function WelcomeScreen({ theme, onRegister, onLogin, onGuest }: { theme: Theme; onRegister: () => void; onLogin: () => void; onGuest: () => void }) {
  const insets = useSafeAreaInsets()
  const { height, fontScale } = useWindowDimensions()
  const [loginHovered, setLoginHovered] = useState(false)
  return <View style={[styles.root, { backgroundColor: theme.welcomeBottom }]}><StatusBar barStyle="dark-content"/><ScrollView contentContainerStyle={{ flexGrow: 1, minHeight: '100%' }} bounces={false}>
    <View style={[styles.art, { height: Math.max(220, Math.min(height * 0.64, height - 260), insets.top + 110 * fontScale), paddingTop: insets.top + 18 }]}><Landscape theme={theme} welcome/><View style={styles.logo}><Text style={styles.moon}>☾</Text><Text style={[styles.logoText, { color: '#8B6A53' }]}>RFM</Text><Text style={[styles.logoCaption, { color: '#8B6A53' }]}>SLEEP & RECHARGE</Text></View></View>
    <View style={[styles.content, { paddingBottom: Math.max(insets.bottom, 20) }]}><Text style={[styles.title, { color: theme.yellow }]}>Kom tot rust.</Text><Text style={styles.copy}>Een rustige plek om minder met je telefoon bezig te zijn.</Text><View style={styles.spacer}/><PrimaryButton title="Begin" theme={theme} light onPress={onRegister}/><Pressable accessibilityRole="button" onPress={onLogin} onHoverIn={() => setLoginHovered(true)} onHoverOut={() => setLoginHovered(false)} style={styles.login}>{({ pressed }) => <Text style={[styles.loginText, (loginHovered || pressed) && styles.loginTextActive]}>Ik heb al een account</Text>}</Pressable><Pressable accessibilityRole="button" onPress={onGuest} style={styles.guest}><Text style={styles.loginText}>Bekijk het hoofdscherm</Text></Pressable></View>
  </ScrollView></View>
}
const styles = StyleSheet.create({ root: { flex: 1 }, art: { width: '100%', alignItems: 'center', overflow: 'hidden' }, logo: { alignItems: 'center' }, moon: { color: '#FFC12E', fontSize: 31, lineHeight: 35 }, logoText: { fontSize: 29, fontWeight: '800', lineHeight: 32 }, logoCaption: { fontSize: 5, fontWeight: '700', letterSpacing: 0.6 }, content: { flexGrow: 1, width: '100%', maxWidth: 620, alignSelf: 'center', minHeight: 225, paddingHorizontal: 30, paddingTop: 18 }, title: { fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif', fontStyle: 'italic', fontSize: 35 }, copy: { fontSize: 14, color: '#FFF8F1', lineHeight: 20, marginTop: 8 }, spacer: { flexGrow: 1, minHeight: 30 }, login: { minHeight: 44, paddingVertical: 12, paddingHorizontal: 12, alignSelf: 'center', alignItems: 'center' }, guest: { minHeight: 44, paddingVertical: 12, paddingHorizontal: 12, alignSelf: 'center', alignItems: 'center' }, loginText: { color: '#FFF8F1', fontSize: 14 }, loginTextActive: { color: '#F7D394' } })
