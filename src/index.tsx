import ReactDOM from 'react-dom/client'
import './index.css'
import GameElement from './compornents/GameElement'
import { HashRouter, Route, Routes } from 'react-router-dom'
import CreateElement from './compornents/CreateElement'

import './i18n/configs'
const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)
const init_mode = (navigator.language).toLowerCase().includes("ja") ? 1 : 2
root.render(<div className='container'>
    <HashRouter>
        <Routes >
            <Route path="/create" element={
                <CreateElement
                    cellSize={80}
                    init_mode={init_mode}
                ></CreateElement>
            } />
            <Route path="*" element={
                <GameElement
                    cellSize={80}
                    initMode={init_mode}
                ></GameElement>
            } />
        </Routes>
    </HashRouter>


</div>)