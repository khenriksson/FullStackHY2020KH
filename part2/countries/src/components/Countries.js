import React from "react"
import Country from "./Country"

const Countries = ({ countries }) => {
    if (countries.length > 10) return <p>Too many matches, specify filter</p>
    else if (countries.length > 1)
        return countries.map((country) => (
            <Country country={country} key={country.name} />
        ))
    else
        return countries.map((country) => (
            <Country country={country} key={country.name} show={true} />
        ))
}

export default Countries
