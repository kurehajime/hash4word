import React from "react";
import { useEffect } from "react";
import { Field } from "../models/Field";
import FieldElement from "./FieldElement";
import word_japanese2048 from '../assets/japanese2048.json'
import word_english2048 from '../assets/english2048.json'
import word_pokemon_japanese from '../assets/pokemon_japanese.json'
import word_pokemon_english from '../assets/pokemon_english.json'
import { Point } from "../models/Point";
import DictionaryElement from "./DictionaryElement";

type Props = {
    cellSize: number
}
export default function GameElement(props: Props) {
    const [field, setField] = React.useState<Field | null>(null)
    const [seleted, setSelected] = React.useState<Point | null>(null)
    const [mode, setMode] = React.useState<number>(1)

    useEffect(() => {
        const runes_hiragana = 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんがぎくげこざじずぜぞだぢづでどばびぶべぼぱぴぷぺぽっぁぃぅぇぉ'.split('')
        const runes_english = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
        const runes_pokemon_ja = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンガギクゲコザジズゼゾダヂヅデドバビブベボパピプペポッァィゥェォー'.split('')
        switch (mode) {
            case 1:
                setField(Field.createField(runes_hiragana, word_japanese2048, 4))
                break;
            case 2:
                setField(Field.createField(runes_english, word_english2048, 4))
                break;
            case 3:
                setField(Field.createField(runes_pokemon_ja, word_pokemon_japanese, 4))
                break;
            case 4:
                setField(Field.createField(runes_english, word_pokemon_english, 4))
                break;
        }
    }, [mode])

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
                mode={mode}
                changeMode={(mode: number) => setMode(mode)}
            />
        </div>
    )
}