import { useEffect, useRef } from "react";

import './../../CSS/ErrorPage.css'
import { Button3 } from "../Buttons/Buttons";
import { Header } from "../Navbar";


export function MonsterErrorPage({ error, resetErrorBoundary }) {
    // const error = useRouteError()
    const ref = useRef(null)

    useEffect(() => {
        const height = window.screen.height
        ref.current.style.height = `${height}px`
        console.log(error)
    }, [])

    return (
        <>
            {!error ?
                <>
                    <Header />
                    <article ref={ref} className="error-container flex">
                        <span className="h1">AHHHHH! YOU FOUND ME!</span>
                        <span className="h6">Unfortunately you have also found an elusive  <strong>404 error </strong> page, </span>
                        <span className="h6">which means the page you were looking for is no longer here.</span>
                        <span className="h6">{error}</span>
                        <section className="image flex">
                            <img src="./Images/Monster.png" alt="cables" />
                        </section>
                        <section className="container-wall">
                            <Button3 text={'Take me to Home Page'} color={'primary'} path={'/'} />
                        </section>
                    </article> </> : <>  {/* Unplugged Component here */}
                    <article ref={ref} className="error-container flex">
                        <span className="h1">AHHHHH! YOU FOUND ME!</span>
                        {/* <span className="h6">Unfortunately you have also found an elusive 404 error page, </span> */}
                        {/* <span className="h6">which means the page you were looking for is no longer here.</span> */}
                        <span className="h6">Unplugged Component Here</span>
                        {/* <span className="p-large">Looks like something was unplugged</span> */}
                        <section className="image flex">
                            {/* <img src="./Images/Unplugged_Cables.png" alt="cables" /> */}
                            <img src="./Images/Monster.png" alt="cables" />
                        </section>
                        <section className="container-wall">
                            <Button3 text={'Take me to Home Page'} color={'primary'} path={'/'} />
                        </section>
                    </article>
                </>}

        </>
    )
}