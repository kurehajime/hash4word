import { runeRotation } from "../../utils/runeRotation"
import "./RotatedButtonText.css"

type Props = {
    lines: string[]
}

export default function RotatedButtonText(props: Props) {
    return <>
        {props.lines.map((line, lineIndex) => (
            <span key={lineIndex}>
                {Array.from(line).map((char, charIndex) => (
                    <span
                        key={`${lineIndex}-${charIndex}`}
                        className="rotatedButtonChar"
                        style={{
                            transform: `rotate(${runeRotation(`${char}-${lineIndex}-${charIndex}`)}deg)`,
                        }}
                    >
                        {char}
                    </span>
                ))}
                {lineIndex < props.lines.length - 1 ? <br /> : null}
            </span>
        ))}
    </>
}
