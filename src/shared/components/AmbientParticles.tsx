import React, { useEffect, useRef, useState } from 'react'
import { AccessibilityInfo, Animated, AppState, Easing, StyleSheet, View } from 'react-native'
import Svg, { Circle, Defs, Ellipse, RadialGradient, Stop } from 'react-native-svg'
import type { AppTheme } from '../theme/appTheme'

function scatter(index: number, salt: number) {
  const value = Math.sin(index * 127.1 + salt * 311.7) * 43758.5453
  return value - Math.floor(value)
}

// Seeded positions look organic and stay stable when plans or the theme change.
const particles = Array.from({ length: 32 }, (_, index) => ({
  id: index,
  x: 5 + scatter(index, 1) * 88,
  y: 12 + scatter(index, 2) * 74,
  size: index % 7 === 0 ? 8 : 2.4 + (index % 3) * 0.7,
  star: index % 7 === 0,
  warm: index % 4 === 0,
  opacity: 0.4 + (index % 4) * 0.08,
  phase: (index * 0.173) % 1,
  duration: 10000 + (index % 5) * 1500,
  drift: (index % 2 === 0 ? 1 : -1) * (8 + index % 5),
  rise: 14 + (index % 4) * 5,
}))
type Particle = typeof particles[number]

function FloatingParticle({ particle, theme, moving }: { particle: Particle; theme: AppTheme; moving: boolean }) {
  const progress = useRef(new Animated.Value(particle.phase)).current
  useEffect(() => {
    if (!moving) {
      progress.setValue(particle.phase)
      return
    }
    const motion = Animated.loop(Animated.sequence([
      Animated.timing(progress, { toValue: 1, duration: particle.duration, easing: Easing.inOut(Easing.sin), useNativeDriver: true, isInteraction: false }),
      Animated.timing(progress, { toValue: 0, duration: particle.duration, easing: Easing.inOut(Easing.sin), useNativeDriver: true, isInteraction: false }),
    ]), { iterations: -1, resetBeforeIteration: false })
    motion.start()
    return () => { motion.stop(); progress.setValue(particle.phase) }
  }, [moving, particle, progress])

  const color = theme.dark ? '#FFF2CF' : particle.warm ? '#C99564' : '#FFF8E5'
  const glowId = `particle-soft-${particle.id}`
  return <Animated.View style={{
    position: 'absolute', left: `${particle.x}%`, top: `${particle.y}%`,
    width: particle.size * 1.8, height: particle.size * 1.8,
    marginLeft: -particle.size * 0.4, marginTop: -particle.size * 0.4,
    opacity: progress.interpolate({ inputRange: [0, 0.5, 1], outputRange: [particle.opacity * 0.65, particle.opacity, particle.opacity * 0.75] }),
    transform: [
      { translateX: progress.interpolate({ inputRange: [0, 1], outputRange: [-particle.drift, particle.drift] }) },
      { translateY: progress.interpolate({ inputRange: [0, 1], outputRange: [particle.rise, -particle.rise] }) },
    ],
  }}>
    <Svg width="100%" height="100%" viewBox="0 0 20 20">
      <Defs><RadialGradient id={glowId} cx="50%" cy="50%" r="50%">
        <Stop offset="0" stopColor={color} stopOpacity={0.7}/>
        <Stop offset="0.25" stopColor={color} stopOpacity={0.45}/>
        <Stop offset="0.65" stopColor={color} stopOpacity={0.16}/>
        <Stop offset="1" stopColor={color} stopOpacity={0}/>
      </RadialGradient></Defs>
      <Circle cx={10} cy={10} r={8} fill={`url(#${glowId})`} opacity={particle.star ? 0.55 : 1}/>
      {particle.star && <><Ellipse cx={10} cy={10} rx={2.5} ry={9} fill={`url(#${glowId})`}/><Ellipse cx={10} cy={10} rx={9} ry={2.5} fill={`url(#${glowId})`}/></>}
    </Svg>
  </Animated.View>
}

export function AmbientParticles({ theme }: { theme: AppTheme }) {
  const [reduceMotion, setReduceMotion] = useState(true)
  const [active, setActive] = useState(AppState.currentState !== 'background' && AppState.currentState !== 'inactive')
  useEffect(() => {
    let mounted = true
    let preferenceChanged = false
    const motionListener = AccessibilityInfo.addEventListener('reduceMotionChanged', enabled => {
      preferenceChanged = true
      setReduceMotion(enabled)
    })
    const appListener = AppState.addEventListener('change', state => setActive(state === 'active'))
    AccessibilityInfo.isReduceMotionEnabled().then(enabled => {
      if (mounted && !preferenceChanged) setReduceMotion(enabled)
    }).catch(() => {})
    return () => { mounted = false; motionListener.remove(); appListener.remove() }
  }, [])

  return <View pointerEvents="none" accessibilityElementsHidden importantForAccessibility="no-hide-descendants" style={[StyleSheet.absoluteFill, styles.field]}>
    {particles.map((particle, index) => <FloatingParticle key={index} particle={particle} theme={theme} moving={active && !reduceMotion}/>)}
  </View>
}
const styles = StyleSheet.create({ field: { overflow: 'hidden' } })
