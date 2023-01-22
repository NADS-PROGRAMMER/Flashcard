import React, {useRef, useEffect} from 'react'
import Button from './Button'
import {gsap} from 'gsap'

function ConfirmationModal({categoryName, isFlashcardOpen, dispatch}) {

    const modalRef = useRef()

    // This is the useEffect for animation only
    useEffect(() => {

       gsap.to(modalRef.current, {opacity: 1, marginTop: "0px", duration: .2})
    })

    return (
        <div ref={modalRef} className="bg-gray-900 opacity-0 -mt-10 w-60 sm:w-32 md:w-72 flex flex-col gap-3 fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 py-4 px-2  shadow-xl z-10 rounded-lg">
            <section className='py-5 px-2'>
                {isFlashcardOpen ? <p className="font-semibold">Do you want to delete this question?</p> : <p className="font-semibold text-white text-lg">Delete <span className="text-red-200">{categoryName}</span> category?</p>}
            </section>
            <section className="flex gap-2">
                <Button 
                // EVENT HANDLER OF BUTTON
                handler={isFlashcardOpen ? 
                  () => {
                      dispatch({type: 'DELETE_QUESTION'})
                      dispatch({type: 'SHOW_CONFIRMATION', payload: {isConfirmationModalOpen: false, categoryID: 0, categoryName: ''}})
                      dispatch({type: 'SHOW_MESSAGE_MODAL', payload: {isMessageModalOpen: true, modalContent: 'Question Deleted Succesfully!', isMessageError: false}})
                   } 
                : () => {
                    dispatch({type: 'REMOVE_CATEGORY'})
                    dispatch({type: 'SHOW_MESSAGE_MODAL', payload: {isMessageModalOpen: true, modalContent: 'Deleted Succesfully', isMessageError: false}})
                }}
                className="bg-red-900 text-white border border-white rounded-lg font-bold py-2 px-2 hover:bg-red-800 shadow w-30 md:w-72" 
                text="Yes"
                />

                <Button 
                // EVENT HANDLER OF BUTTON
                handler={() => {
                    dispatch({type: 'SHOW_CONFIRMATION', payload: {isConfirmationModalOpen: false, categoryID: 0, categoryName: ''}})
                }}
                className="bg-green-900 text-white border border-white rounded-lg font-bold py-2 px-2 hover:bg-green-800 shadow w-30 md:w-72" 
                text="No" 
                />
            </section>
        </div>
    )
}

export default ConfirmationModal
