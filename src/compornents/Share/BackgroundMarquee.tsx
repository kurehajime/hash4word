import Marquee from "react-fast-marquee"
import "./BackgroundMarquee.css"

export default function BackgroundMarquee() {
    const rows = [
        { top: 150, angle: -12, speed: 82, direction: "left" as const },
        { top: 270, angle: 32, speed: 200, direction: "left" as const },
        { top: 420, angle: -16, speed: 30, direction: "right" as const },
        { top: 560, angle: 17, speed: 92, direction: "right" as const },
    ]

    return <div className="backgroundMarquee">
        {rows.map((row, index) => (
            <div
                className="backgroundMarqueeRow"
                key={index}
                style={{
                    top: `${row.top}px`,
                    transform: `translateX(-50%) rotate(${row.angle}deg)`,
                }}
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
    </div>
}
