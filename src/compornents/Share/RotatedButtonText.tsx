import { runeRotation } from "../../utils/runeRotation"
import "./RotatedButtonText.css"

type Props = {
    lines: string[]
    animate?: boolean
    highlightText?: string
}

export default function RotatedButtonText(props: Props) {
    let charCount = 0
    return <>
        {props.lines.map((line, lineIndex) => (
            <span key={lineIndex}>
                {Array.from(line).map((char, charIndex) => {
                    const animationIndex = charCount++
                    const highlightStart = props.highlightText ? line.indexOf(props.highlightText) : -1
                    const highlighted = highlightStart !== -1 &&
                        charIndex >= highlightStart &&
                        charIndex < highlightStart + Array.from(props.highlightText ?? "").length
                    return <span
                            key={`${lineIndex}-${charIndex}`}
                            className="rotatedButtonChar"
                            style={{
                                transform: `rotate(${runeRotation(`${char}-${lineIndex}-${charIndex}`)}deg)`,
                            }}
                        >
                            <span
                                className={[
                                    "rotatedButtonCharInner",
                                    props.animate ? "animated" : "",
                                    highlighted ? "highlighted" : "",
                                ].filter(className => className !== "").join(" ")}
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
