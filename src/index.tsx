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
        const breakpointQuery = window.matchMedia('(max-width: 760px)')
        const portraitQuery = window.matchMedia('(orientation: portrait)')
        const viewportSignature = () => [
            window.innerWidth,
            window.innerHeight,
            window.visualViewport?.width ?? 0,
            window.visualViewport?.height ?? 0,
            document.documentElement.clientWidth,
            document.documentElement.clientHeight,
            breakpointQuery.matches ? 'mobile' : 'desktop',
            portraitQuery.matches ? 'portrait' : 'landscape',
        ].join(':')
        let lastViewportSignature = ''
        const updateScale = () => {
            const appWidth = 730
            const appHeight = 740
            lastViewportSignature = viewportSignature()
            const viewportWidth = window.visualViewport?.width ?? window.innerWidth
            const viewportHeight = window.visualViewport?.height ?? window.innerHeight
            const bodyStyle = getComputedStyle(document.body)
            const horizontalPadding = parseFloat(bodyStyle.paddingLeft) + parseFloat(bodyStyle.paddingRight)
            const verticalPadding = parseFloat(bodyStyle.paddingTop) + parseFloat(bodyStyle.paddingBottom)
            const widthScale = (viewportWidth - horizontalPadding) / appWidth
            const heightScale = (viewportHeight - verticalPadding) / appHeight
            const isDesktop = viewportWidth > 760
            const scale = isDesktop ? Math.min(widthScale, heightScale) : Math.min(1, widthScale)
            const currentScale = Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--app-scale'))
            if (!Number.isFinite(currentScale) || Math.abs(currentScale - scale) > 0.0001) {
                document.documentElement.style.setProperty('--app-scale', scale.toString())
            }
            window.dispatchEvent(new Event('app-scale-change'))
        }
        let frame = 0
        let timeouts: number[] = []
        const scheduleUpdateScale = () => {
            window.cancelAnimationFrame(frame)
            frame = window.requestAnimationFrame(updateScale)
        }
        const clearTimeouts = () => {
            timeouts.forEach(id => window.clearTimeout(id))
            timeouts = []
        }
        const scheduleSettledUpdateScale = () => {
            scheduleUpdateScale()
            clearTimeouts()
            timeouts = [50, 150, 350, 700].map(delay => window.setTimeout(scheduleUpdateScale, delay))
        }
        const checkViewport = () => {
            if (viewportSignature() !== lastViewportSignature) {
                scheduleSettledUpdateScale()
            }
        }
        const resizeObserver = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(scheduleSettledUpdateScale)
        resizeObserver?.observe(document.documentElement)
        resizeObserver?.observe(document.body)
        const interval = window.setInterval(checkViewport, 250)
        updateScale()
        window.addEventListener('resize', scheduleSettledUpdateScale)
        window.addEventListener('orientationchange', scheduleSettledUpdateScale)
        window.addEventListener('focus', scheduleSettledUpdateScale)
        window.addEventListener('pageshow', scheduleSettledUpdateScale)
        breakpointQuery.addEventListener('change', scheduleSettledUpdateScale)
        portraitQuery.addEventListener('change', scheduleSettledUpdateScale)
        window.visualViewport?.addEventListener('resize', scheduleSettledUpdateScale)
        window.visualViewport?.addEventListener('scroll', scheduleSettledUpdateScale)
        return () => {
            window.cancelAnimationFrame(frame)
            clearTimeouts()
            window.clearInterval(interval)
            resizeObserver?.disconnect()
            window.removeEventListener('resize', scheduleSettledUpdateScale)
            window.removeEventListener('orientationchange', scheduleSettledUpdateScale)
            window.removeEventListener('focus', scheduleSettledUpdateScale)
            window.removeEventListener('pageshow', scheduleSettledUpdateScale)
            breakpointQuery.removeEventListener('change', scheduleSettledUpdateScale)
            portraitQuery.removeEventListener('change', scheduleSettledUpdateScale)
            window.visualViewport?.removeEventListener('resize', scheduleSettledUpdateScale)
            window.visualViewport?.removeEventListener('scroll', scheduleSettledUpdateScale)
        }
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
