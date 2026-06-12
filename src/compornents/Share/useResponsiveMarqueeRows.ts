import React from "react"

export type MarqueeDirection = "left" | "right"

export type MarqueeRowConfig = {
    topRatio: number
    angle: number
    portraitAngle: number
    speed: number
    direction: MarqueeDirection
}

export type ResponsiveMarqueeRow = {
    top: number
    angle: number
    width: number
    scale: number
    speed: number
    direction: MarqueeDirection
}

const fallbackViewport = {
    width: 750,
    height: 740,
}

function clamp(value: number, min: number, max: number): number {
    return Math.min(max, Math.max(min, value))
}

function lerp(from: number, to: number, amount: number): number {
    return from + (to - from) * amount
}

function currentViewport(): { width: number, height: number } {
    if (typeof window === "undefined") {
        return fallbackViewport
    }
    return {
        width: window.visualViewport?.width ?? window.innerWidth,
        height: window.visualViewport?.height ?? window.innerHeight,
    }
}

export function responsiveMarqueeWidth(): number {
    const viewport = currentViewport()
    return Math.max(2400, Math.hypot(viewport.width, viewport.height) * 2.4)
}

function currentAppScale(): number {
    if (typeof window === "undefined") {
        return 1
    }
    const scale = Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--app-scale"))
    if (!Number.isFinite(scale)) {
        return 1
    }
    return clamp(scale, 0.75, 1.35)
}

function responsiveRows(configs: MarqueeRowConfig[]): ResponsiveMarqueeRow[] {
    const viewport = currentViewport()
    const aspectRatio = viewport.width / viewport.height
    const portraitAmount = clamp((1 - aspectRatio) / 0.55, 0, 1)
    const width = Math.max(2400, Math.hypot(viewport.width, viewport.height) * 2.4)
    const scale = currentAppScale()

    return configs.map(config => ({
        top: viewport.height * config.topRatio,
        angle: lerp(config.angle, config.portraitAngle, portraitAmount),
        width,
        scale,
        speed: config.speed,
        direction: config.direction,
    }))
}

export function useResponsiveMarqueeRows(configs: MarqueeRowConfig[]): ResponsiveMarqueeRow[] {
    const [rows, setRows] = React.useState<ResponsiveMarqueeRow[]>(() => responsiveRows(configs))

    React.useEffect(() => {
        let frame = 0
        const updateRows = () => {
            setRows(responsiveRows(configs))
        }
        const scheduleUpdate = () => {
            window.cancelAnimationFrame(frame)
            frame = window.requestAnimationFrame(updateRows)
        }

        scheduleUpdate()
        window.addEventListener("resize", scheduleUpdate)
        window.addEventListener("app-scale-change", scheduleUpdate)
        window.visualViewport?.addEventListener("resize", scheduleUpdate)

        return () => {
            window.cancelAnimationFrame(frame)
            window.removeEventListener("resize", scheduleUpdate)
            window.removeEventListener("app-scale-change", scheduleUpdate)
            window.visualViewport?.removeEventListener("resize", scheduleUpdate)
        }
    }, [configs])

    return rows
}
