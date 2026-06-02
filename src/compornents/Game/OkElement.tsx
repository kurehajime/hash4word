import { Field } from "../../models/Field"
import goodIcon from "../../assets/good.svg"
import "./OkElement.css"

type Props = {
    field: Field
}
export default function OkElement(props: Props) {
    return (<div
        className="ok"
    >{props.field.valid() ? <img className="okIcon" src={goodIcon} alt="clear" /> : ""}
    </div>)
}
