import { Cell } from "./Cell";
import { InputCell } from "./InputCell";
import { Point } from "./Point";
import { Seed } from "./Seed";

export class InputField {
    private cells: InputCell[]
    public get Cells(): Readonly<InputCell[]> { return Object.freeze(this.cells.map(cell => Object.freeze(cell))) }

    constructor(_cells: Cell[]) {
        this.cells = _cells.map(cell => { return { ...cell } })
    }

    public static createInputFieldbySeed(seed: Seed): InputField {
        // 真ん中は固定で3分割
        const reg_top = '(.{0,3})(' + seed.rune_left_top + '.'.repeat(1) + seed.rune_right_top + ')(.{0,3})';
        const reg_right = '(.{0,3})(' + seed.rune_right_top + '.'.repeat(1) + seed.rune_right_bottom + ')(.{0,3})';
        const reg_bottom = '(.{0,3})(' + seed.rune_left_bottom + '.'.repeat(1) + seed.rune_right_bottom + ')(.{0,3})';
        const reg_left = '(.{0,3})(' + seed.rune_left_top + '.'.repeat(1) + seed.rune_left_bottom + ')(.{0,3})';
        const top = seed.word_top.match(reg_top);
        const right = seed.word_right.match(reg_right);
        const bottom = seed.word_bottom.match(reg_bottom);
        const left = seed.word_left.match(reg_left);
        const cells = new Array(9 * 9).fill(null).map((_, i) => {
            const x: number = i % 9
            const y = Math.floor(i / 9)
            return {
                Rune: '',
                x: x,
                y: y,
                enabled: (x == 3 || x == 5 || y == 3 || y == 5),
                fixed: (x == 3 && y == 3) || (x == 5 && y == 3) || (x == 3 && y == 5) || (x == 5 && y == 5),
            } as InputCell
        });
        console.log(top, right, bottom, left)
        if (top && right && bottom && left) {
            // 真ん中を動かさず9文字になるように調整
            const top_str = top[1].padStart(3, " ") + top[2] + top[3].padEnd(3, " ")
            const right_str = right[1].padStart(3, " ") + right[2] + right[3].padEnd(3, " ")
            const bottom_str = bottom[1].padStart(3, " ") + bottom[2] + bottom[3].padEnd(3, " ")
            const left_str = left[1].padStart(3, " ") + left[2] + left[3].padEnd(3, " ")
            for (let i = 0; i < 9; i++) {// top
                if (top_str[i].trim() != "") {
                    InputField.setRune(cells, i, 3, top_str[i])
                }
            }
            for (let i = 0; i < 9; i++) {// right
                if (right_str[i].trim() != "") {
                    InputField.setRune(cells, 5, i, right_str[i])
                }
            }
            for (let i = 0; i < 9; i++) {// bottom
                if (bottom_str[i].trim() != "") {
                    InputField.setRune(cells, i, 5, bottom_str[i])
                }
            }
            for (let i = 0; i < 9; i++) {// left
                if (left_str[i].trim() != "") {
                    InputField.setRune(cells, 3, i, left_str[i])
                }
            }
        }
        return new InputField(cells)
    }

    public get size(): number {
        return Math.sqrt(this.cells.length);
    }

    public clone(): InputField {
        return new InputField(this.cells.map(cell => { return { ...cell } }))
    }

    public set(point: Point, rune: string): InputField {
        const cells = this.Cells.map(cell => { return { ...cell } })
        InputField.setRune(cells, point.x, point.y, rune)
        return new InputField(cells)
    }

    public getCell(point: Point): Cell {
        return this.cells.filter(cell => cell.x == point.x && cell.y == point.y)[0]
    }

    private static setRune(cells: InputCell[], x: number, y: number, rune: string) {
        return cells.filter(cell => cell.x == x && cell.y == y)[0].Rune = rune
    }
}