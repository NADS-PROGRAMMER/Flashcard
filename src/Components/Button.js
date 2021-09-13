import React from 'react'

function Button({className, text, handler}) {
    return (
        <>
         <button onClick={handler} className={className}>{text}</button>   
        </>
    )
}

export default Button
