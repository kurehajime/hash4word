import './LogoElement.css';
import { useTranslation } from 'react-i18next'
type Props = {
    create: boolean
}

export default function LogoElement(props: Props) {
    const { t } = useTranslation()

    return (
        <div className="logoBox">
            <div className="logo">
                <a href="https://github.com/kurehajime">HASH4WORD</a>
            </div>
            <p>{props.create ? t('create_description1') : t('description1')}<br />
                {props.create ? t('create_description2') : t('description2')}</p>
        </div>
    )
}