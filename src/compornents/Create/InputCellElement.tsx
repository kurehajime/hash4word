import { InputCell } from "../../models/InputCell"
import { runeRotation } from "../../utils/runeRotation"
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
    const backgroundColor = isCross ? '#000000' : '#ffffff'
    const foregroundColor = isCross ? '#ffffff' : "#000000"
    return (
        props.cell.enabled ? <div className="inputCellPanel"
            style={{
                height: props.cellSize - 2, width: props.cellSize - 2, position: "absolute", left: props.x, top: props.y,
                backgroundColor,
                color: foregroundColor
            }}>
            <span
                className="inputCellText"
                style={{
                    transform: `rotate(${runeRotation(props.cell.Rune)}deg)`,
                }}
            >{props.cell.Rune}</span>
            <input type="text" className="inputCell"
                style={{ caretColor: foregroundColor }}
                maxLength={1}
                value={props.cell.Rune}
                onChange={onChange}
                onFocus={(e) => e.target.select()}
            />
        </div> :
            <></>)
}
