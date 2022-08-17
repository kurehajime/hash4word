import ReactDOM from 'react-dom/client'
import './index.css'
import GameElement from './compornents/GameElement'

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)

root.render(<div className='container'>
    <GameElement
        cellSize={50}
    ></GameElement>
</div>)