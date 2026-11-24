import React, { type PropsWithChildren } from 'react'
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StatusBar, StyleSheet, Switch, Text, TextInput, View, type TextInputProps, type StyleProp, type ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Bell, CalendarDays, ChevronLeft, ChevronRight, House, UserRound, type LucideIcon } from 'lucide-react-native'
import Svg, { Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg'
import type { AppTheme } from '../theme/appTheme'
import type { Tab } from '../models/app'
import { AmbientParticles } from './AmbientParticles'

export const ui = StyleSheet.create({
  title: { fontSize: 32, fontWeight: '400', fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif' },
  heading: { fontSize: 21, fontWeight: '400', fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif' },
  body: { fontSize: 15, lineHeight: 22 }, label: { fontSize: 13, fontWeight: '700', marginBottom: 8 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 }, spread: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  section: { marginTop: 28 }, spacer: { flexGrow: 1, minHeight: 30 },
})

export function Sky({ theme, curves = false }: { theme: AppTheme; curves?: boolean }) {
  return <View pointerEvents="none" style={StyleSheet.absoluteFill} accessibilityElementsHidden importantForAccessibility="no-hide-descendants"><Svg width="100%" height="100%" viewBox="0 0 403 466" preserveAspectRatio="none">
    <Defs><LinearGradient id="app-sky" x1="0" y1="0" x2="0" y2="1"><Stop offset="0" stopColor={theme.skyTop}/><Stop offset="1" stopColor={theme.skyBottom}/></LinearGradient></Defs>
    <Rect width={403} height={466} fill="url(#app-sky)"/>
    {curves && <><Path d="M-40 438C-53 386 65 300 227 247S451 194 552 246C569 298 451 383 289 436S-23 490-40 438Z" fill="#fff" opacity={theme.dark ? 0.04 : 0.22}/><Path d="M-139 491c-8-39 102-96 248-127s269-24 277 15-102 96-247 127-270 24-278-15Z" fill="#fff" opacity={theme.dark ? 0.03 : 0.14}/></>}
  </Svg></View>
}

export function Page({ theme, header, children, bottom, contentStyle }: PropsWithChildren<{ theme: AppTheme; header: React.ReactNode; bottom?: React.ReactNode; contentStyle?: StyleProp<ViewStyle> }>) {
  const insets = useSafeAreaInsets()
  return <KeyboardAvoidingView style={{ flex: 1, backgroundColor: theme.surface }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
    <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'}/>
    <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1 }} bounces={false}>
      {header}
      <View style={[styles.sheet, { backgroundColor: theme.surface, paddingLeft: 22 + insets.left, paddingRight: 22 + insets.right, paddingBottom: bottom ? 22 : Math.max(insets.bottom, 24) }]}><View style={[styles.content, contentStyle]}>{children}</View></View>
    </ScrollView>
    {bottom}
  </KeyboardAvoidingView>
}

export function Header({ theme, title, eyebrow, onBack, children, tall = false, curves = false, transparent = false, minimumHeight, particles = false }: PropsWithChildren<{ theme: AppTheme; title?: string; eyebrow?: string; onBack?: () => void; tall?: boolean; curves?: boolean; transparent?: boolean; minimumHeight?: number; particles?: boolean }>) {
  const insets = useSafeAreaInsets()
  return <View style={{ paddingTop: insets.top + 18, paddingBottom: 46, minHeight: (minimumHeight ?? (tall ? 340 : 205)) + insets.top }}>
    {!transparent && <Sky theme={theme} curves={curves}/>}
    {particles && <AmbientParticles theme={theme}/>}
    <View style={[styles.headerContent, { paddingLeft: 28 + insets.left, paddingRight: 28 + insets.right }]}>
      {onBack && <Pressable accessibilityRole="button" accessibilityLabel="Terug" onPress={onBack} style={[styles.back, { backgroundColor: theme.dark ? theme.active : '#FFFFFF99' }]}><ChevronLeft size={26} color={theme.ink}/></Pressable>}
      {eyebrow && <Text style={{ color: theme.ink, fontSize: 14, marginBottom: 8, marginTop: onBack ? 0 : 18 }}>{eyebrow}</Text>}
      {title && <Text accessibilityRole="header" style={[ui.title, { color: theme.ink }]}>{title}</Text>}
      {children}
    </View>
  </View>
}

export function BottomNavigation({ theme, selected, onSelect }: { theme: AppTheme; selected: Tab; onSelect: (tab: Tab) => void }) {
  const insets = useSafeAreaInsets()
  const tabs: { id: Tab; label: string; icon: LucideIcon }[] = [{ id: 'home', label: 'Thuis', icon: House }, { id: 'routine', label: 'Routine', icon: CalendarDays }, { id: 'notifications', label: 'Notificaties', icon: Bell }, { id: 'profile', label: 'Profiel', icon: UserRound }]
  return <View style={{ backgroundColor: theme.surface, borderTopWidth: 1, borderTopColor: theme.divider, paddingBottom: Math.max(insets.bottom, 8), paddingLeft: insets.left, paddingRight: insets.right }}><View style={styles.nav}>
    {tabs.map(item => <Pressable key={item.id} accessibilityRole="tab" accessibilityState={{ selected: selected === item.id }} accessibilityLabel={item.label} onPress={() => onSelect(item.id)} style={({ pressed }) => [styles.tab, { opacity: pressed ? 0.65 : 1 }]}><View style={[styles.navIcon, selected === item.id && { backgroundColor: theme.active }]}><item.icon color={theme.ink} size={27} strokeWidth={1.8}/></View><Text style={{ color: theme.ink, fontSize: 11, textAlign: 'center', fontWeight: selected === item.id ? '700' : '400' }}>{item.label}</Text></Pressable>)}
  </View></View>
}

export function Button({ theme, title, onPress, secondary = false, disabled = false }: { theme: AppTheme; title: string; onPress: () => void; secondary?: boolean; disabled?: boolean }) {
  return <Pressable accessibilityRole="button" accessibilityState={{ disabled }} disabled={disabled} onPress={onPress} style={({ pressed }) => [styles.button, { backgroundColor: secondary ? 'transparent' : theme.primary, borderColor: theme.primary, opacity: disabled ? 0.5 : pressed ? 0.75 : 1 }]}><Text style={{ color: secondary ? theme.ink : theme.primaryText, fontSize: 16, fontWeight: '700', textAlign: 'center' }}>{title}</Text></Pressable>
}

export function Card({ theme, children, style }: PropsWithChildren<{ theme: AppTheme; style?: StyleProp<ViewStyle> }>) {
  return <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.divider }, style]}>{children}</View>
}

