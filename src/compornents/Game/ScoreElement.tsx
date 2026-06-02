import { Field } from "../../models/Field"
import "./ScoreElement.css"

type Props = {
    field: Field
    cellSize: number
}
export default function ScoreElement(props: Props) {
    const cellSize = props.cellSize
    const size = props.field.size
    const FieldSize = cellSize * size
    const textProps = {
        textAnchor: "middle" as const,
        dominantBaseline: "central" as const,
        fill: "#000000",
        fontSize: 15,
        fontFamily: "Noto Sans JP, Helvetica Neue, Arial, sans-serif",
        fontWeight: 900,
    }
    const leftHit = props.field.calc_left() + ' HIT'
    const rightHit = props.field.calc_right() + ' HIT'
    const topHit = props.field.calc_top() + ' HIT'
    const bottomHit = props.field.calc_bottom() + ' HIT'
    const leftX = (3 + 1.4) * cellSize
    const rightX = (5 + 1.4) * cellSize
    const topArrowY = (0 + 1.5) * (cellSize / 2)
    const topHitY = (0 + 1) * (cellSize / 2)
    const sideTopY = (3 - 0.2) * cellSize
    const sideBottomY = (5 - 0.2) * cellSize
    return (<g width={FieldSize} height={FieldSize}>
        <text x={leftX} y={topHitY} {...textProps}>{leftHit}</text>
        <text x={leftX} y={topArrowY} {...textProps}>▼</text>
        <text x={rightX} y={topHitY} {...textProps}>{rightHit}</text>
        <text x={rightX} y={topArrowY} {...textProps}>▼</text>
        <text x={(0 + 0.5) * cellSize} y={sideTopY} {...textProps}>{topHit}</text>
        <text x={(0 + 0.9) * cellSize} y={sideTopY} {...textProps}>▶︎</text>
        <text x={(0 + 0.5) * cellSize} y={sideBottomY} {...textProps}>{bottomHit}</text>
        <text x={(0 + 0.9) * cellSize} y={sideBottomY} {...textProps}>▶︎</text>
    </g>)
}
