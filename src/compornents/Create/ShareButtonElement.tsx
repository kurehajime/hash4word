import { useTranslation } from 'react-i18next'
import { InputField } from '../../models/InputField'
import RotatedButtonText from '../Share/RotatedButtonText'
import './ShareButtonElement.css'
type Props = {
    inputField: InputField | null
    message: string
}
export default function ShareButtonElement(props: Props) {
    const { t } = useTranslation()

    return (
        <div className="shareButtonElementBox">
            <button className="shareButtonElement" onClick={
                () => {
                    props.inputField?.share(props.message)
                }
            }><RotatedButtonText lines={[t('share1'), t('share2')]} /></button>
        </div>
    )
}
