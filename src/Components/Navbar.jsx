import './../CSS/Navbar.css'
import './../CSS/Index.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from './../assets/Logos/8.png'


export function Header() {
    let [state, setState] = useState('disable')
    return (
        <article className='navbar shadow'>
            <header className='flex'>
                <section className='menuLines' onClick={e => state != 'is-active' ? setState('is-active') : setState('disable')}>
                    <span></span>
                    <span></span>
                    <span></span>
                </section>
                <section className='Logo'>
                    <Link to={'/'}>
                        <div className='logo-box'></div>
                    </Link> </section>
                <section className='mapIcon'>
                    <Link to={'/NearbySearch'} ><ion-icon name="map-outline"></ion-icon></Link> {/* this have to be a link to "Search Nearby" */}
                </section>
            </header>
            <section className={`menuOptions shadow ${state}`}>
                <span>
                    <ion-icon name="home-outline"></ion-icon>
                    <Link to={`/`}>Home</Link>
                </span>
                <span>
                    <ion-icon name="storefront-outline"></ion-icon>
                    <Link to={`/findStore`}>Find a Store</Link>
                </span>
                <span>
                    <ion-icon name="logo-github"></ion-icon>
                    <a href="">Github</a>
                </span>
                <span>
                    <ion-icon name="link-outline"></ion-icon>
                    <a href="">See the code</a>
                </span>
                <span>
                    <ion-icon name="add-circle-outline"></ion-icon>
                    <a href="">More Projects</a>
                </span>
            </section>
        </article>
    )
}

