import { Field } from "../models/Field"
import "./ScoreElement.css"

type Props = {
    field: Field
    cellSize: number
}
export default function ScoreElement(props: Props) {
    const cellSize = props.cellSize
    const size = props.field.size
    const FieldSize = cellSize * size
    return (<g width={FieldSize} height={FieldSize}>
        <text x={(3 + 1.5) * cellSize} y={(0 + 1) * (cellSize / 2)}
            textAnchor="middle" dominantBaseline="central" fill="#e6edff">{props.field.calc_left()}</text>
        <text x={(5 + 1.5) * cellSize} y={(0 + 1) * (cellSize / 2)}
            textAnchor="middle" dominantBaseline="central" fill="#e6edff">{props.field.calc_right()}</text>
        <text x={(0 + 0.5) * (cellSize)} y={(3 - 0.5) * (cellSize)}
            textAnchor="middle" dominantBaseline="central" fill="#e6edff">{props.field.calc_top()}</text>
        <text x={(0 + 0.5) * (cellSize)} y={(5 - 0.5) * (cellSize)}
            textAnchor="middle" dominantBaseline="central" fill="#e6edff">{props.field.calc_bottom()}</text>
        {

            <text x={(4 + 0.5) * (cellSize)} y={(4 + 0.5) * (cellSize)}
                textAnchor="middle" dominantBaseline="central" fontSize="35"
                className={props.field.valid() ? "ok" : ""}
            >{props.field.valid() ? "👍" : ""}
            </text>
        }
    </g>)
}