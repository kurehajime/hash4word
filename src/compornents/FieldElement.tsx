import React from "react"
import { Field } from "../models/Field"
import { Point } from "../models/Point"
import CellElement from "./CellElement"
import "./FieldElement.css"
import ScoreElement from "./ScoreElement"

type Props = {
    cellSize: number
    field: Field
    clicked: (point: Point) => void
    seleted: Point | null
}
export default function FieldElement(props: Props) {
    const cellSize = props.cellSize
    const size = props.field.size
    const FieldSize = cellSize * size
    const [mouseX, setMouseX] = React.useState<number>(0)
    const [mouseY, setMouseY] = React.useState<number>(0)


    const mouseClick = (e: React.PointerEvent<SVGSVGElement>) => {
        const x = e.nativeEvent.offsetX
        const y = e.nativeEvent.offsetY
        setMouseX(x)
        setMouseY(y)
        clicked(x, y)
        e.preventDefault()
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
    const clicked = (x: number, y: number) => {
        props.clicked({ x: Math.floor(x / cellSize), y: Math.floor(y / cellSize) })
    }


    return (<svg width={FieldSize} height={FieldSize} onClick={mouseClick}
        onMouseMove={mouseMove} >
        <ScoreElement
            field={props.field}
            cellSize={cellSize}
        />
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
                mouseX={mouseX - cellSize / 2}
                mouseY={mouseY - cellSize / 2}
                cellSize={cellSize}
                selected={selected}
            />
        })
        }
        <rect x={0} y={0} width={FieldSize} height={FieldSize} opacity={0} ></rect>
    </svg >)
}