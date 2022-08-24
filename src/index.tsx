import ReactDOM from 'react-dom/client'
import './index.css'
import GameElement from './compornents/GameElement'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CreateElement from './compornents/CreateElement'

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)
const init_mode = (navigator.language).toLowerCase().includes("ja") ? 1 : 2
root.render(<div className='container'>
    <BrowserRouter>
        <Routes >
            <Route path="/create" element={
                <CreateElement cellSize={80}></CreateElement>
            } />
            <Route path="*" element={
                <GameElement
                    cellSize={80}
                    initMode={init_mode}
                ></GameElement>
            } />
        </Routes>
    </BrowserRouter>


</div>)