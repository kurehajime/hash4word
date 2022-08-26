import toast, { Toaster } from 'react-hot-toast';
import './ShareTextElement.css';
type Props = {
    url: string
}
export default function ShareTextElement(props: Props) {
    return (
        <>
            <div className="shareTextLabel">
                SHARE URL:
            </div>
            <div className="shareText">
                <input type="text" value={props.url} readOnly
                    onFocus={(e) => e.target.select()}
                ></input>
                <button onClick={() => {
                    navigator.clipboard.writeText(props.url);
                    toast('Copied to clipboard!', {
                        duration: 2000,
                        position: 'bottom-center',
                    });
                }}>📋</button>
                <Toaster />
            </div>
        </>


    )
}