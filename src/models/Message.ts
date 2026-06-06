export class Message {
    private static readonly key = new TextEncoder().encode("HASH4WORD")

    public static encode(message: string): string {
        const bytes = new TextEncoder().encode(message)
        return Message.bytesToBase64Url(Message.xor(bytes))
    }

    public static decode(str: string): string {
        try {
            return new TextDecoder(undefined, { fatal: true }).decode(Message.xor(Message.base64UrlToBytes(str)))
        } catch (error) {
            return ""
        }
    }

    private static xor(bytes: Uint8Array): Uint8Array {
        const result = new Uint8Array(bytes.length)
        for (let i = 0; i < bytes.length; i++) {
            result[i] = bytes[i] ^ Message.key[i % Message.key.length]
        }
        return result
    }

    private static bytesToBase64Url(bytes: Uint8Array): string {
        const binary = Array.from(bytes, byte => String.fromCharCode(byte)).join("")
        return btoa(binary)
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
            .replace(/=+$/g, "")
    }

    private static base64UrlToBytes(str: string): Uint8Array {
        const base64 = str
            .replace(/-/g, "+")
            .replace(/_/g, "/")
            .padEnd(Math.ceil(str.length / 4) * 4, "=")
        return Uint8Array.from(atob(base64), char => char.charCodeAt(0))
    }
}
