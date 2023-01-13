import { expect, it, test } from 'vitest'
import { Field } from '../src/models/Field'
import word_japanese2048 from '../src/assets/japanese2048.json'
import { Random } from '../src/models/Random'
test('問題を生成', () => {
    const random = new Random(64)
    const runes_hiragana = 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんがぎくげこざじずぜぞだぢづでどばびぶべぼぱぴぷぺぽっぁぃぅぇぉ'.split('')
    const seed = Field["pick4word"](runes_hiragana, word_japanese2048, 3000, 3.6, random)
    expect(seed).toEqual({
        rune_left_bottom: "し",
        rune_left_top: "け",
        rune_right_bottom: "も",
        rune_right_top: "し",
        word_bottom: "しつもん",
        word_left: "けわしい",
        word_right: "しつもん",
        word_top: "けわしい",
    })
})

test('マップを生成', () => {
    const random = new Random(64)
    const runes_hiragana = 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんがぎくげこざじずぜぞだぢづでどばびぶべぼぱぴぷぺぽっぁぃぅぇぉ'.split('')
    const field = Field.createField(runes_hiragana, word_japanese2048, 4, random)
    console.log(field)


    expect(field).toEqual({
        seed: {
            word_top: 'けわしい',
            word_right: 'しつもん',
            word_bottom: 'しつもん',
            word_left: 'けわしい',
            rune_left_top: 'け',
            rune_right_top: 'し',
            rune_right_bottom: 'も',
            rune_left_bottom: 'し'
        },
        turn: 0,
        cells: [
            { Rune: 'い', x: 5, y: 4, enabled: true, fixed: false },
            { Rune: '', x: 6, y: 1, enabled: false, fixed: false },
            { Rune: '', x: 8, y: 7, enabled: false, fixed: false },
            { Rune: '', x: 3, y: 0, enabled: true, fixed: false },
            { Rune: '', x: 1, y: 2, enabled: false, fixed: false },
            { Rune: '', x: 3, y: 8, enabled: true, fixed: false },
            { Rune: '', x: 7, y: 7, enabled: false, fixed: false },
            { Rune: '', x: 2, y: 4, enabled: false, fixed: false },
            { Rune: 'つ', x: 3, y: 2, enabled: true, fixed: false },
            { Rune: '', x: 5, y: 7, enabled: true, fixed: false },
            { Rune: 'し', x: 5, y: 3, enabled: true, fixed: true },
            { Rune: '', x: 2, y: 8, enabled: false, fixed: false },
            { Rune: 'け', x: 3, y: 3, enabled: true, fixed: true },
            { Rune: '', x: 1, y: 7, enabled: false, fixed: false },
            { Rune: '', x: 8, y: 8, enabled: false, fixed: false },
            { Rune: 'ん', x: 5, y: 2, enabled: true, fixed: false },
            { Rune: 'も', x: 5, y: 5, enabled: true, fixed: true },
            { Rune: '', x: 4, y: 4, enabled: false, fixed: false },
            { Rune: '', x: 7, y: 8, enabled: false, fixed: false },
            { Rune: '', x: 6, y: 5, enabled: true, fixed: false },
            { Rune: '', x: 2, y: 2, enabled: false, fixed: false },
            { Rune: 'わ', x: 3, y: 4, enabled: true, fixed: false },
            { Rune: '', x: 0, y: 8, enabled: false, fixed: false },
            { Rune: '', x: 1, y: 6, enabled: false, fixed: false },
            { Rune: '', x: 6, y: 7, enabled: false, fixed: false },
            { Rune: '', x: 0, y: 2, enabled: false, fixed: false },
            { Rune: '', x: 2, y: 1, enabled: false, fixed: false },
            { Rune: '', x: 6, y: 8, enabled: false, fixed: false },
            { Rune: '', x: 4, y: 0, enabled: false, fixed: false },
            { Rune: '', x: 0, y: 1, enabled: false, fixed: false },
            { Rune: 'わ', x: 3, y: 6, enabled: true, fixed: false },
            { Rune: '', x: 6, y: 4, enabled: false, fixed: false },
            { Rune: '', x: 5, y: 1, enabled: true, fixed: false },
            { Rune: '', x: 0, y: 3, enabled: true, fixed: false },
            { Rune: '', x: 6, y: 0, enabled: false, fixed: false },
            { Rune: '', x: 8, y: 5, enabled: true, fixed: false },
            { Rune: '', x: 2, y: 5, enabled: true, fixed: false },
            { Rune: '', x: 2, y: 3, enabled: true, fixed: false },
            { Rune: '', x: 2, y: 7, enabled: false, fixed: false },
            { Rune: '', x: 8, y: 6, enabled: false, fixed: false },
            { Rune: '', x: 7, y: 1, enabled: false, fixed: false },
            { Rune: 'い', x: 4, y: 5, enabled: true, fixed: false },
            { Rune: '', x: 7, y: 4, enabled: false, fixed: false },
            { Rune: '', x: 8, y: 2, enabled: false, fixed: false },
            { Rune: '', x: 4, y: 1, enabled: false, fixed: false },
            { Rune: '', x: 8, y: 4, enabled: false, fixed: false },
            { Rune: '', x: 4, y: 7, enabled: false, fixed: false },
            { Rune: '', x: 2, y: 6, enabled: false, fixed: false },
            { Rune: '', x: 5, y: 0, enabled: true, fixed: false },
            { Rune: '', x: 1, y: 1, enabled: false, fixed: false },
            { Rune: '', x: 5, y: 8, enabled: true, fixed: false },
            { Rune: '', x: 7, y: 0, enabled: false, fixed: false },
            { Rune: '', x: 4, y: 6, enabled: false, fixed: false },
            { Rune: '', x: 4, y: 2, enabled: false, fixed: false },
            { Rune: '', x: 8, y: 3, enabled: true, fixed: false },
            { Rune: '', x: 3, y: 7, enabled: true, fixed: false },
            { Rune: '', x: 7, y: 5, enabled: true, fixed: false },
            { Rune: '', x: 0, y: 0, enabled: false, fixed: false },
            { Rune: '', x: 2, y: 0, enabled: false, fixed: false },
            { Rune: '', x: 7, y: 3, enabled: true, fixed: false },
            { Rune: '', x: 7, y: 2, enabled: false, fixed: false },
            { Rune: '', x: 4, y: 8, enabled: false, fixed: false },
            { Rune: '', x: 0, y: 7, enabled: false, fixed: false },
            { Rune: '', x: 8, y: 0, enabled: false, fixed: false },
            { Rune: 'ん', x: 4, y: 3, enabled: true, fixed: false },
            { Rune: '', x: 3, y: 1, enabled: true, fixed: false },
            { Rune: '', x: 7, y: 6, enabled: false, fixed: false },
            { Rune: '', x: 1, y: 4, enabled: false, fixed: false },
            { Rune: '', x: 1, y: 0, enabled: false, fixed: false },
            { Rune: '', x: 0, y: 6, enabled: false, fixed: false },
            { Rune: '', x: 0, y: 4, enabled: false, fixed: false },
            { Rune: '', x: 8, y: 1, enabled: false, fixed: false },
            { Rune: '', x: 6, y: 2, enabled: false, fixed: false },
            { Rune: '', x: 1, y: 5, enabled: true, fixed: false },
            { Rune: '', x: 1, y: 8, enabled: false, fixed: false },
            { Rune: 'し', x: 3, y: 5, enabled: true, fixed: true },
            { Rune: '', x: 6, y: 3, enabled: true, fixed: false },
            { Rune: '', x: 1, y: 3, enabled: true, fixed: false },
            { Rune: 'つ', x: 5, y: 6, enabled: true, fixed: false },
            { Rune: '', x: 6, y: 6, enabled: false, fixed: false },
            { Rune: '', x: 0, y: 5, enabled: true, fixed: false }
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
