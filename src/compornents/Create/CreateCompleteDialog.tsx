import { useTranslation } from 'react-i18next'
import type { CSSProperties } from 'react'
import { createPortal } from 'react-dom'
import toast, { Toaster } from 'react-hot-toast'
import Marquee from 'react-fast-marquee'
import { InputField } from '../../models/InputField'
import copyIcon from '../../assets/copy.svg'
import RotatedButtonText from '../Share/RotatedButtonText'
import { MarqueeRowConfig, useResponsiveMarqueeRows } from '../Share/useResponsiveMarqueeRows'
import './CreateCompleteDialog.css'

type Props = {
    inputField: InputField
    message: string
    changeMessage: (message: string) => void
    close: () => void
}

const marqueeRowConfigs: MarqueeRowConfig[] = [
    { topRatio: 0.14, angle: -12, portraitAngle: -10, speed: 82, direction: "left" },
    { topRatio: 0.32, angle: 28, portraitAngle: 18, speed: 190, direction: "left" },
    { topRatio: 0.52, angle: -16, portraitAngle: -12, speed: 42, direction: "right" },
    { topRatio: 0.72, angle: 17, portraitAngle: 14, speed: 96, direction: "right" },
]

export default function CreateCompleteDialog(props: Props) {
    const { t } = useTranslation()
    const url = props.inputField.encode(props.message)
    const keywords = props.inputField.keywords()
    const marqueeRows = useResponsiveMarqueeRows(marqueeRowConfigs)

    return createPortal(
        <div className="createCompleteDialog">
            <div className="createCompleteKeywordMarquee">
                {marqueeRows.map((row, index) => (
                    <div
                        className="createCompleteKeywordMarqueeRow"
                        key={index}
                        style={{
                            top: `${row.top}px`,
                            width: `${row.width}px`,
                            "--marquee-row-scale": row.scale,
                            transform: `translateX(-50%) rotate(${row.angle}deg)`,
                        } as CSSProperties}
                    >
                        <Marquee
                            speed={row.speed}
                            direction={row.direction}
                            autoFill
                            pauseOnHover={false}
                        >
                            <span className="createCompleteKeywordMarqueeText">{keywords[index]}</span>
                        </Marquee>
                    </div>
                ))}
            </div>
            <button
                className="createCompleteDialogClose"
                aria-label={t('close')}
                onClick={() => props.close()}
            >
                ×
            </button>
            <div className="createCompleteDialogContent">
                <label className="createCompleteMessageLabel" htmlFor="clear-message">
                    {t('clear_message')}
                </label>
                <input
                    id="clear-message"
                    className="createCompleteMessageInput"
                    type="text"
                    value={props.message}
                    onChange={(e) => props.changeMessage(e.target.value)}
                />
                <label className="createCompleteUrlLabel" htmlFor="share-url">
                    {t('share_url')}
                </label>
                <div className="createCompleteUrlBox">
                    <input
                        id="share-url"
                        className="createCompleteUrlInput"
                        type="text"
                        value={url}
                        readOnly
                        onFocus={(e) => e.target.select()}
                    />
                    <button
                        className="createCompleteCopyButton"
                        aria-label={t('copy_url')}
                        onClick={() => {
                            navigator.clipboard.writeText(url)
                            toast(t('copied'), {
                                duration: 2000,
                                position: 'bottom-center',
                            })
                        }}
                    >
                        <img className="createCompleteCopyIcon" src={copyIcon} alt="" aria-hidden="true" />
                    </button>
                </div>
                <button
                    className="createCompleteShareButton"
                    onClick={() => props.inputField.share(props.message)}
                >
                    <RotatedButtonText lines={[t('share1'), t('share2')]} />
                </button>
                <Toaster />
            </div>
        </div>,
        document.body
    )
}
