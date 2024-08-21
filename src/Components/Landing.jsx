import './../CSS/Index.css'
import './../CSS/Landing.css'
import map from './../assets/Map.png'
import { Button3 } from './Buttons/Buttons'
import { Header } from './Navbar'
import { Footer } from './Footer'
import { useEffect } from 'react'


export function Landing() {
    useEffect(() => {
        document.title = 'Home'
    })
    return (
        <>
            <Header />
            <article className='landing-Banner'>
                <p className=''>Find the best</p>
                <p className='pPrimaryColor'>Gas Price</p>
                <Button3 text={'Find a Store'} color={'dark landingButton'} path={'/findStore'} />
            </article>
            <article className='landing-Purposes flex'>
                <section>
                    <img src={map} alt="Map" />
                </section>
                <section>
                    <span className='landing-title '>Different Purposes</span>
                    <p className='landing-text'>Different locations
                        not only mean
                        different prices,
                        but also different
                        types and grades of fuel,
                        Gasoline, Diesel, Midgrade, Premium, Regular</p>
                </section>
            </article>
            <article className='landing-Tools'>
                <span className='landing-title'>What You Can Do</span>
                <section className='Tools-Content'>
                    <section className='child1 shadow'>
                        <p className='landing-text'>Filter by different brands and grades of fuel based on your current location</p>
                        <div></div>
                    </section>
                    <section className='child2 shadow'>
                        <p className='landing-text'>See the rating and ranking that other users give to the gas station in question</p>
                        <div></div>
                    </section>
                    <section className='child3 shadow'>
                        <p className='landing-text'>Updated information obtained from Google Maps, address and telephone number for inquiries</p>
                        <div>
                        </div>
                    </section>
                </section>
            </article>
            <article className='landing-footer'>
                <section className='footerButton flex'>
                    <Button3 text={'Find a Store'} color={'dark landingButton shadow '} path={'/findStore'} />
                </section>
                <section>
                    <Footer />

                </section>
            </article>
        </>
    )
}