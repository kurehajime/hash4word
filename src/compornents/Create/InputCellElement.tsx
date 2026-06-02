import { InputCell } from "../../models/InputCell"
import "./InputCellElement.css"
type Props = {
    cell: InputCell
    x: number
    y: number
    cellSize: number
    edit: (x: number, y: number, rune: string) => void
}
export default function InputCellElement(props: Props) {
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.edit(props.cell.x, props.cell.y, e.target.value)
    }
    const isCross = (props.cell.x === 3 || props.cell.x === 5) && (props.cell.y === 3 || props.cell.y === 5)
    return (
        props.cell.enabled ? <input type="text" className="inputCell"
            style={{
                height: props.cellSize - 2, width: props.cellSize - 2, position: "absolute", left: props.x, top: props.y,
                backgroundColor: isCross ? '#000000' : '#ffffff',
                color: isCross ? '#ffffff' : "#000000"
            }}
            maxLength={1}
            value={props.cell.Rune}
            onChange={onChange}
            onFocus={(e) => e.target.select()}
        /> :
            <></>)
}
