import { expect, test } from 'vitest'
import { Message } from '../src/models/Message'

test('message encode does not expose raw text', () => {
    const message = 'クリアおめでとう!'
    const encoded = Message.encode(message)

    expect(encoded).not.toContain(message)
    expect(encoded).not.toContain('クリア')
})

test('message encode returns URL-safe text', () => {
    const encoded = Message.encode('クリアおめでとう! emoji 🎉')

    expect(encoded).toMatch(/^[A-Za-z0-9_-]*$/)
})

test.each([
    '',
    'CLEAR!',
    'クリアおめでとう!',
    'ひらがな カタカナ 漢字 ABC xyz 123',
    '改行\nタブ\t記号!? #hash4word',
    'emoji 🎉👍🏽✨',
])('message encode/decode round trips UTF-8 text: %s', (message) => {
    expect(Message.decode(Message.encode(message))).toBe(message)
})

test('message decode returns empty string for invalid payload', () => {
    expect(Message.decode('not valid base64url!')).toBe('')
})
