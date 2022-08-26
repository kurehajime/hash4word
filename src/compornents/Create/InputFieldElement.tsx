import { InputField } from "../../models/InputField"
import InputCellElement from "./InputCellElement"
import "./InputFieldElement.css"

type Props = {
    cellSize: number
    inputField: InputField
}
export default function InputFieldElement(props: Props) {
    const cellSize = props.cellSize
    const size = props.inputField.size
    const FieldSize = cellSize * size

    return (<div style={{ width: FieldSize, height: FieldSize, position: "relative" }} >
        {props.inputField.Cells.map((cell, index) => {
            return <InputCellElement
                key={index}
                cell={cell}
                x={cell.x * cellSize}
                y={cell.y * cellSize}
                cellSize={cellSize}
            />
        })
        }
    </div >)
}