import './../../CSS/Buttons.css'
import { useNavigate, Link } from 'react-router-dom'

// light - dark - lightLined - darklined

export function Button({ text, color, address }) {
    return (
        <button className={`${color} button`} onClick={e => {
            // getDirections('getroute/')

            // llamar el archivo json y mostrar todos los slots con el componente Item
            //test() son los filtros para el X-Goog-FieldMask
            // e.preventDefault()
        }}><Link to={`https://www.google.com/maps/place/${address}`} target='_blank' > {text} </Link> </button>
    )
}

export function Button2(item) {
    console.log(item.address)
    return (

        <button >
            <Link to={`https://www.google.com/maps/place/${item.address}`}> ir</Link>
        </button>
    )
}

export function Button3({ text, color, path }) {
    return (

        <Link className={`${color} button p-large`} to={path}>{text}</Link>
    )
} 