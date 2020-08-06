import React, { useState, useEffect } from "react"
import AddPerson from "./components/AddPerson"
import Filter from "./components/Filter"
import Number from "./components/Number"
import numberService from "./services/numbers"

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState("")
    const [newNumber, setNewNumber] = useState("")
    const [newSearch, setNewSearch] = useState("")
    const [showAll, setShowAll] = useState(true)

    //  The Effect Hook lets you perform side effects in function components. Data fetching, setting up a subscription, and manually changing the DOM in React components are all examples of side effects.

    useEffect(() => {
        console.log("effect")
        numberService.getAll().then((initialData) => {
            console.log("promise fulfilled")
            setPersons(initialData)
        })
    }, [])

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
            numberService.create(nameObject).then((returnedNote) => {
                setPersons(persons.concat(returnedNote))
                setNewName("")
            })
        }
    }

    const removePerson = (event) => {
        event.preventDefault()

        if (window.confirm("Are you sure")) {
            const id = parseInt(event.target.value)
            numberService.remove(id).then((deletedNumber) => {
                setPersons(persons.filter((number) => number.id !== id))
            })
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
            <Number show={nameToShow} removePerson={removePerson} />
        </div>
    )
}

export default App
