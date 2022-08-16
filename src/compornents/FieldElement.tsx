import { Field } from "../models/Field"
import CellElement from "./CellElement"
import "./FieldElement.css"

type Props = {
    cellSize: number
    field: Field
}
export default function FieldElement(props: Props) {
    const cellSize = props.cellSize
    const size = props.field.size
    const FieldSize = cellSize * size
    return (<svg width={FieldSize} height={FieldSize}  >
        {props.field.Cells.map((cell, index) => {
            const x = index % size * cellSize
            const y = Math.floor(index / size) * cellSize
            return <CellElement
                key={index}
                cell={cell}
                x={x}
                y={y}
                cellSize={cellSize}
            />
        })
        }
    </svg>)
}