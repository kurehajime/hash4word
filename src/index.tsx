import ReactDOM from 'react-dom/client'
import './index.css'
import ja_word from './assets/ja/words.json'
import { Rule } from './Rule'

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)
const runes = 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんがぎくげこざじずぜぞだぢづでどばびぶべぼぱぴぷぺぽ'.split('')
const result = Rule.pick4word(runes, ja_word, 999)
console.log(result)







root.render(<div className='container'>
</div>)