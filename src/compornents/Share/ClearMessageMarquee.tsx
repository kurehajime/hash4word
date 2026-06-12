import React from "react"
import type { CSSProperties } from "react"
import Marquee from "react-fast-marquee"
import { createPortal } from "react-dom"
import { MarqueeRowConfig, useResponsiveMarqueeRows } from "./useResponsiveMarqueeRows"
import "./ClearMessageMarquee.css"

type Props = {
    message: string
}

const rowConfigs: MarqueeRowConfig[] = [
    { topRatio: 0.5, angle: -12, portraitAngle: -10, speed: 85, direction: "left" },
]

export default function ClearMessageMarquee(props: Props) {
    const [fieldCenterY, setFieldCenterY] = React.useState<number | null>(null)
    const row = useResponsiveMarqueeRows(rowConfigs)[0]

    React.useEffect(() => {
        let frame = 0
        const updatePosition = () => {
            const field = document.querySelector<SVGSVGElement>(".field")
            if (!field) {
                setFieldCenterY(null)
                return
            }
            const rect = field.getBoundingClientRect()
            setFieldCenterY(rect.top + rect.height / 2)
        }
        const scheduleUpdate = () => {
            window.cancelAnimationFrame(frame)
            frame = window.requestAnimationFrame(updatePosition)
        }

        scheduleUpdate()
        window.addEventListener("resize", scheduleUpdate)
        window.addEventListener("scroll", scheduleUpdate, { passive: true })
        window.visualViewport?.addEventListener("resize", scheduleUpdate)
        window.visualViewport?.addEventListener("scroll", scheduleUpdate)

        return () => {
            window.cancelAnimationFrame(frame)
            window.removeEventListener("resize", scheduleUpdate)
            window.removeEventListener("scroll", scheduleUpdate)
            window.visualViewport?.removeEventListener("resize", scheduleUpdate)
            window.visualViewport?.removeEventListener("scroll", scheduleUpdate)
        }
    }, [])

    return createPortal(<div className="clearMessageMarquee">
        <div
            className="clearMessageMarqueeRow"
            style={{
                top: `${fieldCenterY ?? row.top}px`,
                width: `${row.width}px`,
                "--marquee-row-scale": row.scale,
                transform: `translate(-50%, -50%) rotate(${row.angle}deg)`,
            } as CSSProperties}
        >
            <Marquee
                speed={row.speed}
                direction={row.direction}
                autoFill
                pauseOnHover={false}
            >
                <span className="clearMessageMarqueeText">{props.message}</span>
            </Marquee>
        </div>
    </div>, document.body)
}
