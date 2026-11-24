import React, { useState } from 'react'
import { Pressable, View } from 'react-native'
import { Eye, EyeOff } from 'lucide-react-native'
import { Button, Field, Header, Notice, Page } from '../../../shared/components/AppUI'
import { isEmail, type Profile } from '../../../shared/models/app'
import type { AppTheme } from '../../../shared/theme/appTheme'

export function EditProfileScreen({ theme, profile, onBack, onSave }: { theme: AppTheme; profile: Profile; onBack: () => void; onSave: (profile: Profile) => void }) {
  const [name, setName] = useState(profile.name)
  const [email, setEmail] = useState(profile.email)
  const [password, setPassword] = useState('')
  const [visible, setVisible] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const save = () => {
    setSubmitted(true)
    if (!name.trim() || !isEmail(email) || password) return
    onSave({ name: name.trim(), email: email.trim() })
  }
  const EyeIcon = visible ? EyeOff : Eye
  return <Page theme={theme} header={<Header theme={theme} particles title="Gegevens aanpassen" onBack={onBack}/>}>
    <Field theme={theme} label="Naam" placeholder="Je naam" value={name} onChangeText={setName} autoComplete="name" maxLength={80} error={submitted && !name.trim() ? 'Vul je naam in.' : undefined}/>
    <View style={{ marginTop: 18 }}><Field theme={theme} label="E-mailadres" placeholder="naam@email.nl" value={email} onChangeText={setEmail} autoCapitalize="none" autoCorrect={false} keyboardType="email-address" autoComplete="email" error={submitted && !isEmail(email) ? 'Vul een geldig e-mailadres in.' : undefined}/></View>
    <View style={{ marginTop: 18 }}><Field theme={theme} label="Nieuw wachtwoord" placeholder="Laat leeg om te behouden" value={password} onChangeText={setPassword} secureTextEntry={!visible} autoCapitalize="none" autoCorrect={false} autoComplete="new-password" trailing={<Pressable accessibilityRole="button" accessibilityLabel={visible ? 'Verberg wachtwoord' : 'Toon wachtwoord'} onPress={() => setVisible(!visible)} style={{ minWidth: 44, minHeight: 44, alignItems: 'center', justifyContent: 'center' }}><EyeIcon size={22} color={theme.muted}/></Pressable>}/></View>
    {submitted && password !== '' && <Notice theme={theme}>Wachtwoord wijzigen is nog niet gekoppeld aan een accountdienst. Laat dit veld leeg om je naam en e-mailadres lokaal op te slaan.</Notice>}
    <View style={{ marginTop: 56 }}><Button theme={theme} title="Opslaan" onPress={save}/></View>
  </Page>
}
