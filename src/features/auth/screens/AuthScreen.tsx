import React, { useRef, useState } from 'react'
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StatusBar, StyleSheet, Text, TextInput, useWindowDimensions, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Svg, { Circle, Path } from 'react-native-svg'
import { Landscape } from '../components/Landscape'
import { PrimaryButton } from '../components/PrimaryButton'
import type { Theme } from '../../../shared/theme/colors'

type Props = { mode: 'login' | 'register'; theme: Theme; onBack: () => void; onSwitch: () => void }
export function AuthScreen({ mode, theme, onBack, onSwitch }: Props) {
  const register = mode === 'register'
  const insets = useSafeAreaInsets()
  const { height } = useWindowDimensions()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmation, setConfirmation] = useState('')
  const [visible, setVisible] = useState(false)
  const [confirmationVisible, setConfirmationVisible] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [notice, setNotice] = useState('')
  const passwordRef = useRef<React.ComponentRef<typeof TextInput>>(null)
  const confirmationRef = useRef<React.ComponentRef<typeof TextInput>>(null)
  const emailInvalid = submitted && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  const passwordInvalid = submitted && (register ? password.length < 8 : !password)
  const confirmationInvalid = submitted && register && (!confirmation || confirmation !== password)
  const submit = () => {
    setSubmitted(true)
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) || (register ? password.length < 8 || !confirmation || confirmation !== password : !password)) { setNotice(''); return }
    setNotice(register ? 'Registreren is nog niet beschikbaar. Er is nog geen accountdienst gekoppeld.' : 'Inloggen is nog niet beschikbaar. Er is nog geen accountdienst gekoppeld.')
  }
  return <KeyboardAvoidingView style={[styles.root, { backgroundColor: theme.surface }]} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
    <StatusBar barStyle="dark-content"/>
    <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1, minHeight: '100%' }} bounces={false}>
      <View style={[styles.hero, { height: Math.max(220, Math.min(height * 0.39, 340)), paddingTop: insets.top + 14 }]}><Landscape theme={theme} sunrise={register}/><View style={styles.heroText}>
        <Pressable accessibilityRole="button" accessibilityLabel="Terug naar welkom" onPress={onBack} style={[styles.back, { backgroundColor: '#FFFFFF99' }]}><Svg width={22} height={22} viewBox="0 0 24 24"><Path d="M15 4 7 12l8 8" stroke={theme.ink} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" fill="none"/></Svg></Pressable>
        <Text style={[styles.title, { color: theme.ink }]}>{register ? 'Registreren' : 'Login'}</Text><Text style={[styles.subtitle, { color: theme.ink }]}>{register ? 'Maak een account aan.' : 'Welkom terug.'}</Text>
      </View></View>
      <View style={[styles.sheet, { backgroundColor: theme.surface, paddingBottom: Math.max(insets.bottom, 24) }]}>
        <Text style={[styles.label, { color: theme.ink }]}>E-mailadres</Text>
        <View style={[styles.inputBox, { backgroundColor: theme.card, borderColor: emailInvalid ? theme.error : theme.border }]}><TextInput accessibilityLabel="E-mailadres" autoCapitalize="none" autoCorrect={false} autoComplete="email" keyboardType="email-address" returnKeyType="next" onSubmitEditing={() => passwordRef.current?.focus()} value={email} onChangeText={value => { setEmail(value); setNotice('') }} placeholder="naam@email.nl" placeholderTextColor={theme.muted} style={[styles.input, { color: theme.ink }]}/></View>
        {emailInvalid && <Text accessibilityRole="alert" style={[styles.error, { color: theme.error }]}>Vul een geldig e-mailadres in.</Text>}
        <Text style={[styles.label, styles.passwordLabel, { color: theme.ink }]}>Wachtwoord</Text>
        <View style={[styles.inputBox, { backgroundColor: theme.card, borderColor: passwordInvalid ? theme.error : theme.border }]}><TextInput ref={passwordRef} accessibilityLabel="Wachtwoord" autoCapitalize="none" autoCorrect={false} autoComplete={register ? 'new-password' : 'current-password'} secureTextEntry={!visible} returnKeyType={register ? 'next' : 'done'} onSubmitEditing={() => register ? confirmationRef.current?.focus() : submit()} value={password} onChangeText={value => { setPassword(value); setNotice('') }} placeholder={register ? 'Minimaal 8 tekens' : 'Je wachtwoord'} placeholderTextColor={theme.muted} style={[styles.input, { color: theme.ink }]}/><Pressable accessibilityRole="button" accessibilityLabel={visible ? 'Verberg wachtwoord' : 'Toon wachtwoord'} onPress={() => setVisible(!visible)} hitSlop={12} style={styles.eye}><Svg width={23} height={23} viewBox="0 0 24 24"><Path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" stroke={theme.muted} strokeWidth={1.8} fill="none"/><Circle cx={12} cy={12} r={2.6} stroke={theme.muted} strokeWidth={1.8} fill="none"/>{visible && <Path d="M4 4l16 16" stroke={theme.muted} strokeWidth={1.8}/>}</Svg></Pressable></View>
        {passwordInvalid && <Text accessibilityRole="alert" style={[styles.error, { color: theme.error }]}>{register ? 'Gebruik minimaal 8 tekens.' : 'Vul je wachtwoord in.'}</Text>}
        {register && <><Text style={[styles.label, styles.passwordLabel, { color: theme.ink }]}>Herhaal wachtwoord</Text>
          <View style={[styles.inputBox, { backgroundColor: theme.card, borderColor: confirmationInvalid ? theme.error : theme.border }]}><TextInput ref={confirmationRef} accessibilityLabel="Herhaal wachtwoord" autoCapitalize="none" autoCorrect={false} autoComplete="new-password" secureTextEntry={!confirmationVisible} returnKeyType="done" onSubmitEditing={submit} value={confirmation} onChangeText={value => { setConfirmation(value); setNotice('') }} placeholder="Herhaal je wachtwoord" placeholderTextColor={theme.muted} style={[styles.input, { color: theme.ink }]}/><Pressable accessibilityRole="button" accessibilityLabel={confirmationVisible ? 'Verberg herhaald wachtwoord' : 'Toon herhaald wachtwoord'} onPress={() => setConfirmationVisible(!confirmationVisible)} hitSlop={12} style={styles.eye}><Svg width={23} height={23} viewBox="0 0 24 24"><Path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" stroke={theme.muted} strokeWidth={1.8} fill="none"/><Circle cx={12} cy={12} r={2.6} stroke={theme.muted} strokeWidth={1.8} fill="none"/>{confirmationVisible && <Path d="M4 4l16 16" stroke={theme.muted} strokeWidth={1.8}/>}</Svg></Pressable></View>
          {confirmationInvalid && <Text accessibilityRole="alert" style={[styles.error, { color: theme.error }]}>{confirmation ? 'De wachtwoorden komen niet overeen.' : 'Herhaal je wachtwoord.'}</Text>}</>}
        {!register && <Pressable accessibilityRole="button" onPress={() => setNotice('Wachtwoord herstellen is nog niet beschikbaar.')} style={styles.forgot}><Text style={[styles.forgotText, { color: theme.ink }]}>Wachtwoord vergeten?</Text></Pressable>}
        {notice !== '' && <Text accessibilityRole="alert" style={[styles.notice, { color: theme.ink, backgroundColor: '#F6E0CD' }]}>{notice}</Text>}
        <View style={{ marginTop: register ? 38 : 18 }}><PrimaryButton title="Verder" theme={theme} onPress={submit}/></View>
        <Pressable accessibilityRole="button" onPress={onSwitch} style={styles.switch}><Text style={{ color: theme.muted, textAlign: 'center', fontSize: 14 }}>{register ? 'Heb je al een account? ' : 'Nog geen account? '}<Text style={{ color: theme.ink, fontWeight: '700' }}>{register ? 'Log in' : 'Registreer'}</Text></Text></Pressable>
      </View>
    </ScrollView>
  </KeyboardAvoidingView>
}
const styles = StyleSheet.create({ root: { flex: 1 }, hero: { overflow: 'hidden' }, heroText: { paddingHorizontal: 30 }, back: { width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center', marginBottom: 20 }, title: { fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif', fontSize: 32 }, subtitle: { fontSize: 14, marginTop: 7 }, sheet: { flexGrow: 1, marginTop: -20, borderTopLeftRadius: 28, borderTopRightRadius: 28, paddingHorizontal: 22, paddingTop: 30 }, label: { fontSize: 13, fontWeight: '700', marginBottom: 8 }, passwordLabel: { marginTop: 18 }, inputBox: { minHeight: 56, borderRadius: 20, borderWidth: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 19 }, input: { flex: 1, fontSize: 15, paddingVertical: 14 }, eye: { paddingLeft: 12 }, error: { fontSize: 12, marginTop: 6 }, forgot: { alignSelf: 'flex-end', paddingTop: 15, paddingBottom: 3 }, forgotText: { fontSize: 12, fontWeight: '700' }, notice: { padding: 12, borderRadius: 12, marginTop: 18, lineHeight: 19, fontSize: 13 }, switch: { paddingVertical: 32 } })
