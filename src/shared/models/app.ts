export type Tab = 'home' | 'routine' | 'notifications' | 'profile'
export type Route = Tab | 'intro' | 'questions' | 'guidedPlan' | 'settings' | 'newPlan' | 'about' | 'editProfile' | 'feedback'
export type Profile = { name: string; email: string }
export type Plan = {
  id: string
  name: string
  days: number[]
  start: string
  end: string
  apps: string[]
  reminder: boolean
  createdAt: number
}
export type PlanDraft = Omit<Plan, 'id' | 'createdAt'>
export const weekdays = ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za']
export const appChoices = ['Instagram', 'TikTok', 'YouTube', 'Snapchat', 'Facebook', 'Reddit', 'X']
export const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
export function validatePlan(plan: PlanDraft): string | undefined {
  if (!plan.name.trim()) return 'Geef je plan een naam.'
  if (!plan.days.length || plan.days.some(day => !Number.isInteger(day) || day < 0 || day > 6)) return 'Kies minstens één dag.'
  const time = /^([01]\d|2[0-3]):[0-5]\d$/
  if (!time.test(plan.start) || !time.test(plan.end)) return 'Gebruik een geldige tijd in het formaat uu:mm.'
  if (plan.start === plan.end) return 'De begin- en eindtijd mogen niet gelijk zijn.'
}
export function routineDate(startedAt: number, day: number): Date {
  const date = new Date(startedAt)
  date.setHours(0, 0, 0, 0)
  date.setDate(date.getDate() + day - 1)
  return date
}
export function plansForDate(plans: Plan[], date: Date): Plan[] {
  return plans.filter(plan => {
    const created = new Date(plan.createdAt)
    created.setHours(0, 0, 0, 0)
    return created <= date && plan.days.includes(date.getDay())
  })
}
