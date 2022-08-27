import { Field } from "../../models/Field"
import "./OkElement.css"

type Props = {
    field: Field
}
export default function OkElement(props: Props) {
    return (<div
        className="ok"
    >{props.field.valid() ? "👍" : ""}
    </div>)
}