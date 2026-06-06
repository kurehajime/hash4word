import './LogoElement.css';
import { useTranslation } from 'react-i18next'
import RotatedButtonText from './RotatedButtonText';
import titleImage from '../../assets/title.png';
type Props = {
    create: boolean
}

export default function LogoElement(props: Props) {
    const { t } = useTranslation()

    return (
        <div className="logoBox">
            <div className="logo">
                <a href="https://github.com/kurehajime">
                    <img className="titleImage" src={titleImage} alt="HASH4WORD" />
                </a>
            </div>
            <p>
                <RotatedButtonText lines={[
                    props.create ? t('create_description1') : t('description1'),
                    props.create ? t('create_description2') : t('description2'),
                ]} animate highlightText={props.create ? t('create_description_highlight') : undefined} />
            </p>
        </div>
    )
}
