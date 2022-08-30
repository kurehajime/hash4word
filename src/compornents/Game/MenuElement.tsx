import "./MenuElement.css";
import { useTranslation } from 'react-i18next'

type Props = {
    mode: number
    changeMode: (mode: number) => void
    reload: () => void
    share: () => void
}
export default function MenuElement(props: Props) {
    const { t } = useTranslation()
    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        props.changeMode(parseInt(e.target.value));
    }


    return (
        <div>
            <div className="dictionary">
                <select name="select" onChange={onChange} className="mode">
                    <option value="1">日本語 2048単語</option>
                    <option value="2">English word 2048</option>
                    <option value="3">ポケモン 全国図鑑</option>
                    <option value="4">Pokémon Pokédex</option>
                </select>
            </div>
            <div className="buttons">
                <div className="share"><button className="share_button" onClick={() => { props.share() }}>{t('share1')}<br />{t('share2')}</button></div>
                <div className="reload"><button className="reload_button" onClick={() => { props.reload() }}>{t('newgame')}</button></div>
            </div>
        </div>
    )
}