import { expect, test } from 'vitest'
import { languageFromHash, languageFromSearch, resolveLanguage } from '../src/i18n/language'

test.each([
    ['?lang=en', 'en'],
    ['?lang=ja', 'ja'],
    ['?lang=en-US', 'en'],
    ['?lang=ja-JP', 'ja'],
])('languageFromSearch reads supported lang parameter: %s', (search, expected) => {
    expect(languageFromSearch(search)).toBe(expected)
})

test('languageFromSearch ignores unsupported lang parameter', () => {
    expect(languageFromSearch('?lang=fr')).toBeNull()
})

test('languageFromHash reads lang parameter after hash route', () => {
    expect(languageFromHash('#/create?lang=en')).toBe('en')
})

test('resolveLanguage prefers URL lang over navigator language', () => {
    expect(resolveLanguage({ search: '?lang=en', hash: '' }, 'ja-JP')).toBe('en')
    expect(resolveLanguage({ search: '?lang=ja', hash: '' }, 'en-US')).toBe('ja')
})

test('resolveLanguage falls back to navigator language', () => {
    expect(resolveLanguage({ search: '', hash: '' }, 'ja-JP')).toBe('ja')
    expect(resolveLanguage({ search: '', hash: '' }, 'en-US')).toBe('en')
})
