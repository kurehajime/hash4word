import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import './GameButtonElement.css'
export default function GameButtonElement() {
    const { t } = useTranslation()

    return (
        <div className="gameButtonElementBox">
            <Link to="/">
                <button className="gameButtonElement">{t('back_game1')}<br />{t('back_game2')}</button>
            </Link>
        </div>
    )
}