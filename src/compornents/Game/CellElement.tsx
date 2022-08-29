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
                <rect x={x + 1} y={y + 1} width={(props.selected ? cellSize2 : cellSize) - 2} height={(props.selected ? cellSize2 : cellSize) - 2}
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

                <line x1={x + (props.selected ? cellSize2 : cellSize) - 0} y1={y + 0} x2={x + (props.selected ? cellSize2 : cellSize) - 0} y2={y + (props.selected ? cellSize2 : cellSize)} stroke="#202f55" strokeWidth="3" />
                <line x1={x + (props.selected ? cellSize2 : cellSize) - 0} y1={y + (props.selected ? cellSize2 : cellSize) - 0} x2={x + 0} y2={y + (props.selected ? cellSize2 : cellSize) - 0} stroke="#202f55" strokeWidth="3" />


            </g>

            {/* <text x={props.x + 15 + cellSize / 2} y={props.y + cellSize / 2}
                textAnchor="middle" dominantBaseline="central" stroke="red">{props.cell.x + props.cell.y * 9}</text> */}


        </g > : <g></g>)
}