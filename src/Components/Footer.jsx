import { Link } from 'react-router-dom'
import '../CSS/Footer.css'
import portfolio from '../assets/icons/online-resume.png'
export function Footer() {
    return (
        <>
            <article className='footer'>
                <section>
                    <span className='footer-Message h6'>
                        Living, learning, & leveling up one day at a time.
                    </span>
                </section>
                <section className='links flex'>
                    <span className='portfolio'>
                        <Link to='https://sergioparral.github.io/PortFolio/' target='blank'>
                            <img className='logo' src={portfolio} alt="portfolio" />
                        </Link>
                    </span>
                    <span >
                        <Link to='https://github.com/parranopolis' target='blank'>
                            <ion-icon className='logo' name="logo-github"></ion-icon>
                        </Link>
                    </span>
                    <span>
                        <Link to='https://www.linkedin.com/in/sergioparral/' target='blank'>
                            <ion-icon className='logo' name="logo-linkedin"></ion-icon>
                        </Link>
                    </span>
                </section>
            </article>
        </>
    )
}