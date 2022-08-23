import "./MenuElement.css";

type Props = {
    mode: number
    changeMode: (mode: number) => void
    reload: () => void
    share: () => void
}
export default function MenuElement(props: Props) {
    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        props.changeMode(parseInt(e.target.value));
    }


    return (
        <div>
            <div className="dictionary">
                <select name="select" onChange={onChange} className="mode">
                    <option value="1">Japanese word 2048</option>
                    <option value="2">Engrish word 2048</option>
                    <option value="3">Pokemon Japanese</option>
                    <option value="4">Pokemon English</option>
                </select>
            </div>
            <div className="buttons">
                <div className="share"><button className="share_button" onClick={() => { props.share() }}>SHARE</button></div>
                <div className="reload"><button className="reload_button" onClick={() => { props.reload() }}>NEW<br />GAME</button></div>
            </div>
        </div>
    )
}