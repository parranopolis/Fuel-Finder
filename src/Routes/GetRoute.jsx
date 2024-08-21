import { useEffect } from 'react'
import { GetMapRoute } from './../Components/Maps/Maps'
export function GetRoute() {
    useEffect(() => {
        document.title = 'Get Map Route'
    })
    return (
        <>
            <GetMapRoute />
        </>
    )
}