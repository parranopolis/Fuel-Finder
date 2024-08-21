import { useLocation, useNavigate } from "react-router-dom"
import { useContext, useEffect } from "react"
import { FilterProvider, RequestContext } from "../Contexts/Context"

import { ItemsDetail } from "../Components/Items/Item"
import { Header } from './../Components/Navbar'
import { Item } from "../Components/Items/Item"
import { Form } from "../Components/Form/Forms"
import { Footer } from "../Components/Footer"


export function ItemDetailView() {

    let location = useLocation()
    const reroute = useNavigate()
    let dataC = location.state

    const { request } = useContext(RequestContext)

    useEffect(() => {
        if (request === undefined) reroute('/ErrorPage')
        document.title = 'Item Detail View'
    }, [request])

    if (!request) {

        return <div>Cargando...</div>
    }

    return (
        <>
            <Header />
            <FilterProvider>
                <ItemsDetail infoData={dataC} />
                <Form title={'Similar Options'} />
                <Item gasInfo={request} />
                <Footer />
            </FilterProvider>
        </>
    )
}