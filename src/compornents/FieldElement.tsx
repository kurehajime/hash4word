import { Field } from "../models/Field"
import { Point } from "../models/Point"
import CellElement from "./CellElement"
import "./FieldElement.css"
import ScoreElement from "./ScoreElement"

type Props = {
    cellSize: number
    field: Field
    clicked: (point: Point) => void
    seleted: Point | null
}
export default function FieldElement(props: Props) {
    const cellSize = props.cellSize
    const size = props.field.size
    const FieldSize = cellSize * size

    const mouseClick = (e: React.PointerEvent<SVGSVGElement>) => {
        const x = e.nativeEvent.offsetX
        const y = e.nativeEvent.offsetY
        clicked(x, y)
        e.preventDefault()
    }

    const clicked = (x: number, y: number) => {
        props.clicked({ x: Math.floor(x / cellSize), y: Math.floor(y / cellSize) })
    }


    return (<svg width={FieldSize} height={FieldSize} onClick={mouseClick}   >
        <ScoreElement
            field={props.field}
            cellSize={cellSize}
        />
        {props.field.Cells.map((cell, index) => {
            const x = cell.x * cellSize
            const y = cell.y * cellSize
            const selected = props.seleted !== null && props.seleted.x === cell.x && props.seleted.y === cell.y

            return <CellElement
                key={index}
                cell={cell}
                x={x}
                y={y}
                cellSize={cellSize}
                selected={selected}
            />
        })
        }
    </svg>)
}