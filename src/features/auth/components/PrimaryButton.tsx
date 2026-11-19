import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'
import type { Theme } from '../../../shared/theme/colors'

export function PrimaryButton({ title, onPress, theme, light = false }: { title: string; onPress: () => void; theme: Theme; light?: boolean }) {
  return <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => [styles.button, { backgroundColor: light ? '#FBF4EC' : theme.primary, opacity: pressed ? 0.8 : 1 }]}><Text style={[styles.text, { color: light ? '#51331D' : theme.primaryText }]}>{title}</Text></Pressable>
}
const styles = StyleSheet.create({ button: { minHeight: 56, borderRadius: 32, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 }, text: { fontSize: 16, fontWeight: '700' } })
