import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import GameElement from './compornents/GameElement'
import { HashRouter, Route, Routes } from 'react-router-dom'
import CreateElement from './compornents/CreateElement'

import './i18n/configs'
import { resolveLanguage } from './i18n/language'
const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)
const init_mode = resolveLanguage(window.location, navigator.language) === "ja" ? 1 : 2

function App() {
    React.useEffect(() => {
        const updateScale = () => {
            const appWidth = 730
            const appHeight = 740
            const bodyStyle = getComputedStyle(document.body)
            const horizontalPadding = parseFloat(bodyStyle.paddingLeft) + parseFloat(bodyStyle.paddingRight)
            const verticalPadding = parseFloat(bodyStyle.paddingTop) + parseFloat(bodyStyle.paddingBottom)
            const widthScale = (window.innerWidth - horizontalPadding) / appWidth
            const heightScale = (window.innerHeight - verticalPadding) / appHeight
            const isDesktop = window.innerWidth > 760
            const scale = isDesktop ? Math.min(widthScale, heightScale) : Math.min(1, widthScale)
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
