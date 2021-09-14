import React, {useRef, useEffect} from 'react'
import {gsap} from 'gsap'

function MessageModal({modalContent, isMessageError, dispatch}) {

    const modalRef = useRef()

    useEffect(() => {

       gsap.to(modalRef.current, {opacity: 1, marginTop: "0px", duration: .3})
    })

    // Close the message modal after 3 seconds.
    setTimeout(() => {
    
        dispatch({type: 'HIDE_MESSAGE_MODAL', payload: {isMessageModalOpen: false, modalContent: '', isMessageError: false}})
    }, 2300)
    
    return (
        <>
        <div ref={modalRef} className={isMessageError ? "bg-red-400 w-48 text-center fixed bottom-6 left-2 py-3 shadow-lg opacity-0 -mt-10" : "bg-green-400 w-48 text-center fixed bottom-6 left-2 py-3 shadow-lg"}>
            <h1 className="text-center font-semibold">{modalContent}</h1>
        </div>
        </>
    )
}

export default MessageModal
