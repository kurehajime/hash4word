import { useTranslation } from 'react-i18next'
import RotatedButtonText from '../Share/RotatedButtonText'
import './CompleteButtonElement.css'

type Props = {
    complete: () => void
}

export default function CompleteButtonElement(props: Props) {
    const { t } = useTranslation()

    return (
        <div className="completeButtonElementBox">
            <button className="completeButtonElement" onClick={() => props.complete()}>
                <RotatedButtonText lines={[t('complete')]} />
            </button>
        </div>
    )
}
