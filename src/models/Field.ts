import { Cell } from "./Cell"
import { Seed } from "./Seed";

export class Field {
    private cells: Cell[]
    private seed: Seed | null = null;
    public get Cells(): Readonly<Cell[]> { return Object.freeze(this.cells.map(cell => Object.freeze(cell))) }
    public get size(): number {
        return Math.sqrt(this.cells.length);
    }
    constructor(Cells: Cell[], seed: Seed | null) {
        this.cells = Cells.map(cell => { return { ...cell } })
        this.seed = seed;
    }

    public static createField(runes: string[], words: string[]): Field {
        const cells = new Array(9 * 9).fill(null).map((_, i) => {
            const x = i % 9
            const y = Math.floor(i / 9)
            return {
                Rune: '',
                x: x,
                y: y,
                enabled: (x == 3 || x == 5 || y == 3 || y == 5)
            } as Cell
        });
        const sort = [30, 31, 32, 39, 41, 48, 49, 50, 21, 59, 23, 57, 33, 47, 51, 29, 12, 68, 14, 66, 34, 46, 52, 28, 3, 77, 5, 75, 35, 45, 53, 27];
        const seed = Field.pick4word(runes, words, 3000)
        if (seed) {
            const all = seed.word_top + seed.word_right + seed.word_bottom + seed.word_left
            const runes = Field.shuffle<string>(all.split(''))
            for (let i = 0; i < runes.length; i++) {
                cells[sort[i]].Rune = runes[i]
            }
        }
        return new Field(cells, seed)
    }

    private static shuffle<T>(arr: T[]): T[] {
        for (let i = arr.length - 1; i >= 0; i--) {
            const r = Math.floor(Math.random() * (i + 1))
            const tmp = arr[i]
            arr[i] = arr[r]
            arr[r] = tmp
        }
        return arr
    }

    private static pick4word(runes: string[], words: string[], tryCount: number): Seed | null {
        for (let i = 0; i < tryCount; i++) {
            const rune1 = runes[Math.floor(Math.random() * runes.length)];
            const rune2 = runes[Math.floor(Math.random() * runes.length)];
            const rune3 = runes[Math.floor(Math.random() * runes.length)];
            const rune4 = runes[Math.floor(Math.random() * runes.length)];

            const regs = Field.crossToRegex(rune1, rune2, rune3, rune4, 1, 1)

            const results_0 = words.filter((word) => { return regs[0].test(word) })
            const results_1 = words.filter((word) => { return regs[1].test(word) })
            const results_2 = words.filter((word) => { return regs[2].test(word) })
            const results_3 = words.filter((word) => { return regs[3].test(word) })

            if (results_0.length > 0 && results_1.length > 0 && results_2.length > 0 && results_3.length > 0) {
                const result_0 = results_0[Math.floor(Math.random() * results_0.length)];
                const result_1 = results_1[Math.floor(Math.random() * results_1.length)];
                const result_2 = results_2[Math.floor(Math.random() * results_2.length)];
                const result_3 = results_3[Math.floor(Math.random() * results_3.length)];
                return {
                    word_top: result_0,
                    word_right: result_1,
                    word_bottom: result_2,
                    word_left: result_3,
                    rune_left_top: rune1,
                    rune_right_top: rune2,
                    rune_right_bottom: rune3,
                    rune_left_bottom: rune4,
                }
            }
        }
        return null;
    }

    private static crossToRegex(left_top: string,
        right_top: string,
        right_bottom: string,
        left_bottom: string,
        width: number,
        height: number): [RegExp, RegExp, RegExp, RegExp] {
        const ltrb = '.{0,3}' + left_top + '.'.repeat(width) + right_top + '.{0,3}';
        const rtrb = '.{0,3}' + right_top + '.'.repeat(height) + right_bottom + '.{0,3}';
        const lbrb = '.{0,3}' + left_bottom + '.'.repeat(width) + right_bottom + '.{0,3}';
        const ltlb = '.{0,3}' + left_top + '.'.repeat(height) + left_bottom + '.{0,3}';

        return [new RegExp(ltrb, 'u'), new RegExp(rtrb, 'u'), new RegExp(lbrb, 'u'), new RegExp(ltlb, 'u')];
    }

}