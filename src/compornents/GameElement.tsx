import React from "react";
import { useEffect } from "react";
import { Field } from "../models/Field";
import FieldElement from "./Game/FieldElement";
import word_japanese2048 from '../assets/japanese2048.json'
import word_english2048 from '../assets/english2048.json'
import word_pokemon_japanese from '../assets/pokemon_japanese.json'
import word_pokemon_english from '../assets/pokemon_english.json'
import { Point } from "../models/Point";
import MenuElement from "./Game/MenuElement";
import LogoElement from "./Share/LogoElement";
import { Seed } from "../models/Seed";
import { Message } from "../models/Message";
import CreateButtonElement from "./Game/CreateButtonElement";
import BackgroundMarquee from "./Share/BackgroundMarquee";
import ClearMessageMarquee from "./Share/ClearMessageMarquee";
import { languageFromSearch } from "../i18n/language";

type Props = {
    cellSize: number
    initMode: number
}
export default function GameElement(props: Props) {
    const [field, setField] = React.useState<Field | null>(null)
    const [seleted, setSelected] = React.useState<Point | null>(null)
    const [mode, setMode] = React.useState<number>(props.initMode)
    const [init, setInit] = React.useState<boolean>(false)
    const [touched, setTouched] = React.useState<boolean>(false)
    const [clearMessage, setClearMessage] = React.useState<string>("")
    const [hideGameControls, setHideGameControls] = React.useState<boolean>(false)
    const [showPanelHint, setShowPanelHint] = React.useState<boolean>(false)
    const [panelInteracted, setPanelInteracted] = React.useState<boolean>(false)

    useEffect(() => {
        reload()
    }, [mode])

    useEffect(() => {
        setShowPanelHint(false)
        if (!field || panelInteracted) {
            return
        }
        const timerId = window.setTimeout(() => {
            setShowPanelHint(true)
        }, 3000)
        return () => window.clearTimeout(timerId)
    }, [field, panelInteracted])

    const reload = () => {
        setShowPanelHint(false)
        setPanelInteracted(false)
        const runes_hiragana = 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんがぎくげこざじずぜぞだぢづでどばびぶべぼぱぴぷぺぽっぁぃぅぇぉ'.split('')
        const runes_english = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
        const runes_pokemon_ja = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンガギクゲコザジズゼゾダヂヅデドバビブベボパピプペポッァィゥェォー'.split('')
        let seed: Seed | null = null
        const searchParams = new URLSearchParams(window.location.search)
        if (!init && searchParams.has('code')) {
            setHideGameControls(true)
            const seedStr = searchParams.get('code')
            if (seedStr) {
                seed = Seed.decode(seedStr)
                if (!seed) {
                    console.log("INVALID SEED:" + seedStr)
                }
            }
            const messageStr = searchParams.get('message')
            const decodedMessage = messageStr ? Message.decode(messageStr) : ""
            setClearMessage(decodedMessage)
            if (import.meta.env.DEV && searchParams.has('message')) {
                console.log("MESSAGE:" + decodedMessage)
            }
            setInit(true)
        } else {
            setClearMessage("")
            setHideGameControls(false)
            const language = languageFromSearch(window.location.search)
            const nextSearch = language ? `?lang=${language}` : ""
            history.pushState("", document.title, `${window.location.pathname}${nextSearch}`);
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

    const clicked = (point: Point, touched = false) => {
        if (field) {
            if (!field.getCell(point).enabled || field.getCell(point).fixed) {
                return
            }
            setPanelInteracted(true)
            setShowPanelHint(false)
            if (seleted) {
                setField(field.swap(seleted, point))
                setSelected(null)
                setTouched(false)
            } else {
                setSelected({ ...point })
                setTouched(touched)
            }
        }
    }

    const share = () => {
        if (field) {
            field.share()
        }
    }
    return (
        <div style={{ position: "relative" }}>
            {field?.valid() ? <BackgroundMarquee /> : <></>}
            {field?.valid() && clearMessage !== "" ? <ClearMessageMarquee message={clearMessage} /> : <></>}
            <div style={{ position: "relative", zIndex: 1 }}>
                {field ? <FieldElement
                    cellSize={props.cellSize}
                    field={field}
                    clicked={clicked}
                    seleted={seleted}
                    touched={touched}
                    showPanelHint={showPanelHint}
                /> : <></>}
                <MenuElement
                    mode={mode}
                    changeMode={(mode: number) => setMode(mode)}
                    reload={() => reload()}
                    share={() => { share() }}
                    onlyReload={hideGameControls}
                />
                <LogoElement create={false}></LogoElement>
                {!hideGameControls ? <CreateButtonElement></CreateButtonElement> : <></>}
            </div>
        </div>
    )
}
