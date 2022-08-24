import React from "react";
import { useEffect } from "react";
import { Field } from "../models/Field";
import FieldElement from "./FieldElement";
import word_japanese2048 from '../assets/japanese2048.json'
import word_english2048 from '../assets/english2048.json'
import word_pokemon_japanese from '../assets/pokemon_japanese.json'
import word_pokemon_english from '../assets/pokemon_english.json'
import { Point } from "../models/Point";
import MenuElement from "./MenuElement";
import LogoElement from "./LogoElement";
import { Seed } from "../models/Seed";

type Props = {
    cellSize: number
    initMode: number
}
export default function GameElement(props: Props) {
    const [field, setField] = React.useState<Field | null>(null)
    const [seleted, setSelected] = React.useState<Point | null>(null)
    const [mode, setMode] = React.useState<number>(props.initMode)
    const [init, setInit] = React.useState<boolean>(false)

    useEffect(() => {
        reload()
    }, [mode])

    const reload = () => {
        const runes_hiragana = 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんがぎくげこざじずぜぞだぢづでどばびぶべぼぱぴぷぺぽっぁぃぅぇぉ'.split('')
        const runes_english = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
        const runes_pokemon_ja = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンガギクゲコザジズゼゾダヂヅデドバビブベボパピプペポッァィゥェォー'.split('')
        let seed: Seed | null = null
        const searchParams = new URLSearchParams(window.location.search)
        if (!init && searchParams.has('code')) {
            const seedStr = searchParams.get('code')
            if (seedStr) {
                seed = Seed.decode(seedStr)
                if (!seed) {
                    console.log("INVALID SEED:" + seedStr)
                }
            }
            setInit(true)
        } else {
            history.pushState("", document.title, window.location.pathname);
        }
        switch (mode) {
            case 1:
                setField(Field.createField(runes_hiragana, word_japanese2048, 4, undefined, seed))
                break;
            case 2:
                setField(Field.createField(runes_english, word_english2048, 4, undefined, seed))
                break;
            case 3:
                setField(Field.createField(runes_pokemon_ja, word_pokemon_japanese, 4, undefined, seed))
                break;
            case 4:
                setField(Field.createField(runes_english, word_pokemon_english, 4, undefined, seed))
                break;
        }
    }

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

    const share = () => {
        if (field) {
            field.share()
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
            <MenuElement
                mode={mode}
                changeMode={(mode: number) => setMode(mode)}
                reload={() => reload()}
                share={() => { share() }}
            />
            <LogoElement></LogoElement>
        </div>
    )
}