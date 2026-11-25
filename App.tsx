import React, { useCallback, useEffect, useState } from 'react'
import { BackHandler, Text, useColorScheme } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { AuthScreen } from './src/features/auth/screens/AuthScreen'
import { WelcomeScreen } from './src/features/auth/screens/WelcomeScreen'
import { HomeScreen } from './src/features/home/screens/HomeScreen'
import { NewPlanScreen } from './src/features/plans/screens/NewPlanScreen'
import { RoutineScreen } from './src/features/routine/screens/RoutineScreen'
import { NotificationsScreen } from './src/features/notifications/screens/NotificationsScreen'
import { ProfileScreen } from './src/features/profile/screens/ProfileScreen'
import { EditProfileScreen } from './src/features/profile/screens/EditProfileScreen'
import { AboutScreen } from './src/features/profile/screens/AboutScreen'
import { SettingsScreen } from './src/features/settings/screens/SettingsScreen'
import { FeedbackScreen } from './src/features/feedback/screens/FeedbackScreen'
import { IntroScreen } from './src/features/onboarding/screens/IntroScreen'
import { QuestionsScreen } from './src/features/onboarding/screens/QuestionsScreen'
import { GuidedPlanScreen } from './src/features/onboarding/screens/GuidedPlanScreen'
import { BottomNavigation, Header, Page, ui } from './src/shared/components/AppUI'
import { colors } from './src/shared/theme/colors'
import { appThemes, type Appearance } from './src/shared/theme/appTheme'
import type { Plan, Profile, Route, Tab } from './src/shared/models/app'

type Screen = 'welcome' | 'login' | 'register' | 'app'
export default function App() {
  const [screen, setScreen] = useState<Screen>('welcome')
  const [routes, setRoutes] = useState<Route[]>(['home'])
  const [appearance, setAppearance] = useState<Appearance>('light')
  const system = useColorScheme()
  const theme = appThemes[appearance === 'system' ? system === 'dark' ? 'dark' : 'light' : appearance]
  const [plans, setPlans] = useState<Plan[]>([])
  const [profile, setProfile] = useState<Profile>({ name: 'Yassine', email: 'yassine@voorbeeld.com' })
  const [notifications, setNotifications] = useState(true)
  const [read, setRead] = useState<string[]>([])
  const [selectedApps, setSelectedApps] = useState(['Instagram', 'TikTok', 'YouTube'])
  const [answers, setAnswers] = useState<number[]>([])
  const [questionnaireCompleted, setQuestionnaireCompleted] = useState(false)
  const [guidedPlanFinished, setGuidedPlanFinished] = useState(false)
  const [startedAt] = useState(() => Date.now())
  const [message, setMessage] = useState('')
  const route = routes[routes.length - 1]
  const navigate = (next: Route) => { setMessage(''); setRoutes(current => [...current, next]) }
  const selectTab = (tab: Tab) => {
    setMessage('')
    if (tab === 'routine' && !guidedPlanFinished) {
      setRoutes([questionnaireCompleted ? 'guidedPlan' : 'intro'])
      return
    }
    setRoutes([tab])
  }
  const back = useCallback(() => {
    if (screen !== 'app') { setScreen('welcome'); return }
    if (routes.length > 1) setRoutes(current => current.slice(0, -1))
    else if (route !== 'home') setRoutes(['home'])
    else setScreen('welcome')
  }, [screen, routes.length, route])
  useEffect(() => {
    const listener = BackHandler.addEventListener('hardwareBackPress', () => {
      if (screen === 'welcome') return false
      back()
      return true
    })
    return () => listener.remove()
  }, [screen, back])

  let content: React.ReactNode
  if (screen === 'welcome') content = <WelcomeScreen theme={colors.light} onRegister={() => setScreen('register')} onLogin={() => setScreen('login')} onGuest={() => { setRoutes(['home']); setScreen('app') }}/>
  else if (screen === 'login' || screen === 'register') content = <AuthScreen key={screen} mode={screen} theme={colors.light} onBack={back} onSwitch={() => setScreen(screen === 'login' ? 'register' : 'login')}/>
  else switch (route) {
    case 'home': content = <HomeScreen theme={theme} plans={plans} message={message} onNewPlan={() => navigate('newPlan')} onRemovePlan={id => setPlans(current => current.filter(plan => plan.id !== id))} onTab={selectTab}/>; break
    case 'routine': content = <RoutineScreen theme={theme} plans={plans} startedAt={startedAt} onTab={selectTab} onNewPlan={() => navigate('newPlan')}/>; break
    case 'notifications': content = notifications ? <NotificationsScreen theme={theme} onTab={selectTab} read={read} onRead={setRead}/> : <Page theme={theme} header={<Header theme={theme} title="Meldingen" eyebrow="Notificatie"/>} bottom={<BottomNavigation theme={theme} selected="notifications" onSelect={selectTab}/>}><Text style={[ui.body, { color: theme.muted }]}>Meldingen staan uit. Je kunt ze aanzetten via Profiel → Instellingen.</Text></Page>; break
    case 'profile': content = <ProfileScreen theme={theme} profile={profile} onTab={selectTab} onNavigate={navigate}/>; break
    case 'newPlan': content = <NewPlanScreen theme={theme} initialApps={selectedApps} onBack={back} onSave={draft => { const now = Date.now(); setPlans(current => [...current, { ...draft, id: `${now}-${current.length}`, createdAt: now }]); setRoutes(['home']) }}/>; break
    case 'settings': content = <SettingsScreen theme={theme} appearance={appearance} onAppearance={setAppearance} notifications={notifications} onNotifications={setNotifications} selectedApps={selectedApps} onApps={setSelectedApps} onBack={back} onExit={() => { setRoutes(['home']); setScreen('welcome') }}/>; break
    case 'editProfile': content = <EditProfileScreen theme={theme} profile={profile} onBack={back} onSave={value => { setProfile(value); back() }}/>; break
    case 'about': content = <AboutScreen theme={theme} onBack={back}/>; break
    case 'feedback': content = <FeedbackScreen theme={theme} onBack={back}/>; break
    case 'intro': content = <IntroScreen theme={theme} onBack={back} onLater={() => selectTab('home')} onNext={() => navigate('questions')}/>; break
    case 'questions': content = <QuestionsScreen theme={theme} initialAnswers={answers} onBack={back} onComplete={value => { setAnswers(value); setQuestionnaireCompleted(true); setRoutes(['guidedPlan']) }}/>; break
    case 'guidedPlan': content = <GuidedPlanScreen theme={theme} onFinish={() => { setGuidedPlanFinished(true); setRoutes(['routine']) }}/>; break
  }
  return <SafeAreaProvider>{content}</SafeAreaProvider>
}
