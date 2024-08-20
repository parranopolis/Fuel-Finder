import { createContext, useState, useEffect } from "react";
import { FetchData } from '../JS/Fetch.js'
import { getLocation } from "../JS/Fetch.js";
import { allBrands } from "../JS/index.js";


// create the Context
export const FilterContext = createContext()
export const RequestContext = createContext()
export const FilteredItemsContext = createContext()

let filterObj = {
    typeFuel: 'Regular',
    brand: 'All Stations Brands'
}
let coorObj = {
    lat: null,
    lng: null
}

//Provider
export const FilterProvider = ({ children }) => {
    const [filter, setFilter] = useState(filterObj)
    return (
        <FilterContext.Provider value={{ filter, setFilter, filterObj }}>
            {children}
        </FilterContext.Provider>
    )
}

export const RequestProvider = ({ children }) => {
    const [request, setRequest] = useState()
    const [coor, setCoor] = useState(coorObj)
    const [brands, setBrands] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { lat, lng } = await getLocation()
                setCoor({ lat, lng })

                const data = await FetchData('https://places.googleapis.com/v1/places:searchNearby')
                setRequest(data)
                setBrands(allBrands(data))

            } catch (error) {
                console.log(error.message)
            }
        }
        fetchData()
    }, [])
    return (
        <RequestContext.Provider value={{ request, setRequest, coor, setCoor, coorObj, brands }}>
            {children}
        </RequestContext.Provider>
    )
}

export const FilteredItemsProvider = ({ children }) => {
    const [item, setItem] = useState()


    return (
        <FilteredItemsContext.Provider value={{ item, setItem }}>
            {children}
        </FilteredItemsContext.Provider>
    )
}
