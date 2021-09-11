import React from 'react'

function Textfield({name, className}) {
    return (
        <>
          <input type="text" className={className} name={name}/>  
        </>
    )
}

export default Textfield
