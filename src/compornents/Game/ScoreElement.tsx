import { Field } from "../../models/Field"
import arrowRightIcon from "../../assets/arrow_right.svg"
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
    const arrowIcon = (x: number, y: number, rotation = 0) => {
        const iconSize = 20
        return <image
            href={arrowRightIcon}
            x={x - iconSize / 2}
            y={y - iconSize / 2}
            width={iconSize}
            height={iconSize}
            transform={rotation === 0 ? undefined : `rotate(${rotation} ${x} ${y})`}
        />
    }
    const leftHit = props.field.calc_left() + ' HIT'
    const rightHit = props.field.calc_right() + ' HIT'
    const topHit = props.field.calc_top() + ' HIT'
    const bottomHit = props.field.calc_bottom() + ' HIT'
    const leftX = (3 + 1.4) * cellSize
    const rightX = (5 + 1.4) * cellSize
    const topArrowY = (0 + 1.65) * (cellSize / 2)
    const topHitY = (0 + 1) * (cellSize / 2)
    const sideTopY = (3 - 0.2) * cellSize
    const sideBottomY = (5 - 0.2) * cellSize
    return (<g width={FieldSize} height={FieldSize}>
        <text x={leftX} y={topHitY} {...textProps}>{leftHit}</text>
        {arrowIcon(leftX, topArrowY, 90)}
        <text x={rightX} y={topHitY} {...textProps}>{rightHit}</text>
        {arrowIcon(rightX, topArrowY, 90)}
        <text x={(0 + 0.5) * cellSize} y={sideTopY} {...textProps}>{topHit}</text>
        {arrowIcon((0 + 1.0) * cellSize, sideTopY)}
        <text x={(0 + 0.5) * cellSize} y={sideBottomY} {...textProps}>{bottomHit}</text>
        {arrowIcon((0 + 1.0) * cellSize, sideBottomY)}
    </g>)
}
