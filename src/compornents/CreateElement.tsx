import { useEffect, useState } from "react"
import { Field } from "../models/Field"
import { InputField } from "../models/InputField"
import word_japanese2048 from '../assets/japanese2048.json'
import InputFieldElement from "./Create/InputFieldElement"
import { Point } from "../models/Point";
import ShareTextElement from "./Create/ShareTextElement"

type Props = {
    cellSize: number
}
export default function CreateElement(props: Props) {
    const [inputField, setInputField] = useState<InputField | null>(null)

    useEffect(() => {
        const runes_hiragana = 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんがぎくげこざじずぜぞだぢづでどばびぶべぼぱぴぷぺぽっぁぃぅぇぉ'.split('')
        const field = Field.createField(runes_hiragana, word_japanese2048, 4, undefined)
        setInputField(InputField.createInputFieldbySeed(field.Seed))
    }, [])

    return (
        <div style={{
            position: "relative"
        }}>
            {
                inputField ?
                    <InputFieldElement inputField={inputField} cellSize={props.cellSize
                    }
                        edit={
                            (x, y, rune) => {
                                setInputField(inputField.set({ x, y }, rune))
                            }
                        } /> : <></ >
            }
            {
                inputField ? <ShareTextElement url={inputField.share()}></ShareTextElement> : <></>
            }
        </div >
    )
}