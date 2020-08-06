import React from "react"

const Filter = ({ valueSearch, onChangeFilter }) => {
    return (
        <div>
            <p>find countries</p>{" "}
            <input
                label="search"
                value={valueSearch}
                onChange={onChangeFilter}
            />
        </div>
    )
}

export default Filter
