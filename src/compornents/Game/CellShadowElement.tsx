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
    const shadowOffset = 10
    return (
        props.cell.enabled ? <g>
            <rect x={x + shadowOffset} y={y + shadowOffset} width={cellSize} height={cellSize}
                className="shadow" />
        </g > : <g></g>)
}
