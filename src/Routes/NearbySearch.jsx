import { useCallback, useContext, useEffect, useState, } from "react";
import { APIProvider, Map, AdvancedMarker, InfoWindow, useAdvancedMarkerRef } from "@vis.gl/react-google-maps";
import { ErrorBoundary } from "react-error-boundary";

import './../CSS/Maps.css'
import { FilterContext, RequestContext } from "../Contexts/Context";
import { fuelPrice, normalizeDataItemComponent } from "../JS/index.js";
import { Header } from "../Components/Navbar";
import { Form } from "../Components/Form/Forms";
import { Item } from "../Components/Items/Item";
import { MonsterErrorPage } from "../Components/Error/RouterErrorPage.jsx";
import { Loader } from "../Components/Loader.jsx";
import { Footer } from "../Components/Footer.jsx";
import { Button3 } from "../Components/Buttons/Buttons.jsx";

export function NearbySearch() {
    const { request, coor } = useContext(RequestContext)
    const { filter } = useContext(FilterContext)
    const [items, setItems] = useState(normalizeDataItemComponent(request, filter.brand))
    const [position, setPosition] = useState(null)

    const q = document.querySelectorAll('.yNHHyP-marker-view')
    useEffect(() => {
        setItems(normalizeDataItemComponent(request, filter.brand))
    }, [filter, request, position])

    return (
        <>
            {request ? <>
                <ErrorBoundary FallbackComponent={MonsterErrorPage}>
                    <Header />
                    <APIProvider apiKey={'AIzaSyAF44fz_AZNSSdBIp15aDx5KK_9KNr2o4o'}>
                        <Map
                            style={{ height: '50vh' }}
                            defaultZoom={14}
                            defaultCenter={coor}
                            mapId={'testingMap'}
                        >
                            <MarkerWithInfoWindows
                                position={coor}
                                infoContent={<div>You're Here</div>}
                            />

                            {items.map(item => {
                                const price = fuelPrice(item.fuelOptions.fuelPrices, filter)
                                return (
                                    <MarkerWithInfoWindows
                                        key={item.id}
                                        position={{
                                            lat: item.location.latitude,
                                            lng: item.location.longitude
                                        }}
                                        title={item.text}
                                        infoContent={<section className="infoContent">
                                            <div className="flex">
                                                <span className="infoContent-text" >{filter.typeFuel} </span>
                                                <span className="infoContent-text" >{price}</span>
                                            </div>

                                            <Button3 text='More Details' path={`/ItemDetailView/${item.id}`} color='dark' />
                                        </section>}
                                    />
                                )
                            })}
                        </Map>
                    </APIProvider >
                    <Form title={'Similar Options'} />
                    <Item gasInfo={request} />
                    <Footer />
                </ErrorBoundary>
            </> : <Loader />}

        </>
    )
}

const MarkerWithInfoWindows = ({ position, infoContent, title }) => {
    const [markerRef, marker] = useAdvancedMarkerRef()
    const [infoWindowShown, setInfoWindowShown] = useState(null)

    const handleMarkerClick = useCallback(() => {
        setInfoWindowShown(isShonw => !isShonw);
    }, [])

    const handleClose = useCallback(() => {
        setInfoWindowShown(false)
    }, [])

    return (
        <>
            <AdvancedMarker
                ref={markerRef}
                position={position}
                onClick={handleMarkerClick}
            />
            {infoWindowShown && (
                <InfoWindow anchor={marker} onClose={handleClose} className="infoWindow" headerContent={title} >
                    {infoContent}
                </InfoWindow>
            )}
        </>
    )
}