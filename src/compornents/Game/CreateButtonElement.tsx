import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import './CreateButtonElement.css'
export default function CellElement() {
    const { t } = useTranslation()

    return (
        <div className="createButtonBox">
            <Link to="/create">
                <button className="createButton">{t('create1')}<br />{t('create2')}</button>
            </Link>
        </div>
    )
}