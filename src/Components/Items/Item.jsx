import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './../../CSS/Items.css'
import './../../CSS/Index.css'

import { Button } from "../Buttons/Buttons.jsx";
import { fuelPrice, normalizeDataItemComponent } from '../../JS/index.js';
import { getPlaceDetails } from '../../JS/Fetch.js';
import { Loader } from '../Loader.jsx'


import { FilterContext, RequestContext } from '../../Contexts/Context.jsx';

// Props: 
// gasInfo -> array with all information: 
//          Name - Address - id - element key(id) - fuelOptions (price, grade, lastUpdate)
// FilterFuelName -> String with the grade selected in the filter (Should get from the Context)

export function Item() {
    const { filter } = useContext(FilterContext)
    const { request, setRequest } = useContext(RequestContext)
    const [items, setItems] = useState(normalizeDataItemComponent(request, filter.brand))
    const itemDetail = useNavigate()
    let itemData = []
    if (request == undefined) console.log('undefine at Item')
    useEffect(() => {
        const sortedItems = normalizeDataItemComponent(request, filter.brand)
            .map((item) => ({
                item,
                price: parseFloat(fuelPrice(item.fuelOptions.fuelPrices, filter).slice(1, 5))
            }))
            .sort((a, b) => filter.sortOrder === 'LOW FIRST' ? a.price - b.price : b.price - a.price)
            .map(({ item }) => item)

        setItems(sortedItems)

    }, [filter, request])
    return (
        <>
            {items.length > 0 ? (items.map((item, i) => {
                const price = fuelPrice(item.fuelOptions.fuelPrices, filter)
                return (
                    <article
                        key={item.id}
                        className='items gap flex items-H'
                        onClick={(event => {
                            // with the click it will send data to '/ItemDetailView/' to render the that component
                            itemDetail(`/ItemDetailView/${item.id}`, {
                                state: {
                                    fuelType: item.fuelOptions.fuelPrices,
                                    name: item.text,
                                    addrees: item.formattedAddress,
                                    id: item.id,
                                    FilterFuelName: filter
                                }
                            })
                        })}>

                        <section className='flex gap'>
                            <section>
                                <div className="item-logo">
                                    <img src={`/gas Station Logos/${item.text}.png`} alt={`${item.text} logo`} />
                                </div>
                            </section>
                            <section className='item-address'>
                                <div className='infoName'>
                                    <span className='h4'>{item.text}</span>
                                </div>
                                <div className='infoAddress'>
                                    <span className='p-regular'>{item.formattedAddress}</span>
                                </div>
                            </section>
                        </section>
                        <section>
                            <span className='h3'>{price}</span>
                        </section>
                    </article>
                )
            })) : (<article>
                <h3>there is no data with that filter</h3>
            </article>)}
        </>
    )
}

export function ItemsDetail(data) {
    const { fuelType, name, addrees, id, FilterFuelName } = data.infoData
    const { filter, setFilter } = useContext(FilterContext)
    const [detail, setDetail] = useState(null)
    let price = fuelPrice(fuelType, FilterFuelName)
    useEffect(() => {
        const getDetails = async () => {
            try {
                const data = await getPlaceDetails(id)
                setDetail(data)
            } catch (error) {
                console.error(error)
            }
        }
        getDetails()
    }, [price])

    return (
        <>
            {detail ? <>
                <article className='items items-Detail'>
                    <section className='gap flex'>
                        <section className='flex gap'>
                            <section> {/* brand logo */}
                                <div className='item-logo'>
                                    <img src={`/gas Station Logos/${data.infoData.name}.png`} alt={`${data.infoData.name} logo`} />

                                </div>
                            </section>
                            <section className='itemInfo'> {/* Details */}
                                <div className='infoName'>
                                    <span className='block h4'>{name}</span>
                                    <span className='block p-small'>{detail.rating}/5 Stars</span>
                                </div>
                                <div className='infoAddress'>
                                    <span className='block p-regular'>{addrees}</span>
                                </div>
                                <div className='infoPhone'>
                                    <span className='block p-regular highlight-color'>{detail.nationalPhoneNumber}</span>
                                </div>
                            </section>
                        </section>
                        <section> {/* Price */}
                            <span className='block vote'>{detail.userRatingCount} Votes</span>
                            <span className='block h3'>{price}</span>
                            <span className='block h5'>{filter.typeFuel}</span>
                        </section>
                    </section>
                    <section className='items-button flex'>
                        <Button
                            text={'Get Directios'}
                            color={'light'}
                            address={addrees}
                        />
                    </section>
                </article>
                <article className='items items-Detail flex items-Gradetable'>
                    {fuelType.map((e, i) => {
                        return <GradePrice fuelType={fuelType} key={i} fuelName={e.type} lastUpdate={e.updateTime} />
                    })}
                </article></> : <Loader />}
        </>
    )
}

export function GradePrice({ fuelType, fuelName, lastUpdate }) {
    const price = fuelPrice(fuelType, { 'typeFuel': fuelName })
    if (fuelName === 'REGULAR_UNLEADED') fuelName = 'REGULAR'

    return (
        <article className='priceDetail flex'>
            <section>
                <span className='h6'>{fuelName.toUpperCase()}</span>
            </section>
            <section className='priceDetailInfo'>
                <span className='price'>{price}</span>
                <span className='sources primary-color'>google.com</span>
                <span className='lastUpdate highlight-color'>{lastUpdate}</span>
            </section>
        </article>
    )
}