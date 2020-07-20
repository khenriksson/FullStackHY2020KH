import React from "react"

const AddPerson = ({
    onSubmit,
    valueName,
    onChangeName,
    valueNumber,
    onChangeNumber,
}) => {
    return (
        <form onSubmit={onSubmit}>
            <h1>Add a new</h1>
            <div>
                name:{" "}
                <input type="text" value={valueName} onChange={onChangeName} />
            </div>
            <div>
                number: <input value={valueNumber} onChange={onChangeNumber} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default AddPerson
