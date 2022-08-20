import ReactDOM from 'react-dom/client'
import './index.css'
import GameElement from './compornents/GameElement'

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)
const init_mode = (navigator.language).toLowerCase().includes("ja") ? 1 : 2
root.render(<div className='container'>
    <GameElement
        cellSize={50}
        initMode={init_mode}
    ></GameElement>
</div>)