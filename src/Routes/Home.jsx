import { useContext, useEffect, useState } from 'react'

import { Header } from '../Components/Navbar.jsx'
import { Item } from '../Components/Items/Item.jsx'
import { Form } from '../Components/Form/Forms.jsx'
import { RequestContext, FilterContext } from '../Contexts/Context.jsx'
import { ErrorBoundary, useErrorBoundary } from 'react-error-boundary'
import { MonsterErrorPage } from '../Components/Error/RouterErrorPage.jsx'
import { Loader } from '../Components/Loader.jsx'
import { Footer } from '../Components/Footer.jsx'

export function Home() {
    const { request } = useContext(RequestContext)
    const [error, setError] = useState(null)

    useEffect(() => {
        document.title = 'Find a Storage'
    })
    return (
        <>
            {request ? <div>
                <ErrorBoundary FallbackComponent={MonsterErrorPage}>
                    < Header />
                    <Form title={'Search Gas By'} />
                    <Item />
                    <Footer />
                </ErrorBoundary>
            </div> :
                <Loader />
            }
        </>
    )
}