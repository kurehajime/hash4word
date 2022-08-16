import { Cell } from "../models/Cell"
import "./CellElement.css"
type Props = {
    cell: Cell
    x: number
    y: number
    cellSize: number
}
export default function CellElement(props: Props) {
    const cellSize = props.cellSize
    return (
        props.cell.enabled ? < g >
            <rect x={props.x} y={props.y} width={cellSize} height={cellSize} stroke='black' fill='whitesmoke' />
            <text x={props.x + cellSize / 2} y={props.y + cellSize / 2}
                textAnchor="middle" dominantBaseline="central" stroke="black">{props.cell.Rune}</text>
        </g > : <g></g>)
}