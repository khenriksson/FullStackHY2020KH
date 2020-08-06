import React from "react"

const Number = ({ show, removePerson }) => {
    return show.map((item) => (
        <div key={item.id}>
            <h4>
                {item.name} {item.number}
            </h4>
            <button type="submit" value={item.id} onClick={removePerson}>
                remove
            </button>
        </div>
    ))
}

export default Number
