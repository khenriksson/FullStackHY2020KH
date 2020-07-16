import React, { useState } from "react";

const Name = ({item}) => {
    return (
        <h4>{item.name}  {item.number}</h4>
    )
}
export default Name;