export function runeRotation(rune: string): number {
    let hash = 0
    for (const char of Array.from(rune)) {
        hash = (hash * 31 + (char.codePointAt(0) ?? 0)) >>> 0
    }
    return (hash % 41) - 20
}
