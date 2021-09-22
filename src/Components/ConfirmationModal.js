import React, {useRef, useEffect} from 'react'
import Button from './Button'
import {gsap} from 'gsap'

function ConfirmationModal({categoryName, dispatch}) {

    const modalRef = useRef()

    // This is the useEffect for animation only
    useEffect(() => {

       gsap.to(modalRef.current, {opacity: 1, marginTop: "0px", duration: .3})
    })

    return (
        <div ref={modalRef} className="bg-blue-200 opacity-0 -mt-10 w-60 sm:w-32 md:w-72 flex flex-col gap-3 fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 py-4 px-2 border border-blue-500 shadow-xl">
            <section>
                <p className="font-semibold">Delete <span className="text-red-400">{categoryName}</span> category?</p>
            </section>
            <section className="flex gap-2">
                <Button 
                // EVENT HANDLER OF BUTTON
                handler={() => {
                    dispatch({type: 'REMOVE_CATEGORY'})
                    dispatch({type: 'SHOW_MESSAGE_MODAL', payload: {isMessageModalOpen: true, modalContent: 'Deleted Succesfully', isMessageError: false}})
                }}
                className="bg-red-300 font-bold py-2 px-2 hover:bg-red-400 shadow w-30 md:w-72" 
                text="Yes"
                />

                <Button 
                // EVENT HANDLER OF BUTTON
                handler={() => {
                    dispatch({type: 'SHOW_CONFIRMATION', payload: {isConfirmationModalOpen: false, categoryID: 0, categoryName: ''}})
                }}
                className="bg-green-300 font-bold py-2 px-2 hover:bg-green-400 shadow w-30 md:w-72" 
                text="No" 
                />
            </section>
        </div>
    )
}

export default ConfirmationModal
