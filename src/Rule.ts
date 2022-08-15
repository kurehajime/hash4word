export class Rule {

    static pick4word(runes: string[], words: string[], tryCount: number): [string, string, string, string] {
        for (let i = 0; i < tryCount; i++) {
            const rune1 = runes[Math.floor(Math.random() * runes.length)];
            const rune2 = runes[Math.floor(Math.random() * runes.length)];
            const rune3 = runes[Math.floor(Math.random() * runes.length)];
            const rune4 = runes[Math.floor(Math.random() * runes.length)];

            const regs = Rule.crossToRegex(rune1, rune2, rune3, rune4, 1, 1)

            const results_0 = words.filter((word) => { return regs[0].test(word) })
            const results_1 = words.filter((word) => { return regs[1].test(word) })
            const results_2 = words.filter((word) => { return regs[2].test(word) })
            const results_3 = words.filter((word) => { return regs[3].test(word) })

            if (results_0.length > 0 && results_1.length > 0 && results_2.length > 0 && results_3.length > 0) {
                const result_0 = results_0[Math.floor(Math.random() * results_0.length)];
                const result_1 = results_1[Math.floor(Math.random() * results_1.length)];
                const result_2 = results_2[Math.floor(Math.random() * results_2.length)];
                const result_3 = results_3[Math.floor(Math.random() * results_3.length)];
                return [result_0, result_1, result_2, result_3];
            }
        }
        return ['', '', '', ''];
    }

    static crossToRegex(left_top: string,
        right_top: string,
        right_bottom: string,
        left_bottom: string,
        width: number,
        height: number): [RegExp, RegExp, RegExp, RegExp] {
        const ltrb = '.*' + left_top + '.'.repeat(width) + right_top + '.*';
        const rtrb = '.*' + right_top + '.'.repeat(height) + right_bottom + '.*';
        const lbrb = '.*' + left_bottom + '.'.repeat(width) + right_bottom + '.*';
        const ltlb = '.*' + left_top + '.'.repeat(height) + left_bottom + '.*';

        return [new RegExp(ltrb, 'u'), new RegExp(rtrb, 'u'), new RegExp(lbrb, 'u'), new RegExp(ltlb, 'u')];
    }
}