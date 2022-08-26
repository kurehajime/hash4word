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
    return (
        props.cell.enabled ? <input type="text" className="inputCell"
            style={{
                height: props.cellSize - 2, width: props.cellSize - 2, position: "absolute", left: props.x, top: props.y,
                backgroundColor: props.cell.fixed ? '#4463b3' : '#e6edff',
                color: props.cell.fixed ? '#ffffff' : "#202f55"
            }}
            maxLength={1}
            value={props.cell.Rune}
            onChange={onChange}
            onFocus={(e) => e.target.select()}
        /> :
            <></>)
}