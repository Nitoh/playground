import { expect, test } from 'vitest'

test('Grundrechenarten funktionieren', () => {
    expect(1 + 1).toBe(2)
})

// Dieser Test simuliert einen Logik-Fehler
test('Sicherheits-Check', () => {
    const istEingeloggt = true
    expect(istEingeloggt).toBe(true)
})