import React from 'react'


const [newSearch, setNewSearch] = useState("");

    const handleFilterChange = (event) => {
        setShowAll(false)
        console.log(event.target.value)
        setNewSearch(event.target.value);
        if (event.target.value === "") setShowAll(true)
    };


const Filter = () => {
    return (

 <input label="search" value={newSearch} onChange={handleFilterChange} />
        )
}

export default Filter