import { Cell } from "./Cell"
import { Point } from "./Point";
import { Seed } from "./Seed";

export class Field {
    private cells: Cell[]
    private seed: Seed | null = null;
    public get Cells(): Readonly<Cell[]> { return Object.freeze(this.cells.map(cell => Object.freeze(cell))) }
    public get size(): number {
        return Math.sqrt(this.cells.length);
    }
    constructor(_cells: Cell[], seed: Seed | null) {
        this.cells = _cells.map(cell => { return { ...cell } })
        this.seed = seed;
    }

    public clone(): Field {
        return new Field(this.cells.map(cell => { return { ...cell } }), this.seed)
    }

    public swap(index1: Point, index2: Point): Field {
        const field = this.clone();
        const cell1 = field.getCell(index1);
        const cell2 = field.getCell(index2);
        [cell1.x, cell2.x] = [cell2.x, cell1.x];
        [cell1.y, cell2.y] = [cell2.y, cell1.y];
        return field
    }

    public getCell(point: Point): Cell {
        return this.cells.filter(cell => cell.x == point.x && cell.y == point.y)[0]
    }

    public calc_top() {
        const word = this.cells.filter(cell => cell.y === 3).map(cell => cell.Rune).join('');
        return this.calc(word)
    }
    public calc_right() {
        const word = this.cells.filter(cell => cell.x === 5).map(cell => cell.Rune).join('');
        return this.calc(word)
    }
    public calc_bottom() {
        const word = this.cells.filter(cell => cell.y === 5).map(cell => cell.Rune).join('');
        return this.calc(word)
    }
    public calc_left() {
        const word = this.cells.filter(cell => cell.x === 3).map(cell => cell.Rune).join('');
        return this.calc(word)
    }

    public static createField(runes: string[], words: string[], fixed = 0): Field {
        const cells = new Array(9 * 9).fill(null).map((_, i) => {
            const x: number = i % 9
            const y = Math.floor(i / 9)
            return {
                Rune: '',
                x: x,
                y: y,
                enabled: (x == 3 || x == 5 || y == 3 || y == 5),
                fixed: false
            } as Cell
        });
        const sort = [30, 50, 32, 48, 31, 39, 41, 49, 21, 59, 23, 57, 33, 47, 51, 29, 12, 68, 14, 66, 34, 46, 52, 28, 3, 77, 5, 75, 35, 45, 53, 27];
        const seed = Field.pick4word(runes, words, 3000)
        if (seed) {
            const all = (seed.word_top + seed.word_right + seed.word_bottom + seed.word_left).split('');
            // クロスするところ重複するので削除
            all.splice(all.indexOf(seed.rune_left_top, 1), 1)
            all.splice(all.indexOf(seed.rune_right_top, 1), 1)
            all.splice(all.indexOf(seed.rune_right_bottom, 1), 1)
            all.splice(all.indexOf(seed.rune_left_bottom, 1), 1)

            // セルを固定
            const crosses = [seed.rune_left_top, seed.rune_right_bottom, seed.rune_right_top, seed.rune_left_bottom];
            for (let i = 0; i < fixed; i++) {
                const cross = crosses[i]
                const index = sort.shift()

                all.splice(all.indexOf(cross), 1)
                if (cross && index) {
                    cells[index].Rune = cross
                    cells[index].fixed = true
                }
            }
            const runes = Field.shuffle<string>(all)
            for (let i = 0; i < runes.length; i++) {
                cells[sort[i]].Rune = runes[i]
            }
        }
        console.log(seed)
        return new Field(cells, seed)
    }

    public valid(): boolean {
        const word1 = this.cells.filter(cell => cell.y === 3).sort((a, b) => { return a.x - b.x }).map(cell => cell.Rune).join('');
        const word2 = this.cells.filter(cell => cell.y === 5).sort((a, b) => { return a.x - b.x }).map(cell => cell.Rune).join('');
        const word3 = this.cells.filter(cell => cell.x === 3).sort((a, b) => { return a.y - b.y }).map(cell => cell.Rune).join('');
        const word4 = this.cells.filter(cell => cell.x === 5).sort((a, b) => { return a.y - b.y }).map(cell => cell.Rune).join('');
        const words = [word1, word2, word3, word4]
        if (this.seed) {
            const results = [this.seed.word_top, this.seed.word_right, this.seed.word_bottom, this.seed.word_left]
            for (const result of results) {
                if (!words.includes(result)) {
                    return false
                }
            }
        } else {
            return false
        }
        return true
    }

    private calc(word: string): number {
        if (this.seed) {
            const top = Field.diff(word, this.seed.word_top);
            const right = Field.diff(word, this.seed.word_right);
            const bottom = Field.diff(word, this.seed.word_bottom);
            const left = Field.diff(word, this.seed.word_left);
            return Math.max(top, right, bottom, left)
        }
        return 0;
    }

    private static diff(_word1: string, _word2: string): number {
        let diff = 0;
        const word1 = _word1.split('');
        const word2 = _word2.split('');
        for (let i = 0; i < word1.length; i++) {
            if (word2.indexOf(word1[i]) !== -1) {
                diff++
                word2.splice(word2.indexOf(word1[i]), 1)
            }

        }
        return diff;
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

            const uniq = [results_0, results_1, results_2, results_3].length === new Set([results_0, results_1, results_2, results_3]).size;

            if (uniq && results_0.length > 0 && results_1.length > 0 && results_2.length > 0 && results_3.length > 0) {
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