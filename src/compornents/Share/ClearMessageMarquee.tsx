import React from "react"
import Marquee from "react-fast-marquee"
import { createPortal } from "react-dom"
import "./ClearMessageMarquee.css"

type Props = {
    message: string
}

export default function ClearMessageMarquee(props: Props) {
    const [fieldCenterY, setFieldCenterY] = React.useState<number | null>(null)

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
        <div className="clearMessageMarqueeRow" style={fieldCenterY === null ? undefined : { top: `${fieldCenterY}px` }}>
            <Marquee
                speed={85}
                direction="left"
                autoFill
                pauseOnHover={false}
            >
                <span className="clearMessageMarqueeText">{props.message}</span>
            </Marquee>
        </div>
    </div>, document.body)
}
