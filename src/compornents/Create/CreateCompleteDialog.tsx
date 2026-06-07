import { useTranslation } from 'react-i18next'
import { createPortal } from 'react-dom'
import toast, { Toaster } from 'react-hot-toast'
import Marquee from 'react-fast-marquee'
import { InputField } from '../../models/InputField'
import copyIcon from '../../assets/copy.svg'
import RotatedButtonText from '../Share/RotatedButtonText'
import './CreateCompleteDialog.css'

type Props = {
    inputField: InputField
    message: string
    changeMessage: (message: string) => void
    close: () => void
}

export default function CreateCompleteDialog(props: Props) {
    const { t } = useTranslation()
    const url = props.inputField.encode(props.message)
    const keywords = props.inputField.keywords()
    const marqueeRows = [
        { top: 115, angle: -12, speed: 82, direction: "left" as const },
        { top: 255, angle: 28, speed: 190, direction: "left" as const },
        { top: 430, angle: -16, speed: 42, direction: "right" as const },
        { top: 595, angle: 17, speed: 96, direction: "right" as const },
    ]

    return createPortal(
        <div className="createCompleteDialog">
            <div className="createCompleteKeywordMarquee">
                {marqueeRows.map((row, index) => (
                    <div
                        className="createCompleteKeywordMarqueeRow"
                        key={index}
                        style={{
                            top: `${row.top}px`,
                            transform: `translateX(-50%) rotate(${row.angle}deg)`,
                        }}
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
