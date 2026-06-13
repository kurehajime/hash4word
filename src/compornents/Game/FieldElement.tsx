import React, { useEffect, useRef } from "react"
import { Field } from "../../models/Field"
import { Point } from "../../models/Point"
import CellElement from "./CellElement"
import CellShadowElement from "./CellShadowElement"
import "./FieldElement.css"
import ScoreElement from "./ScoreElement"

type Props = {
    cellSize: number
    field: Field
    clicked: (point: Point, touched: boolean) => void
    seleted: Point | null
    touched: boolean
}
export default function FieldElement(props: Props) {
    const ref = useRef<SVGSVGElement>(null);
    const cellSize = props.cellSize
    const size = props.field.size
    const FieldSize = cellSize * size
    const shadowPadding = 10
    const [mouseX, setMouseX] = React.useState<number>(0)
    const [mouseY, setMouseY] = React.useState<number>(0)
    const [mouseStartX, setMouseStartX] = React.useState<number>(0)
    const [mouseStartY, setMouseStartY] = React.useState<number>(0)

    const pointerPosition = (event: PointerEvent): Point | null => {
        const svg = ref.current
        const rect = svg?.getBoundingClientRect()
        if (!svg || !rect || rect.width === 0 || rect.height === 0) {
            return null
        }
        const svgWidth = svg.width.baseVal.value
        const svgHeight = svg.height.baseVal.value
        return {
            x: (event.clientX - rect.left) * (svgWidth / rect.width),
            y: (event.clientY - rect.top) * (svgHeight / rect.height),
        }
    }

    const touchStart = (event: Event) => {
        const e = event as PointerEvent
        const point = pointerPosition(e)
        if (!point) {
            return
        }
        const x = point.x
        const y = point.y
        const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches
        if (!props.seleted) {
            setMouseX(x)
            setMouseY(y)
            setMouseStartX(x)
            setMouseStartY(y)
            clicked(x, y, isTouch)
        } else {
            setMouseX(x)
            setMouseY(y)
            clicked(x, y)
        }
        e.preventDefault()
    }
    const touchEnd = (event: Event) => {
        const e = event as PointerEvent
        if (props.seleted) {
            const x = mouseX
            const y = mouseY
            if (Math.sqrt((x - mouseStartX) ** 2 + (y - mouseStartY) ** 2) < 20) {
                return;
            }
            setMouseX(x)
            setMouseY(y)
            clicked(x, y, true)
        }
        e.preventDefault()
    }

    const touchMove = (event: Event) => {
        const e = event as PointerEvent
        const point = pointerPosition(e)
        if (!point) {
            return
        }
        const x = point.x
        const y = point.y
        setMouseX(x)
        setMouseY(y)
    }

    const clicked = (x: number, y: number, touched = false) => {
        props.clicked({ x: Math.floor(x / cellSize), y: Math.floor(y / cellSize) }, touched)
    }

    useEffect(() => {
        ref.current?.addEventListener("pointerdown", touchStart)
        ref.current?.addEventListener("pointerup", touchEnd)
        ref.current?.addEventListener("pointermove", touchMove)
        return () => {
            ref.current?.removeEventListener("pointerdown", touchStart)
            ref.current?.removeEventListener("pointerup", touchEnd)
            ref.current?.removeEventListener("pointermove", touchMove)
        }
    },)


    return (<svg
        ref={ref}
        width={FieldSize + shadowPadding} height={FieldSize + shadowPadding}
        className="field" >
        <defs>
            <pattern id="panel-back-screentone" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <rect width="4" height="4" fill="#000000" />
                <line x1="0" y1="0" x2="0" y2="4" stroke="#ff006a" strokeWidth="0.75" />
            </pattern>
            <filter id="grunge-text" x="-20%" y="-20%" width="140%" height="140%">
                <feTurbulence type="fractalNoise" baseFrequency="0.14" numOctaves="3" seed="8" result="noise" />
                <feColorMatrix
                    in="noise"
                    type="matrix"
                    values="0 0 0 0 0
                            0 0 0 0 0
                            0 0 0 0 0
                            1 0 0 0 0"
                    result="noiseAlpha"
                />
                <feComponentTransfer in="noiseAlpha" result="grungeAlpha">
                    <feFuncA type="discrete" tableValues="0 0 1 1 1 1 1 1" />
                </feComponentTransfer>
                <feComposite in="SourceGraphic" in2="grungeAlpha" operator="in" />
            </filter>
        </defs>
        <ScoreElement
            field={props.field}
            cellSize={cellSize}
        />
        {props.field.Cells.map((cell, index) => {
            const selected = props.seleted !== null && props.seleted.x === cell.x && props.seleted.y === cell.y
            if (selected) {
                return;
            }
            return <CellShadowElement
                key={index}
                cell={cell}
                x={cell.x * cellSize}
                y={cell.y * cellSize}
                mouseX={0}
                mouseY={0}
                cellSize={cellSize} selected={false} />
        })
        }
        {props.field.Cells.map((cell, index) => {
            const selected = props.seleted !== null && props.seleted.x === cell.x && props.seleted.y === cell.y
            if (selected) {
                return;
            }
            return <CellElement
                key={index}
                cell={cell}
                x={cell.x * cellSize}
                y={cell.y * cellSize}
                mouseX={0}
                mouseY={0}
                cellSize={cellSize}
                selected={selected}
                touched={props.touched}
            />
        })
        }
        {props.field.Cells.map((cell, index) => {
            const selected = props.seleted !== null && props.seleted.x === cell.x && props.seleted.y === cell.y
            if (!selected) {
                return;
            }
            return <CellElement
                key={999 + index}
                cell={cell}
                x={cell.x * cellSize}
                y={cell.y * cellSize}
                mouseX={mouseX - (cellSize * 1.05) / 2}
                mouseY={mouseY - (cellSize * 1.05) / 2}
                cellSize={cellSize}
                selected={selected}
                touched={props.touched}
            />
        })
        }
        <rect x={0} y={0} width={FieldSize} height={FieldSize} opacity={0} pointerEvents="none" ></rect>
    </svg >)
}
