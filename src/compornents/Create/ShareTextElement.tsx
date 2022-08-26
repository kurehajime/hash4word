import './ShareTextElement.css';
type Props = {
    url: string
}
export default function ShareTextElement(props: Props) {
    return (
        <div className="shareText">
            <input type="text" value={props.url} readOnly
                onFocus={(e) => e.target.select()}
            ></input>
            <button onClick={() => {
                navigator.clipboard.writeText(props.url);
            }}>📋</button>
        </div>

    )
}