import { useState, useContext, useEffect } from "react"
import './../../CSS/Filters.css'
import './../../CSS/Index.css'

import { FilterContext } from './../../Contexts/Context'



// name -> string
// option -> array


export function Filter({ name, options, id }) {
    let className = ['filter']

    const { filter, setFilter } = useContext(FilterContext)
    const [active, isActive] = useState()

    const handleChange = (e) => {
        let value = e.target.value.toUpperCase()
        const id = e.target.id
        if (id == 'brand') e.target.value != 'All Stations Brands' ? isActive('active') : isActive('')
        if (id == 'typeFuel') e.target.value != 'Regular' ? isActive('active') : isActive('')
        if (id == 'sortOrder') e.target.value != 'No Filter' ? isActive('active') : isActive('')
        setFilter({ ...filter, [id]: value })
    }
    return (
        <select
            name={name}
            id={id}
            className={`${className} ${active}`}
            onChange={handleChange}
        >
            <option>{name}</option>
            {options.map((element, index) => {
                return <option value={element} key={index}>{element}</option>
            })}
        </select>
    )
}

export function Range({ miles }) {
    const [newMiles, setMiles] = useState(miles)
    return (
        <section>
            <form action="#">
                <span>500 Miles</span>
                <input
                    type="range"
                    min={500}
                    max={2000}
                    onChange={e => {
                        setMiles(e.target.value)
                    }} />
                <span>{newMiles} Miles</span>
            </form>
        </section>
    )
}