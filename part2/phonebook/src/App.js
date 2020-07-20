import React, { useState } from "react"
import Name from "./components/Name"
import AddPerson from "./components/AddPerson"
import Filter from "./components/Filter"
import Number from "./components/Number"

const App = () => {
    const [persons, setPersons] = useState([
        { name: "Arto Hellas", number: "040-123456" },
        { name: "Ada Lovelace", number: "39-44-5323523" },
        { name: "Dan Abramov", number: "12-43-234345" },
        { name: "Mary Poppendieck", number: "39-23-6423122" },
    ])
    const [newName, setNewName] = useState("")
    const [newNumber, setNewNumber] = useState("")
    const [newSearch, setNewSearch] = useState("")
    const [showAll, setShowAll] = useState(true)

    const addPerson = (event) => {
        event.preventDefault()

        const nameObject = {
            name: newName,
            number: newNumber,
            // date: new Date().toISOString(),
            // important: Math.random() < 0.5,
            // id: persons.length + 1,
        }

        if (persons.some((item) => item.name === nameObject.name)) {
            window.alert(`${nameObject.name} already exists in phonebook`)
        } else {
            setPersons(persons.concat(nameObject))
            setNewName("")
        }
    }

    const handlePersonChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }
    const handleFilterChange = (event) => {
        setShowAll(false)
        console.log(event.target.value)
        setNewSearch(event.target.value)
        if (event.target.value === "") setShowAll(true)
    }

    const nameToShow = showAll
        ? persons
        : persons.filter((item) =>
              item.name.toLowerCase().includes(newSearch.toLowerCase()),
          )

    return (
        <div>
            <h2>Phonebook</h2>
            search :{" "}
            <Filter
                valueSearch={newSearch}
                onChangeFilter={handleFilterChange}
            />
            <AddPerson
                onSubmit={addPerson}
                valueName={newName}
                onChangeName={handlePersonChange}
                valueNumber={newNumber}
                onChangeNumber={handleNumberChange}
            />
            <h2>Numbers</h2>
            <Number show={nameToShow} />
        </div>
    )
}

export default App
