import { useRef, useEffect } from 'react'
import spinner from '../assets/spinner/4.png'
import './../CSS/Loader.css'

export function Loader() {
    const ref = useRef()
    useEffect(() => {
        const height = window.screen.height
        ref.current.style.height = `${height - 100}px`
    }, [])
    return (
        <>
            <div className='spinner-container' ref={ref}>
                <div className="spinner">
                    <img src={spinner} alt="spinner" />
                </div>
            </div>
        </>
    )
}