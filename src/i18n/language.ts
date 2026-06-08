export type AppLanguage = "ja" | "en"

export function normalizeLanguage(value: string | null | undefined): AppLanguage | null {
    const language = value?.trim().toLowerCase()
    if (!language) {
        return null
    }
    if (language.startsWith("ja")) {
        return "ja"
    }
    if (language.startsWith("en")) {
        return "en"
    }
    return null
}

export function languageFromNavigator(language: string): AppLanguage {
    return language.toLowerCase().includes("ja") ? "ja" : "en"
}

export function languageFromSearch(search: string): AppLanguage | null {
    return normalizeLanguage(new URLSearchParams(search).get("lang"))
}

export function languageFromHash(hash: string): AppLanguage | null {
    const queryStart = hash.indexOf("?")
    if (queryStart === -1) {
        return null
    }
    return languageFromSearch(hash.slice(queryStart))
}

export function resolveLanguage(location: Pick<Location, "search" | "hash">, navigatorLanguage: string): AppLanguage {
    return languageFromSearch(location.search)
        ?? languageFromHash(location.hash)
        ?? languageFromNavigator(navigatorLanguage)
}
