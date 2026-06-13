export const grungeFilterCount = 12

export const grungeFilterIndexes = Array.from({ length: grungeFilterCount }, (_, index) => index)

export const grungeFilterId = (index: number): string => `grunge-text-${index}`

export const grungeFilterSeed = (index: number): number => 8 + index * 17

export const grungeFilterIndex = (text: string): number => {
    let hash = 0
    for (const rune of Array.from(text)) {
        hash = (hash * 31 + (rune.codePointAt(0) ?? 0)) >>> 0
    }
    return hash % grungeFilterCount
}

export const grungeTextFilterUrl = (text: string): string => `url(#${grungeFilterId(grungeFilterIndex(text))})`
