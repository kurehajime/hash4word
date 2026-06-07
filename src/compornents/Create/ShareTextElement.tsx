import toast, { Toaster } from 'react-hot-toast';
import copyIcon from '../../assets/copy.svg'
import './ShareTextElement.css';
type Props = {
    url: string
    message: string
    changeMessage: (message: string) => void
}
export default function ShareTextElement(props: Props) {
    return (
        <>
            <div className="clearMessageLabel">
                クリア時メッセージ:
            </div>
            <div className="clearMessage">
                <input type="text" value={props.message}
                    onChange={(e) => props.changeMessage(e.target.value)}
                ></input>
            </div>
            <div className="shareTextLabel">
                SHARE URL:
            </div>
            <div className="shareText">
                <input type="text" value={props.url} readOnly
                    onFocus={(e) => e.target.select()}
                ></input>
                <button className="shareTextCopyButton" onClick={() => {
                    navigator.clipboard.writeText(props.url);
                    toast('Copied to clipboard!', {
                        duration: 2000,
                        position: 'bottom-center',
                    });
                }}>
                    <img className="shareTextCopyIcon" src={copyIcon} alt="" aria-hidden="true" />
                </button>
                <Toaster />
            </div>
        </>


    )
}
