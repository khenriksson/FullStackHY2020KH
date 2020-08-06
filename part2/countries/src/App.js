import React, { useState, useEffect } from "react"
import axios from "axios"

import Countries from "./components/Countries"
import Filter from "./components/Filter"

import "./App.css"

const App = () => {
    const [countries, setCountries] = useState([])
    const [newSearch, setNewSearch] = useState("")
    const [showAll, setShowAll] = useState(true)
    useEffect(() => {
        console.log("effect")
        axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
            console.log("promise fulfilled")
            setCountries(response.data)
        })
    }, [])

    const handleFilterChange = (event) => {
        setShowAll(false)
        console.log(event.target.value)
        setNewSearch(event.target.value)
        if (event.target.value === "") setShowAll(true)
    }

    const countriesToShow = showAll
        ? []
        : countries.filter((item) =>
              item.name.toLowerCase().includes(newSearch.toLowerCase()),
          )

    return (
        <div>
            <Filter
                valueSearch={newSearch}
                onChangeFilter={handleFilterChange}
            />
            <Countries countries={countriesToShow} />
        </div>
    )
}

export default App
