import ReactDOM from 'react-dom/client'
import './index.css'
import ja_word from './assets/ja/words.json'
import { Field } from './models/Field'
import FieldElement from './compornents/FieldElement'

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)
const runes = 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんがぎくげこざじずぜぞだぢづでどばびぶべぼぱぴぷぺぽ'.split('')
const field = Field.createField(runes, ja_word)
root.render(<div className='container'>
    <FieldElement
        cellSize={50}
        field={field}
    ></FieldElement>
</div>)