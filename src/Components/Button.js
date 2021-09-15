import React from 'react'

function Button({className, text, handler, disabled}) {
    return (
        <>
         <button disabled={disabled} onClick={handler} className={className}>{text}</button>   
        </>
    )
}

export default Button
