import { Cell } from "../../models/Cell"
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
    return (
        props.cell.enabled ? <g>
            <rect x={props.x} y={props.y} width={cellSize} height={cellSize}
                fill='#131c33' className="" />
            <g>
                <rect x={x + 1} y={y + 1} width={(cellSize2) - 2} height={(cellSize2) - 2}
                    fill={props.cell.fixed ? '#4463b3' : '#e6edff'}
                    className={(props.selected ? "selected" : "easeIn") + " " + (props.cell.fixed ? "fixed" : "")} />
                <text x={x + cellSize / 2} y={y + cellSize / 2}
                    className={(props.selected ? "selected" : "easeIn") + " " + (props.cell.fixed ? "fixed" : "")}
                    textAnchor="middle" dominantBaseline="central"
                    fill={props.cell.fixed ? "#ffffff" : "#202f55"}
                    stroke={props.cell.fixed ? "#ffffff" : "#202f55"}
                    fontSize={props.selected ? "42px" : "40px"}
                    fontFamily="Helvetica Neue, Arial"
                >{props.cell.Rune}</text>

                <line x1={x + (cellSize2) - 0} y1={y + 0} x2={x + (cellSize2) - 0} y2={y + (cellSize2)} stroke="#202f55" strokeWidth="3" />
                <line x1={x + (cellSize2) - 0} y1={y + (cellSize2) - 0} x2={x + 0} y2={y + (cellSize2) - 0} stroke="#202f55" strokeWidth="3" />
            </g>
            {
                (props.selected && props.touched) ? <g>
                    <text x={x + cellSize / 2 - cellSize} y={y + cellSize / 2 - cellSize}
                        className={(props.selected ? "selected" : "easeIn") + " " + (props.cell.fixed ? "fixed" : "")}
                        textAnchor="middle" dominantBaseline="central"
                        fill={"#f0f8ff"}
                        stroke={"#00294d"}
                        fontSize={"100px"}
                        fontFamily="Helvetica Neue, Arial"
                        fontWeight="bold"
                        opacity={0.5}
                    >{props.cell.Rune}</text>
                </g> : <></>
            }
        </g > : <g></g>)
}