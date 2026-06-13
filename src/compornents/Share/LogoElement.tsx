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
                <a href="https://github.com/kurehajime" aria-label="YONTANGO">
                    <svg className="titleImage" viewBox="0 0 160 80" role="img" aria-label="YONTANGO">
                        <title>YONTANGO</title>
                        <defs>
                            <filter id="title-image-grunge" x="-20%" y="-20%" width="140%" height="140%">
                                <feTurbulence type="fractalNoise" baseFrequency="0.4" numOctaves="3" seed="8" result="noise" />
                                <feColorMatrix
                                    in="noise"
                                    type="matrix"
                                    values="0 0 0 0 0
                                            0 0 0 0 0
                                            0 0 0 0 0
                                            1 0 0 0 0"
                                    result="noiseAlpha"
                                />
                                <feComponentTransfer in="noiseAlpha" result="grungeAlpha">
                                    <feFuncA type="discrete" tableValues="0 0 1 1 1 1 1 1" />
                                </feComponentTransfer>
                                <feComposite in="SourceGraphic" in2="grungeAlpha" operator="in" />
                            </filter>
                        </defs>
                        <image
                            href={titleImage}
                            x={0}
                            y={0}
                            width={160}
                            height={80}
                            preserveAspectRatio="xMidYMid meet"
                            filter="url(#title-image-grunge)"
                        />
                    </svg>
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
