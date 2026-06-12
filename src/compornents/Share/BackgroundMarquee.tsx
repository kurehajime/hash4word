import Marquee from "react-fast-marquee"
import { createPortal } from "react-dom"
import type { CSSProperties } from "react"
import { MarqueeRowConfig, useResponsiveMarqueeRows } from "./useResponsiveMarqueeRows"
import "./BackgroundMarquee.css"

const rowConfigs: MarqueeRowConfig[] = [
    { topRatio: 0.17, angle: -12, portraitAngle: -10, speed: 82, direction: "left" },
    { topRatio: 0.34, angle: 32, portraitAngle: 18, speed: 200, direction: "left" },
    { topRatio: 0.53, angle: -16, portraitAngle: -12, speed: 30, direction: "right" },
    { topRatio: 0.70, angle: 17, portraitAngle: 14, speed: 92, direction: "right" },
]

export default function BackgroundMarquee() {
    const rows = useResponsiveMarqueeRows(rowConfigs)

    return createPortal(<div className="backgroundMarquee">
        {rows.map((row, index) => (
            <div
                className="backgroundMarqueeRow"
                key={index}
                style={{
                    top: `${row.top}px`,
                    width: `${row.width}px`,
                    "--marquee-row-scale": row.scale,
                    transform: `translateX(-50%) rotate(${row.angle}deg)`,
                } as CSSProperties}
            >
                <Marquee
                    speed={row.speed}
                    direction={row.direction}
                    autoFill
                    pauseOnHover={false}
                >
                    <span className="backgroundMarqueeText">CLEAR!</span>
                </Marquee>
            </div>
        ))}
    </div>, document.body)
}
