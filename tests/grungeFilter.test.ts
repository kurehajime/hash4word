import { test, expect } from 'vitest'
import { grungeFilterCount, grungeFilterIndex, grungeTextFilterUrl } from '../src/utils/grungeFilter'

test('grunge filter is stable for the same character', () => {
    expect(grungeFilterIndex('あ')).toBe(grungeFilterIndex('あ'))
    expect(grungeTextFilterUrl('A')).toBe(grungeTextFilterUrl('A'))
})

test('grunge filter index stays in range', () => {
    for (const rune of ['あ', 'ん', 'A', 'Z', '4']) {
        const index = grungeFilterIndex(rune)
        expect(index).toBeGreaterThanOrEqual(0)
        expect(index).toBeLessThan(grungeFilterCount)
    }
})
