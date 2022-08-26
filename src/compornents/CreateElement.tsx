import { useEffect, useState } from "react"
import { Field } from "../models/Field"
import { InputField } from "../models/InputField"
import word_japanese2048 from '../assets/japanese2048.json'
import word_english2048 from '../assets/english2048.json'
import InputFieldElement from "./Create/InputFieldElement"
import ShareTextElement from "./Create/ShareTextElement"
import LogoElement from "./Share/LogoElement"
import GameButtonElement from "./Create/GameButtonElement"
import ShareButtonElement from "./Create/ShareButtonElement"

type Props = {
    cellSize: number
    init_mode: number
}
export default function CreateElement(props: Props) {
    const [inputField, setInputField] = useState<InputField | null>(null)

    useEffect(() => {
        const runes_hiragana = 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんがぎくげこざじずぜぞだぢづでどばびぶべぼぱぴぷぺぽっぁぃぅぇぉ'.split('')
        const runes_english = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
        let field: Field
        switch (props.init_mode) {
            case 1:
                field = Field.createField(runes_hiragana, word_japanese2048, 4, undefined)
                setInputField(InputField.createInputFieldbySeed(field.Seed))
                break
            case 2:
                field = Field.createField(runes_english, word_english2048, 4, undefined)
                setInputField(InputField.createInputFieldbySeed(field.Seed))
                break
        }
        history.pushState("", document.title, window.location.pathname + "#/create");
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
                inputField ? <ShareTextElement url={inputField.encode()}></ShareTextElement> : <></>
            }
            <LogoElement create={true}></LogoElement>
            <GameButtonElement></GameButtonElement>
            <ShareButtonElement inputField={inputField}></ShareButtonElement>
        </div >
    )
}