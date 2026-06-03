import { Cell } from "../../models/Cell"
import { runeRotation } from "../../utils/runeRotation"
import "./CellElement.css"
type Props = {
    cell: Cell
    x: number
    y: number
    mouseX: number
    mouseY: number
    cellSize: number
    selected: boolean
    touched: boolean
}
export default function CellElement(props: Props) {
    const cellSize = props.cellSize
    const cellSize2 = props.selected ? cellSize * 1.05 : cellSize
    const x = props.selected ? props.mouseX : props.x
    const y = props.selected ? props.mouseY : props.y
    const isCross = (props.cell.x === 3 || props.cell.x === 5) && (props.cell.y === 3 || props.cell.y === 5)
    const foregroundColor = isCross ? "#ffffff" : "#000000"
    const backgroundColor = isCross ? "#000000" : "#ffffff"
    const textX = x + cellSize / 2
    const textY = y + cellSize / 2
    const rotation = runeRotation(props.cell.Rune)
    return (
        props.cell.enabled ? <g>
            <rect x={props.x} y={props.y} width={cellSize} height={cellSize}
                fill={props.selected ? "url(#panel-back-screentone)" : "#000000"} className="" />
            <g>
                <rect x={x + 1} y={y + 1} width={(cellSize2) - 2} height={(cellSize2) - 2}
                    fill={backgroundColor}
                    className={(props.selected ? "selected" : "easeIn") + " " + (props.cell.fixed ? "fixed" : "")} />
                <text x={textX} y={textY}
                    className={(props.selected ? "selected" : "easeIn") + " " + (props.cell.fixed ? "fixed" : "")}
                    textAnchor="middle" dominantBaseline="central"
                    transform={`rotate(${rotation} ${textX} ${textY})`}
                    fill={foregroundColor}
                    stroke={foregroundColor}
                    fontSize={`${cellSize * (props.selected ? 0.85 : 0.8)}px`}
                    fontFamily="Noto Sans JP, Helvetica Neue, Arial, sans-serif"
                    fontWeight={900}
                >{props.cell.Rune}</text>

                <line x1={x + (cellSize2) - 0} y1={y + 0} x2={x + (cellSize2) - 0} y2={y + (cellSize2)} stroke="#000000" strokeWidth="3" />
                <line x1={x + (cellSize2) - 0} y1={y + (cellSize2) - 0} x2={x + 0} y2={y + (cellSize2) - 0} stroke="#000000" strokeWidth="3" />
            </g>
            {
                (props.selected && props.touched) ? <g>
                    <text x={x + cellSize / 2 - cellSize} y={y + cellSize / 2 - cellSize}
                        className={(props.selected ? "selected" : "easeIn") + " " + (props.cell.fixed ? "fixed" : "")}
                        textAnchor="middle" dominantBaseline="central"
                        transform={`rotate(${rotation} ${x + cellSize / 2 - cellSize} ${y + cellSize / 2 - cellSize})`}
                        fill={"#000000"}
                        stroke={"#ffffff"}
                        strokeWidth={3}
                        fontSize={"100px"}
                        fontFamily="Noto Sans JP, Helvetica Neue, Arial, sans-serif"
                        fontWeight={900}
                        opacity={0.5}
                    >{props.cell.Rune}</text>
                </g> : <></>
            }
        </g > : <g></g>)
}
