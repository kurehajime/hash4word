import "./MenuElement.css";
import { useTranslation } from 'react-i18next'
import RotatedButtonText from "../Share/RotatedButtonText";

type Props = {
    mode: number
    changeMode: (mode: number) => void
    reload: () => void
    share: () => void
}
export default function MenuElement(props: Props) {
    const { t } = useTranslation()
    const modeOptions = [
        { value: 1, label: "日本語 2048単語" },
        { value: 2, label: "English word 2048" },
        { value: 3, label: "ポケモン 全国図鑑" },
        { value: 4, label: "Pokémon Pokédex" },
    ]
    const selectedMode = modeOptions.find(option => option.value === props.mode) ?? modeOptions[0]
    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        props.changeMode(parseInt(e.target.value));
    }


    return (
        <div>
            <div className="dictionary">
                <div className="modeBox">
                    <select name="select" value={props.mode} onChange={onChange} className="mode">
                        {modeOptions.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    <div className="modeOverlay">
                        <RotatedButtonText lines={[selectedMode.label]} />
                    </div>
                </div>
            </div>
            <div className="buttons">
                <div className="share"><button className="share_button" onClick={() => { props.share() }}><RotatedButtonText lines={[t('share1'), t('share2')]} /></button></div>
                <div className="reload"><button className="reload_button" onClick={() => { props.reload() }}><RotatedButtonText lines={[t('newgame')]} /></button></div>
            </div>
        </div>
    )
}
