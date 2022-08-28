import { decode, encode } from "universal-base64url";
export class Seed {
    word_top: string
    word_right: string
    word_bottom: string
    word_left: string
    rune_left_top: string
    rune_right_top: string
    rune_right_bottom: string
    rune_left_bottom: string

    constructor(word_top: string, word_right: string, word_bottom: string, word_left: string, rune_left_top: string, rune_right_top: string, rune_right_bottom: string, rune_left_bottom: string) {
        this.word_top = word_top
        this.word_right = word_right
        this.word_bottom = word_bottom
        this.word_left = word_left
        this.rune_left_top = rune_left_top
        this.rune_right_top = rune_right_top
        this.rune_right_bottom = rune_right_bottom
        this.rune_left_bottom = rune_left_bottom
    }

    public encode() {
        const arg = [this.word_top, this.word_right, this.word_bottom, this.word_left, this.rune_left_top, this.rune_right_top, this.rune_right_bottom, this.rune_left_bottom]
        return encode(arg.join(","));
    }
    static decode(str: string): Seed | null {
        try {
            const dec = decode(str);
            const arg = dec.split(",")
            if (arg.length === 8) {
                return new Seed(arg[0], arg[1], arg[2], arg[3], arg[4], arg[5], arg[6], arg[7])
            }
        } catch (error) {
            return null
        }
        return null
    }
}