import test from 'node:test'
import assert from 'node:assert/strict'
import { plansForDate, routineDate, validatePlan } from '../src/shared/models/app.ts'

const draft = { name: 'Avondrust', days: [1, 2, 3, 4, 5], start: '22:00', end: '06:00', apps: ['Instagram'], reminder: true }

test('een avondplan mag na middernacht eindigen', () => {
  assert.equal(validatePlan(draft), undefined)
})

test('lege namen, ontbrekende dagen en ongeldige tijden worden geweigerd', () => {
  for (const changes of [{ name: '  ' }, { days: [] }, { days: [7] }, { days: [1.5] }, { start: '24:00' }, { end: '06:60' }, { start: '6:00' }, { end: '22:00' }]) {
    assert.equal(typeof validatePlan({ ...draft, ...changes }), 'string')
  }
})

test('routinedagen volgen lokale kalenderdagen over een maandgrens', () => {
  const started = new Date(2026, 10, 30, 23, 45).getTime()
  const next = routineDate(started, 2)
  assert.equal(next.getDate(), 1)
  assert.equal(next.getMonth(), 11)
  assert.equal(next.getHours(), 0)
  assert.equal(new Date(started).getDate(), 30)
})

test('de routine toont alleen plannen op de gekozen weekdagen vanaf hun aanmaakdatum', () => {
  const monday = new Date(2026, 10, 23)
  const plans = [
    { ...draft, id: 'monday', days: [1], createdAt: new Date(2026, 10, 23, 16).getTime() },
    { ...draft, id: 'tuesday', days: [2], createdAt: new Date(2026, 10, 23, 16).getTime() },
    { ...draft, id: 'future', days: [1], createdAt: new Date(2026, 10, 30).getTime() },
  ]
  assert.deepEqual(plansForDate(plans, monday).map(plan => plan.id), ['monday'])
  assert.deepEqual(plansForDate(plans, new Date(2026, 10, 24)).map(plan => plan.id), ['tuesday'])
  assert.equal(plansForDate(plans, new Date(2026, 10, 22)).length, 0)
})
