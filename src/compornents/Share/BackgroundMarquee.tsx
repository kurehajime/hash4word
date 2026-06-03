import Marquee from "react-fast-marquee"
import "./BackgroundMarquee.css"

export default function BackgroundMarquee() {
    return <div className="backgroundMarquee">
        <div className="backgroundMarqueeRow">
            <Marquee
                speed={100}
                direction="left"
                autoFill
                pauseOnHover={false}
            >
                <span className="backgroundMarqueeText">CLEAR!</span>
            </Marquee>
        </div>
    </div>
}
