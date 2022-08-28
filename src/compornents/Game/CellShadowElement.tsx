import { Cell } from "../../models/Cell"
import "./CellShadowElement.css"
type Props = {
    cell: Cell
    x: number
    y: number
    mouseX: number
    mouseY: number
    cellSize: number
    selected: boolean
}
export default function CellShadowElement(props: Props) {
    const cellSize = props.cellSize
    const x = props.selected ? props.mouseX : props.x
    const y = props.selected ? props.mouseY : props.y
    return (
        props.cell.enabled ? <g>
            <rect x={x + 1} y={y + 1} width={cellSize - 2} height={cellSize - 2}
                className="shadow" />
        </g > : <g></g>)
}