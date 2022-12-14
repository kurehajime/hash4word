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
    const [mouseX, setMouseX] = React.useState<number>(0)
    const [mouseY, setMouseY] = React.useState<number>(0)
    const [mouseStartX, setMouseStartX] = React.useState<number>(0)
    const [mouseStartY, setMouseStartY] = React.useState<number>(0)


    const touchStart = (event: Event) => {
        const e = event as PointerEvent
        const rect = (e.target as SVGSVGElement).getBoundingClientRect()
        const x = (e.clientX - window.pageXOffset - rect.left)
        const y = (e.clientY - window.pageYOffset - rect.top)
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
        const rect = (e.target as SVGSVGElement).getBoundingClientRect()
        const x = (e.clientX - window.pageXOffset - rect.left)
        const y = (e.clientY - window.pageYOffset - rect.top)
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
        width={FieldSize} height={FieldSize}
        className="field" >
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
        <rect x={0} y={0} width={FieldSize} height={FieldSize} opacity={0} ></rect>
    </svg >)
}