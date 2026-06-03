import { runeRotation } from "../../utils/runeRotation"
import "./RotatedButtonText.css"

type Props = {
    lines: string[]
    animate?: boolean
}

export default function RotatedButtonText(props: Props) {
    let charCount = 0
    return <>
        {props.lines.map((line, lineIndex) => (
            <span key={lineIndex}>
                {Array.from(line).map((char, charIndex) => {
                    const animationIndex = charCount++
                    return <span
                            key={`${lineIndex}-${charIndex}`}
                            className="rotatedButtonChar"
                            style={{
                                transform: `rotate(${runeRotation(`${char}-${lineIndex}-${charIndex}`)}deg)`,
                            }}
                        >
                            <span
                                className={props.animate ? "rotatedButtonCharInner animated" : "rotatedButtonCharInner"}
                                style={{
                                    animationDelay: `${animationIndex * 35}ms`,
                                }}
                            >
                                {char}
                            </span>
                        </span>
                })}
                {lineIndex < props.lines.length - 1 ? <br /> : null}
            </span>
        ))}
    </>
}
