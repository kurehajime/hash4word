import './LogoElement.css';
import { useTranslation } from 'react-i18next'
import RotatedButtonText from './RotatedButtonText';
import titleEnImage from '../../assets/title_en.png';
import titleJaImage from '../../assets/title_ja.png';
type Props = {
    create: boolean
}

export default function LogoElement(props: Props) {
    const { t, i18n } = useTranslation()
    const isEnglish = i18n.language.toLowerCase().startsWith("en")
    const languageClass = isEnglish ? "english" : "japanese"
    const titleImage = isEnglish ? titleEnImage : titleJaImage

    return (
        <div className={`logoBox ${languageClass}`}>
            <div className="logo">
                <a href="https://github.com/kurehajime">
                    <img className="titleImage" src={titleImage} alt="YONTANGO" />
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
