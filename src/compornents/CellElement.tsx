import { Cell } from "../models/Cell"
import "./CellElement.css"
type Props = {
    cell: Cell
    x: number
    y: number
    cellSize: number
    selected: boolean
}
export default function CellElement(props: Props) {
    const cellSize = props.cellSize
    return (
        props.cell.enabled ? <g>
            <rect x={props.x} y={props.y} width={cellSize} height={cellSize} stroke='black'
                fill={props.selected ? 'blue' : 'whitesmoke'} className="easeIn" />
            <text x={props.x + cellSize / 2} y={props.y + cellSize / 2}
                textAnchor="middle" dominantBaseline="central" stroke={props.cell.fixed ? "green" : "black"}>{props.cell.Rune}</text>
            {/* <text x={props.x + 15 + cellSize / 2} y={props.y + cellSize / 2}
                textAnchor="middle" dominantBaseline="central" stroke="red">{props.cell.x + props.cell.y * 9}</text> */}


        </g > : <g></g>)
}