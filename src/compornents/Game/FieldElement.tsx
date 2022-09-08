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




    const mouseClick = (e: React.PointerEvent<SVGSVGElement>) => {
        const x = e.nativeEvent.offsetX
        const y = e.nativeEvent.offsetY
        setMouseX(x)
        setMouseY(y)
        clicked(x, y)
        e.preventDefault()
    }

    const touchStart = (event: Event) => {
        const e = event as TouchEvent
        const rect = (e.target as SVGSVGElement).getBoundingClientRect()
        const x = (e.touches[0].clientX - window.pageXOffset - rect.left)
        const y = (e.touches[0].clientY - window.pageYOffset - rect.top)
        if (!props.seleted) {
            setMouseX(x)
            setMouseY(y)
            setMouseStartX(x)
            setMouseStartY(y)
            clicked(x, y, true)
        } else {
            setMouseX(x)
            setMouseY(y)
            clicked(x, y)
        }
        e.preventDefault()
    }
    const touchEnd = (event: Event) => {
        const e = event as TouchEvent
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
        const e = event as TouchEvent
        const rect = (e.target as SVGSVGElement).getBoundingClientRect()
        const x = (e.touches[0].clientX - window.pageXOffset - rect.left)
        const y = (e.touches[0].clientY - window.pageYOffset - rect.top)
        setMouseX(x)
        setMouseY(y)
    }
    const mouseMove = (e: React.PointerEvent<SVGSVGElement>) => {
        const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches
        const x = e.nativeEvent.offsetX
        const y = e.nativeEvent.offsetY
        if (!isTouch) {
            setMouseX(x)
            setMouseY(y)
        }
    }

    const clicked = (x: number, y: number, touched = false) => {
        props.clicked({ x: Math.floor(x / cellSize), y: Math.floor(y / cellSize) }, touched)
    }

    useEffect(() => {
        ref.current?.addEventListener("touchstart", touchStart)
        ref.current?.addEventListener("touchend", touchEnd)
        ref.current?.addEventListener("touchmove", touchMove)
        return () => {
            ref.current?.removeEventListener("touchstart", touchStart)
            ref.current?.removeEventListener("touchend", touchEnd)
            ref.current?.removeEventListener("touchmove", touchMove)
        }
    },)


    return (<svg
        ref={ref}
        width={FieldSize} height={FieldSize} onClick={mouseClick}
        onPointerMove={mouseMove}
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