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
        <text x={(3 + 1.3) * cellSize} y={(0 + 1) * (cellSize / 2)}
            textAnchor="middle" dominantBaseline="central" fill="#e6edff" fontSize={15}>{props.field.calc_left() + ' hit'}</text>
        <text x={(3 + 1.3) * cellSize} y={(0 + 1.5) * (cellSize / 2)}
            textAnchor="middle" dominantBaseline="central" fill="#e6edff" fontSize={15}>▼</text>
        <text x={(5 + 1.3) * cellSize} y={(0 + 1) * (cellSize / 2)}
            textAnchor="middle" dominantBaseline="central" fill="#e6edff" fontSize={15}>{props.field.calc_right() + ' hit'}</text>
        <text x={(5 + 1.3) * cellSize} y={(0 + 1.5) * (cellSize / 2)}
            textAnchor="middle" dominantBaseline="central" fill="#e6edff" fontSize={15}>▼</text>
        <text x={(0 + 0.5) * (cellSize)} y={(3 - 0.2) * (cellSize)}
            textAnchor="middle" dominantBaseline="central" fill="#e6edff" fontSize={15}>{props.field.calc_top() + ' hit'}</text>
        <text x={(0 + 0.9) * (cellSize)} y={(3 - 0.2) * (cellSize)}
            textAnchor="middle" dominantBaseline="central" fill="#e6edff" fontSize={15}>▶</text>
        <text x={(0 + 0.5) * (cellSize)} y={(5 - 0.2) * (cellSize)}
            textAnchor="middle" dominantBaseline="central" fill="#e6edff" fontSize={15}>{props.field.calc_bottom() + ' hit'}</text>
        <text x={(0 + 0.9) * (cellSize)} y={(5 - 0.2) * (cellSize)}
            textAnchor="middle" dominantBaseline="central" fill="#e6edff" fontSize={15}>▶</text>
        {

            <text x={(4 + 0.5) * (cellSize)} y={(4 + 0.5) * (cellSize)}
                textAnchor="middle" dominantBaseline="central" fontSize="45"
                className={props.field.valid() ? "ok" : ""}
            >{props.field.valid() ? "👍" : ""}
            </text>
        }
    </g>)
}