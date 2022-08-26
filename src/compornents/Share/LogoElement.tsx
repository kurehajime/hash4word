import './LogoElement.css';
import { useTranslation } from 'react-i18next'

export default function LogoElement() {
    const { t } = useTranslation()

    return (
        <div className="logoBox">
            <div className="logo">
                <a href="https://github.com/kurehajime/hash4word">HASH4WORD</a>
            </div>
            <p>{t('description1')}<br />{t('description2')}</p>
        </div>
    )
}