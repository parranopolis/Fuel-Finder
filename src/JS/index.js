//recive an array and a string
//proces the array with all the information about the gas (Name, Price, Grade, Last Update)
export function fuelPrice(array, fuel) {
    let price
    array.find(option => {
        if (fuel.typeFuel == '') fuel.typeFuel = 'Regular'
        if (option.type == 'REGULAR_UNLEADED') option.type = 'Regular'
        if (option.type.toUpperCase() == fuel.typeFuel.toUpperCase()) {
            if (option.price.hasOwnProperty('nanos')) {
                price = `$${Math.floor((Number(option.price.units) + option.price.nanos / 1e9) * 100) / 100}`
                if (price.length < 5) price = `${price}0`
            } else {
                price = `$${Number(option.price.units)}.00`
            }
        }

    })
    return price
}

// Recibe an array with all stations and filter by the brand that was selected in the form input
export function filterBrand(stations, brand) {
    let filteredBrands = []
    if (brand != 'All Stations Brands' && brand != 'ALL STATIONS BRANDS' && brand != '') {
        filteredBrands = stations.filter(item => {
            let nameToUpperCase = item.text.toUpperCase()
            return nameToUpperCase === brand
        })
        if (filteredBrands.length > 0) {
            return filteredBrands
        } else {
            return []
        }

    } else {
        return stations
    }
}

// Recibe an object that comes from the state and return all the elements that have the 'fuelOptions' in the main Object
export function normalizeDataItemComponent(allStations, brand) {
    let gasInfo = []
    if (!allStations) {
        allStations = []
        return allStations
    } else {
        allStations.places.forEach(item => {
            if (item.hasOwnProperty('fuelOptions')) {
                gasInfo.push({
                    'text': item.displayName.text,
                    'formattedAddress': item.formattedAddress,
                    'id': item.id,
                    'fuelOptions': item.fuelOptions,
                    'key ': item.id,
                    'location': item.location,
                    'background': item.iconBackgroundColor
                })
            }
        })

        return filterBrand(gasInfo, brand)
    }

}

export function allBrands(data) {
    let brands = []
    const formattedData = normalizeDataItemComponent(data, 'All Stations Brands')
    formattedData.map(item => {
        let name = item.text
        if (!brands.includes(name)) {
            brands.push(name)
        }
    })
    return brands
}