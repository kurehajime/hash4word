import React from 'react'
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

function App() {
    React.useEffect(() => {
        const updateScale = () => {
            const appWidth = 730
            const pagePadding = 20
            const scale = Math.min(1, (window.innerWidth - pagePadding) / appWidth)
            document.documentElement.style.setProperty('--app-scale', scale.toString())
        }
        updateScale()
        window.addEventListener('resize', updateScale)
        return () => window.removeEventListener('resize', updateScale)
    }, [])

    return <div className='container'>
        <div className="appViewport">
            <div className="appContent">
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
            </div>
        </div>


    </div>
}

root.render(<App />)
