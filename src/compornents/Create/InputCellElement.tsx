import { InputCell } from "../../models/InputCell"
import "./InputCellElement.css"
type Props = {
    cell: InputCell
    x: number
    y: number
    cellSize: number
}
export default function InputCellElement(props: Props) {
    return (
        props.cell.enabled ? <input type="text" className="inputCell"
            style={{
                height: props.cellSize - 2, width: props.cellSize - 2, position: "absolute", left: props.x, top: props.y
            }}
            maxLength={1}
            defaultValue={props.cell.Rune} /> :
            <></>)
}