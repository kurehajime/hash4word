import { Cell } from "../models/Cell"
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
    const x = props.selected ? props.mouseX : props.x
    const y = props.selected ? props.mouseY : props.y
    return (
        props.cell.enabled ? <g>
            <rect x={props.x} y={props.y} width={cellSize} height={cellSize} stroke='black'
                fill='white' className="" />
            <rect x={x} y={y} width={cellSize} height={cellSize} stroke='black'
                fill='whitesmoke' className={props.selected ? "" : "easeIn"} />
            <text x={x + cellSize / 2} y={y + cellSize / 2}
                textAnchor="middle" dominantBaseline="central" stroke={props.cell.fixed ? "green" : "black"}
            >{props.cell.Rune}</text>
            {/* <text x={props.x + 15 + cellSize / 2} y={props.y + cellSize / 2}
                textAnchor="middle" dominantBaseline="central" stroke="red">{props.cell.x + props.cell.y * 9}</text> */}


        </g > : <g></g>)
}