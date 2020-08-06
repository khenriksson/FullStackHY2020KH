import React, { useState, useEffect } from "react"
import axios from "axios"

const Country = ({ country }) => {
    const [show, setShow] = useState(true)
    const [weather, setWeather] = useState([])
    const API_KEY = process.env.REACT_APP_API_KEY

    useEffect(() => {
        axios
            .get(
                `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${country.capital}`,
            )
            .then((response) => {
                setWeather(response.data)
            })
        console.log(weather)
    }, [])

    const handleChangeButton = () => {
        setShow((show) => !show)
        console.log(show)
        console.log(weather)
    }

    return show ? (
        <div key={country.name}>
            {country.name} <button onClick={handleChangeButton}>show</button>
        </div>
    ) : (
        <div key={country.name}>
            <h3>{country.name}</h3>
            <h5>capital {country.capital}</h5>
            <h5>population {country.population}</h5>
            <h4>languages</h4>
            {country.languages.map((language) => (
                <li key={language.name}>{language.name}</li>
            ))}
            <h5>temperature {weather.current.temperature}</h5>
            <img src={country.flag} width={100} height={100} />

            <button onClick={handleChangeButton}>hide</button>
        </div>
    )
}

export default Country
