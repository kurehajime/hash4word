import { expect, it, test } from 'vitest'
import { Field } from '../src/models/Field'
import word_japanese2048 from '../src/assets/japanese2048.json'
import { Random } from '../src/models/Random'
import { describe } from 'node:test'
test('問題を生成', () => {
    const random = new Random(64)
    const runes_hiragana = 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんがぎくげこざじずぜぞだぢづでどばびぶべぼぱぴぷぺぽっぁぃぅぇぉ'.split('')
    const seed = Field["pick4word"](runes_hiragana, word_japanese2048, 3000, 3.6, random)
    expect(seed).toEqual({
        word_top: 'かいてん',
        word_right: 'ていけい',
        word_bottom: 'うけつけ',
        word_left: 'かんけい',
        rune_left_top: 'か',
        rune_right_top: 'て',
        rune_right_bottom: 'け',
        rune_left_bottom: 'け'
    })
})

test('マップを生成', () => {
    const random = new Random(64)
    const runes_hiragana = 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんがぎくげこざじずぜぞだぢづでどばびぶべぼぱぴぷぺぽっぁぃぅぇぉ'.split('')
    const field = Field.createField(runes_hiragana, word_japanese2048, 4, random)
    expect(field).toEqual({
        seed: {
            word_top: 'かいてん',
            word_right: 'ていけい',
            word_bottom: 'うけつけ',
            word_left: 'かんけい',
            rune_left_top: 'か',
            rune_right_top: 'て',
            rune_right_bottom: 'け',
            rune_left_bottom: 'け'
        },
        turn: 0,
        cells: [
            { Rune: '', x: 3, y: 7, enabled: true, fixed: false },
            { Rune: 'け', x: 5, y: 5, enabled: true, fixed: true },
            { Rune: 'つ', x: 4, y: 5, enabled: true, fixed: false },
            { Rune: '', x: 6, y: 4, enabled: false, fixed: false },
            { Rune: '', x: 6, y: 2, enabled: false, fixed: false },
            { Rune: '', x: 2, y: 5, enabled: true, fixed: false },
            { Rune: '', x: 8, y: 7, enabled: false, fixed: false },
            { Rune: '', x: 4, y: 2, enabled: false, fixed: false },
            { Rune: '', x: 4, y: 4, enabled: false, fixed: false },
            { Rune: '', x: 5, y: 8, enabled: true, fixed: false },
            { Rune: '', x: 1, y: 8, enabled: false, fixed: false },
            { Rune: '', x: 1, y: 6, enabled: false, fixed: false },
            { Rune: '', x: 4, y: 1, enabled: false, fixed: false },
            { Rune: '', x: 1, y: 4, enabled: false, fixed: false },
            { Rune: '', x: 0, y: 3, enabled: true, fixed: false },
            { Rune: '', x: 1, y: 5, enabled: true, fixed: false },
            { Rune: 'て', x: 5, y: 3, enabled: true, fixed: true },
            { Rune: '', x: 3, y: 8, enabled: true, fixed: false },
            { Rune: '', x: 8, y: 3, enabled: true, fixed: false },
            { Rune: '', x: 6, y: 5, enabled: true, fixed: false },
            { Rune: '', x: 0, y: 8, enabled: false, fixed: false },
            { Rune: '', x: 7, y: 6, enabled: false, fixed: false },
            { Rune: 'い', x: 4, y: 3, enabled: true, fixed: false },
            { Rune: '', x: 7, y: 3, enabled: true, fixed: false },
            { Rune: 'う', x: 3, y: 4, enabled: true, fixed: false },
            { Rune: '', x: 7, y: 5, enabled: true, fixed: false },
            { Rune: 'い', x: 5, y: 4, enabled: true, fixed: false },
            { Rune: '', x: 4, y: 7, enabled: false, fixed: false },
            { Rune: '', x: 6, y: 7, enabled: false, fixed: false },
            { Rune: '', x: 8, y: 4, enabled: false, fixed: false },
            { Rune: '', x: 2, y: 0, enabled: false, fixed: false },
            { Rune: '', x: 8, y: 0, enabled: false, fixed: false },
            { Rune: 'け', x: 3, y: 5, enabled: true, fixed: true },
            { Rune: '', x: 5, y: 1, enabled: true, fixed: false },
            { Rune: '', x: 7, y: 0, enabled: false, fixed: false },
            { Rune: '', x: 0, y: 5, enabled: true, fixed: false },
            { Rune: '', x: 2, y: 4, enabled: false, fixed: false },
            { Rune: '', x: 0, y: 6, enabled: false, fixed: false },
            { Rune: '', x: 6, y: 1, enabled: false, fixed: false },
            { Rune: '', x: 4, y: 6, enabled: false, fixed: false },
            { Rune: '', x: 5, y: 7, enabled: true, fixed: false },
            { Rune: '', x: 7, y: 7, enabled: false, fixed: false },
            { Rune: '', x: 7, y: 4, enabled: false, fixed: false },
            { Rune: '', x: 8, y: 5, enabled: true, fixed: false },
            { Rune: '', x: 1, y: 0, enabled: false, fixed: false },
            { Rune: '', x: 2, y: 6, enabled: false, fixed: false },
            { Rune: 'い', x: 3, y: 6, enabled: true, fixed: false },
            { Rune: '', x: 8, y: 8, enabled: false, fixed: false },
            { Rune: '', x: 5, y: 0, enabled: true, fixed: false },
            { Rune: '', x: 8, y: 6, enabled: false, fixed: false },
            { Rune: 'い', x: 5, y: 2, enabled: true, fixed: false },
            { Rune: '', x: 2, y: 2, enabled: false, fixed: false },
            { Rune: '', x: 7, y: 8, enabled: false, fixed: false },
            { Rune: 'ん', x: 5, y: 6, enabled: true, fixed: false },
            { Rune: '', x: 0, y: 2, enabled: false, fixed: false },
            { Rune: '', x: 6, y: 6, enabled: false, fixed: false },
            { Rune: '', x: 4, y: 0, enabled: false, fixed: false },
            { Rune: '', x: 2, y: 8, enabled: false, fixed: false },
            { Rune: '', x: 1, y: 1, enabled: false, fixed: false },
            { Rune: '', x: 1, y: 7, enabled: false, fixed: false },
            { Rune: '', x: 0, y: 7, enabled: false, fixed: false },
            { Rune: '', x: 1, y: 3, enabled: true, fixed: false },
            { Rune: '', x: 2, y: 1, enabled: false, fixed: false },
            { Rune: '', x: 4, y: 8, enabled: false, fixed: false },
            { Rune: '', x: 2, y: 7, enabled: false, fixed: false },
            { Rune: '', x: 6, y: 0, enabled: false, fixed: false },
            { Rune: 'か', x: 3, y: 3, enabled: true, fixed: true },
            { Rune: '', x: 0, y: 0, enabled: false, fixed: false },
            { Rune: '', x: 8, y: 1, enabled: false, fixed: false },
            { Rune: '', x: 0, y: 1, enabled: false, fixed: false },
            { Rune: '', x: 3, y: 1, enabled: true, fixed: false },
            { Rune: '', x: 6, y: 3, enabled: true, fixed: false },
            { Rune: '', x: 7, y: 2, enabled: false, fixed: false },
            { Rune: '', x: 0, y: 4, enabled: false, fixed: false },
            { Rune: '', x: 7, y: 1, enabled: false, fixed: false },
            { Rune: '', x: 6, y: 8, enabled: false, fixed: false },
            { Rune: '', x: 8, y: 2, enabled: false, fixed: false },
            { Rune: '', x: 2, y: 3, enabled: true, fixed: false },
            { Rune: '', x: 1, y: 2, enabled: false, fixed: false },
            { Rune: '', x: 3, y: 0, enabled: true, fixed: false },
            { Rune: 'ん', x: 3, y: 2, enabled: true, fixed: false }
        ]
    })
})

test('答え合わせ', () => {
    it('正解', () => {
        const random = new Random(64)
        const runes_hiragana = 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんがぎくげこざじずぜぞだぢづでどばびぶべぼぱぴぷぺぽっぁぃぅぇぉ'.split('')
        const seed = Field["pick4word"](runes_hiragana, word_japanese2048, 3000, 3.6, random)
        const result = seed ? Field["validWord"](seed, "かいてん", "ていけい", "うけつけ", "かんけい") : false
        expect(result).toEqual(true)
    })

    it('不正解', () => {
        const random = new Random(64)
        const runes_hiragana = 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんがぎくげこざじずぜぞだぢづでどばびぶべぼぱぴぷぺぽっぁぃぅぇぉ'.split('')
        const seed = Field["pick4word"](runes_hiragana, word_japanese2048, 3000, 3.6, random)
        const result = seed ? Field["validWord"](seed, "かいてん", "ていけい", "うけつけ", "かいけん") : true
        expect(result).toEqual(false)
    })
})
