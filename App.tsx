import React, { useEffect, useState } from 'react'
import { BackHandler } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { AuthScreen } from './src/features/auth/screens/AuthScreen'
import { WelcomeScreen } from './src/features/auth/screens/WelcomeScreen'
import { colors } from './src/shared/theme/colors'

type Screen = 'welcome' | 'login' | 'register'
export default function App() {
  const [screen, setScreen] = useState<Screen>('welcome')
  const theme = colors.light
  useEffect(() => {
    const listener = BackHandler.addEventListener('hardwareBackPress', () => {
      if (screen === 'welcome') return false
      setScreen('welcome')
      return true
    })
    return () => listener.remove()
  }, [screen])
  return <SafeAreaProvider>{screen === 'welcome'
    ? <WelcomeScreen theme={theme} onRegister={() => setScreen('register')} onLogin={() => setScreen('login')}/>
    : <AuthScreen key={screen} mode={screen} theme={theme} onBack={() => setScreen('welcome')} onSwitch={() => setScreen(screen === 'login' ? 'register' : 'login')}/>}</SafeAreaProvider>
}
