import { useTranslation } from 'react-i18next'
import { InputField } from '../../models/InputField'
import './ShareButtonElement.css'
type Props = {
    inputField: InputField | null
}
export default function ShareButtonElement(props: Props) {
    const { t } = useTranslation()

    return (
        <div className="shareButtonElementBox">
            <button className="shareButtonElement" onClick={
                () => {
                    props.inputField?.share()
                }
            }>{t('share1')}<br />{t('share2')}</button>
        </div>
    )
}