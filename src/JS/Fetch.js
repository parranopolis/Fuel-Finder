// set here the variables that come from "Filters"
// this Fetch make the request to all the Items for nearby Search

export function getLocation() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                resolve({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude

                }),
                    error => reject(error)
            })
        } else {
            reject(new Error('Geolocation is not supported by this Browser'))
        }
    })
}

export async function FetchData(url, coor) {
    try {
        const { lat, lng } = await getLocation()
        let homeOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Goog-Api-Key': import.meta.env.VITE_API_KEY,
                'X-Goog-FieldMask': 'places.displayName,places.types,places.fuelOptions,places.iconBackgroundColor,places.formattedAddress,places.id,places.location'
            },
            body: JSON.stringify({
                includedTypes: ["gas_station"],
                maxResultCount: 20,
                locationRestriction: {
                    circle: {
                        center: {
                            latitude: lat,
                            longitude: lng
                        },
                        radius: 4000.0
                    }
                }
            })
        }

        const response = await fetch(url, homeOptions)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        return data
    } catch (error) {
        throw new Error(error.message)
    }
}

export async function getPlaceDetails(id) {
    try {
        let headers = {
            headers: {
                'Content-Type': 'application/json',
                'X-Goog-Api-Key': 'AIzaSyDMrvZDDntG6MBcPUWzYtZpD69PfaDSu6s',
                'X-Goog-FieldMask': 'nationalPhoneNumber,userRatingCount,rating'
            },
        }

        const response = await fetch(`https://places.googleapis.com/v1/places/${id}`, headers)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        return data
    } catch (error) {
        throw new Error(error)
    }
}