export function MenuRow({ theme, title, value, onPress, icon: Icon, last = false, subtitle }: { theme: AppTheme; title: string; value?: string; onPress: () => void; icon?: LucideIcon; last?: boolean; subtitle?: string }) {
  return <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => [styles.menu, { borderBottomColor: theme.divider, borderBottomWidth: last ? 0 : 1, opacity: pressed ? 0.6 : 1 }]}>
    {Icon && <View style={[styles.menuIcon, { backgroundColor: theme.soft }]}><Icon size={23} color={theme.ink} strokeWidth={1.8}/></View>}
    <View style={{ flex: 1 }}><Text style={{ color: theme.ink, fontWeight: '700', fontSize: 15 }}>{title}</Text>{subtitle && <Text style={{ color: theme.muted, fontSize: 12, lineHeight: 18, marginTop: 4 }}>{subtitle}</Text>}</View>
    {value && <Text style={{ color: theme.muted, fontSize: 13, flexShrink: 1, textAlign: 'right' }}>{value}</Text>}<ChevronRight color={theme.muted} size={20}/>
  </Pressable>
}

export function Field({ theme, label, error, trailing, inlineLabel = false, ...props }: TextInputProps & { theme: AppTheme; label: string; error?: string; trailing?: React.ReactNode; inlineLabel?: boolean }) {
  return <View>{!inlineLabel && <Text style={[ui.label, { color: theme.ink }]}>{label}</Text>}<View style={[styles.field, { backgroundColor: theme.card, borderColor: error ? theme.error : theme.divider }]}>{inlineLabel && <Text style={{ color: theme.muted, fontSize: 14, marginRight: 8 }}>{label}</Text>}<TextInput {...props} accessibilityLabel={label} placeholderTextColor={theme.muted} style={[styles.input, { color: theme.ink }, inlineLabel && { textAlign: 'right', fontWeight: '700' }, props.multiline && { minHeight: 150, textAlignVertical: 'top' }, props.style]}/>{trailing}</View>{error && <Text accessibilityRole="alert" style={{ color: theme.error, fontSize: 13, marginTop: 6 }}>{error}</Text>}</View>
}

