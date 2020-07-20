import React from "react"

const Filter = ({ valueSearch, onChangeFilter }) => {
    return (
        <input label="search" value={valueSearch} onChange={onChangeFilter} />
    )
}

export default Filter
