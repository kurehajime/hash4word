import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import RotatedButtonText from '../Share/RotatedButtonText'
import './CreateButtonElement.css'
export default function CellElement() {
    const { t } = useTranslation()

    return (
        <div className="createButtonBox">
            <Link to="/create">
                <button className="createButton"><RotatedButtonText lines={[t('create1'), t('create2')]} /></button>
            </Link>
        </div>
    )
}
