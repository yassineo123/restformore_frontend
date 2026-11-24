import React, { useEffect, useRef, useState } from 'react'
import { AccessibilityInfo, Animated, Easing, StyleSheet, View, type LayoutChangeEvent } from 'react-native'
import Svg, { Circle, Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg'
import type { Theme } from '../../../shared/theme/colors'

type Props = { theme: Theme; welcome?: boolean; sunrise?: boolean }
const AnimatedCircle = Animated.createAnimatedComponent(Circle)

export function Landscape({ theme, welcome = false, sunrise = false }: Props) {
  const [size, setSize] = useState({ width: 0, height: 0 })
  const [reduceMotion, setReduceMotion] = useState(true)
  const glow = useRef(new Animated.Value(0)).current
  useEffect(() => {
    if (!welcome) return
    let mounted = true
    let changed = false
    const subscription = AccessibilityInfo.addEventListener('reduceMotionChanged', enabled => {
      changed = true
      setReduceMotion(enabled)
    })
    AccessibilityInfo.isReduceMotionEnabled().then(enabled => {
      if (mounted && !changed) setReduceMotion(enabled)
    }).catch(() => {})
    return () => { mounted = false; subscription.remove() }
  }, [welcome])
  useEffect(() => {
    if (!welcome || reduceMotion) {
      glow.setValue(0)
      return
    }
    const animation = Animated.loop(Animated.sequence([
      Animated.timing(glow, { toValue: 1, duration: 3500, easing: Easing.inOut(Easing.sin), useNativeDriver: false, isInteraction: false }),
      Animated.timing(glow, { toValue: 0, duration: 3500, easing: Easing.inOut(Easing.sin), useNativeDriver: false, isInteraction: false }),
    ]))
    animation.start()
    return () => { animation.stop(); glow.setValue(0) }
  }, [glow, reduceMotion, welcome])
  const onLayout = ({ nativeEvent: { layout } }: LayoutChangeEvent) => {
    setSize(current => current.width === layout.width && current.height === layout.height
      ? current : { width: layout.width, height: layout.height })
  }
  const { width: w, height: h } = size
  const cx = w * (welcome ? 0.5 : 0.79)
  const cy = h * (welcome ? 0.55 : sunrise ? 0.73 : 0.48)
  // All three circles share one radius in screen points so they stay round.
  const radius = Math.min(w * (welcome ? 0.16 : 0.085), h * (welcome ? 0.15 : 0.14))
  const y = (fraction: number) => h * fraction
  const x = (fraction: number) => w * fraction

  return <View pointerEvents="none" onLayout={onLayout} style={StyleSheet.absoluteFill}>
    {w > 0 && h > 0 && <Svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <Defs><LinearGradient id="landscape-sky" x1="0" y1="0" x2="0" y2="1"><Stop offset="0" stopColor={theme.skyTop}/><Stop offset="1" stopColor={sunrise ? '#F8C092' : theme.skyBottom}/></LinearGradient></Defs>
      <Rect width={w} height={h} fill="url(#landscape-sky)"/>
      {welcome ? <>
        <AnimatedCircle cx={cx} cy={cy} r={glow.interpolate({ inputRange: [0, 1], outputRange: [radius * 2.2, radius * 2.7] })} fill={theme.halo} opacity={0.14}/>
        <AnimatedCircle cx={cx} cy={cy} r={glow.interpolate({ inputRange: [0, 1], outputRange: [radius * 1.45, radius * 1.78] })} fill={theme.halo} opacity={0.22}/>
      </> : <>
        <Circle cx={cx} cy={cy} r={radius * 2.4} fill={theme.halo} opacity={0.10}/>
        <Circle cx={cx} cy={cy} r={radius * 1.6} fill={theme.halo} opacity={0.18}/>
      </>}
      <Circle cx={cx} cy={cy} r={radius} fill={theme.sun}/>
      <Path d={`M0 ${y(0.78)} C${x(0.19)} ${y(0.69)} ${x(0.38)} ${y(0.70)} ${x(0.60)} ${y(0.77)} C${x(0.80)} ${y(0.83)} ${x(0.89)} ${y(0.73)} ${w} ${y(0.75)} L${w} ${h} L0 ${h}Z`} fill={theme.ridgeBack}/>
      <Path d={`M0 ${y(0.86)} C${x(0.22)} ${y(0.75)} ${x(0.42)} ${y(0.79)} ${x(0.65)} ${y(0.83)} C${x(0.83)} ${y(0.87)} ${x(0.92)} ${y(0.78)} ${w} ${y(0.82)} L${w} ${h} L0 ${h}Z`} fill={theme.ridgeMid}/>
      <Path d={`M0 ${y(0.96)} C${x(0.25)} ${y(0.88)} ${x(0.47)} ${y(0.92)} ${x(0.70)} ${y(0.92)} C${x(0.87)} ${y(0.91)} ${x(0.95)} ${y(0.88)} ${w} ${y(0.90)} L${w} ${h} L0 ${h}Z`} fill={welcome ? theme.welcomeBottom : theme.ridgeFront}/>
    </Svg>}
  </View>
}