export function Toggle({ theme, label, value, onChange, subtitle }: { theme: AppTheme; label: string; value: boolean; onChange: (value: boolean) => void; subtitle?: string }) {
  return <View style={[styles.toggle, { borderColor: theme.divider }]}><View style={{ flex: 1 }}><Text style={{ color: theme.ink, fontSize: 15, fontWeight: '700' }}>{label}</Text>{subtitle && <Text style={{ color: theme.muted, fontSize: 13, lineHeight: 19, marginTop: 4 }}>{subtitle}</Text>}</View><Switch accessibilityLabel={label} value={value} onValueChange={onChange} trackColor={{ false: theme.divider, true: theme.primary }} thumbColor={theme.surface}/></View>
}

export function Chip({ theme, label, selected, onPress, compact = false }: { theme: AppTheme; label: string; selected: boolean; onPress: () => void; compact?: boolean }) {
  return <Pressable accessibilityRole="checkbox" accessibilityState={{ checked: selected }} onPress={onPress} style={({ pressed }) => [styles.chip, compact && { minWidth: 44, paddingHorizontal: 7 }, { backgroundColor: selected ? theme.primary : 'transparent', borderColor: theme.border, opacity: pressed ? 0.7 : 1 }]}><Text style={{ color: selected ? theme.primaryText : theme.ink, fontSize: 14, fontWeight: '700', textAlign: 'center' }}>{label}</Text></Pressable>
}

export function Notice({ theme, children }: PropsWithChildren<{ theme: AppTheme }>) {
  return <Text accessibilityRole="alert" accessibilityLiveRegion="polite" style={{ color: theme.ink, backgroundColor: theme.soft, padding: 14, borderRadius: 16, fontSize: 14, lineHeight: 21, marginTop: 16 }}>{children}</Text>
}

const styles = StyleSheet.create({
  sheet: { flexGrow: 1, marginTop: -24, borderTopLeftRadius: 28, borderTopRightRadius: 28, paddingTop: 28 }, content: { width: '100%', maxWidth: 560, alignSelf: 'center', flexGrow: 1 }, headerContent: { width: '100%', maxWidth: 616, alignSelf: 'center' }, back: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', marginBottom: 18 },
  nav: { flexDirection: 'row', width: '100%', maxWidth: 604, alignSelf: 'center' }, tab: { flex: 1, minHeight: 72, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 2 }, navIcon: { width: 48, height: 42, borderRadius: 22, alignItems: 'center', justifyContent: 'center', marginBottom: 3 },
  button: { minHeight: 56, borderRadius: 32, borderWidth: 1.5, paddingVertical: 14, paddingHorizontal: 24, alignItems: 'center', justifyContent: 'center' }, card: { borderWidth: 1, borderRadius: 26, paddingHorizontal: 18 }, menu: { minHeight: 60, paddingVertical: 12, flexDirection: 'row', alignItems: 'center', gap: 10 }, menuIcon: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' }, field: { borderWidth: 1, borderRadius: 21, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 }, input: { flex: 1, minWidth: 0, minHeight: 56, paddingVertical: 16, fontSize: 15, lineHeight: 22 }, toggle: { minHeight: 64, paddingVertical: 12, flexDirection: 'row', gap: 12, alignItems: 'center' }, chip: { minHeight: 44, paddingVertical: 10, paddingHorizontal: 14, borderRadius: 24, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center' },
})
