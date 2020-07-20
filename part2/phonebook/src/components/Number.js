import React from "react"
import Name from "./Name"

export default Number = ({ show }) => {
    return show.map((item) => <Name item={item} key={item.name} />)
}
