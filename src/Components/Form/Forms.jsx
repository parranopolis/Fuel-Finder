import { Filter } from "../Filter/Filters"
import { Button } from "../Buttons/Buttons"

import './../../CSS/MediaQueries.css'
import './../../CSS/Index.css'
import './../../CSS/Forms.css'
import { useContext } from "react"
import { RequestContext } from "../../Contexts/Context"

export function Form({ title }) {
    const { brands } = useContext(RequestContext)
    return (
        <>
            <article className="formContent">
                <span className="h4">{title}</span>
                <form action="" className="form">
                    <section className="formFilters">

                        <div>
                            <div>
                                <label htmlFor="typeFuel" id="typeFuel">Fuel Type
                                    <Filter id='typeFuel' name={'Regular'} options={['Midgrade', 'Premium', 'Diesel']} />
                                </label>
                            </div>
                        </div>
                        <div>
                            <div>
                                <label htmlFor="brand" id="brand">Station Brand
                                    <Filter id='brand' name={'All Stations Brands'} options={brands} />
                                </label>
                            </div>
                        </div>
                    </section>
                </form>
            </article>
        </>
    )
}