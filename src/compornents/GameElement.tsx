import React from "react";
import { useEffect } from "react";
import { Field } from "../models/Field";
import FieldElement from "./FieldElement";
import ja_word from '../assets/ja/words.json'
import { Point } from "../models/Point";
import DictionaryElement from "./DictionaryElement";

type Props = {
    cellSize: number
}
export default function GameElement(props: Props) {
    const [field, setField] = React.useState<Field | null>(null)
    const [seleted, setSelected] = React.useState<Point | null>(null)

    useEffect(() => {
        const runes = 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんがぎくげこざじずぜぞだぢづでどばびぶべぼぱぴぷぺぽ'.split('')
        setField(Field.createField(runes, ja_word, 4))
    }, [])

    const clicked = (point: Point) => {
        if (field) {
            if (!field.getCell(point).enabled || field.getCell(point).fixed) {
                return
            }
            if (seleted) {
                setField(field.swap(seleted, point))
                setSelected(null)
            } else {
                setSelected({ ...point })
            }
        }
    }


    return (
        <div>
            {field ? <FieldElement
                cellSize={props.cellSize}
                field={field}
                clicked={clicked}
                seleted={seleted}
            /> : <></>}
            <DictionaryElement
                mode={1}
            />
        </div>
    )
}