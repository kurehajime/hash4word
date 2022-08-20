import "./DictionaryElement.css";

type Props = {
    mode: number
}
export default function DictionaryElement(props: Props) {
    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(e.target.value);
    }


    return (
        <div className="dictionary">
            <select name="select" onChange={onChange} className="mode">
                <option value="1">Japanese word 2048</option>
                <option value="2">Engrish word 2048</option>
                <option value="3">Pokemon Japanese</option>
                <option value="4">Pokemon English</option>
            </select>
        </div>
    )
}