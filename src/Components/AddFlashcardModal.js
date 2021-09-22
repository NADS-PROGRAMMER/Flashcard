import React, {useState, useEffect, useRef} from 'react'
import Button from './Button'
import { gsap } from "gsap"

function AddFlashcardModal({
    categoryLength, 
    descriptionLength, 
    isModalOpen, 
    dispatch, 
    isUpdateModalOpen, 
    updateCategoryContent, 
    updateDescriptionContent,
    isAddQuestionModalOpen}) {

   const [category, setCategory] = useState('')
   const [description, setDescription] = useState('')
   const [question, setQuestion] = useState('')
   const [answer, setAnswer] = useState('')
   const divRef = useRef()
   
    /** useEffect for setting up the value of
     * category and description when the modal is closed. */
    useEffect(() => {
        
        console.log(category, description)
        if (!isModalOpen) {
            setCategory('')
            setDescription('')
        }
    }, [isModalOpen])

    /** Checks if the the update modal is open 
     * so that we can set the value of the clicked
     * category to the input fields. */
    useEffect(() => {

        if (isUpdateModalOpen) {

            setCategory(updateCategoryContent)
            setDescription(updateDescriptionContent)
        }
    }, [isUpdateModalOpen])

    /** Use effect for animations of the modal */
    useEffect(() => {
        gsap.to(divRef.current, {opacity: 1, marginTop: "0px", duration: .3})  
    })

    /** ITO AY ANG USE EFFECT
     * PARA MALAMAN KUNG ANONG LENGTH NA 
     * NG INPUT SA CATEGORY AND DESCRIPTION.
     */
    useEffect(() => {

        dispatch({type: 'CHANGE_CATEGORY_VALUE', payload: category})
    }, [category])

    useEffect(() => {

        dispatch({type: 'CHANGE_DESCRIPTION_VALUE', payload: description})
    }, [description])

    // END OF USE EFFECTS

    return (
        <div className="">
            <div ref={divRef} className="fixed opacity-0 -mt-10 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-200 px-3 py-2 border-2 border-blue-500 flex flex-col gap-4 sm:w-96 drop-shadow-lg shadow-lg">

                {/* TEXTFIELD */}
                <section className="flex flex-col">

                    <section className="flex items-center justify-between">
                        <label className="font-medium" htmlFor="question">{isAddQuestionModalOpen ? "Question:" : "Category Name:" }</label>

                        {!isAddQuestionModalOpen && <small>{categoryLength}/25</small>}
                    </section>

                    <input value={!isAddQuestionModalOpen ? category : question}  onInput={ !isAddQuestionModalOpen ? (e) => {

                        // Check if the number of characters is empty.
                        25 - e.target.value.length === -1 ? setCategory(prevValue => prevValue) : setCategory(e.target.value)
                        
                    } : (e) => {setQuestion(e.target.value)}} className="border border-black py-2 px-1" type="text" name="" id="" />
                </section>

                {/* TEXTAREA */}
                <section className="flex flex-col">

                    <section className="flex items-center justify-between">
                        <label className="font-medium" htmlFor="answer">{isAddQuestionModalOpen ? "Answer: " : "Description (Optional): "}</label>

                        {!isAddQuestionModalOpen && <small>{descriptionLength}/45</small>}
                    </section>
                    {isAddQuestionModalOpen ?  
                    <input value={answer} onInput={(e) => setAnswer(e.target.value)} className="border border-black py-2 px-1" type="text" name="" id="" />
                    : 
                    <textarea value={description} onInput={(e) => {

                        // Check if the number of characters is empty.
                        45 - e.target.value.length === -1 ? setDescription(prevValue => prevValue) : setDescription(e.target.value)

                    }} className="border border-black py-2 px-1" name="" id="" cols="30" rows="3"></textarea>}
                </section>
                
                {/* BUTTON SECTION */}
                <section className="flex gap-2">
                <Button 
                handler={
                isAddQuestionModalOpen ? () => {

                    if (question && answer) {
                        dispatch({type: 'ADD_QUESTION', payload: {question: question, answer: answer}})
                        setQuestion('')
                        setAnswer('')
                    }
                    else {
                        dispatch({type: 'SHOW_MESSAGE_MODAL', payload: {isMessageModalOpen: true, modalContent: 'Question and Answer field must not be empty.', isMessageError: true}})
                    }
                } : !isUpdateModalOpen ? () => {

                    // If update modal is not open this is the required event.
                    if (category) {
                        dispatch({type: 'ADD_CATEGORY', payload: {category: category, description: description, questions: []}})
                        dispatch({type: 'SHOW_MESSAGE_MODAL', payload: {isMessageModalOpen: true, modalContent: 'Category Added', isMessageError: false}})
                    }
                    else 
                        dispatch({type: 'SHOW_MESSAGE_MODAL', payload: {isMessageModalOpen: true, modalContent: 'Input field empty', isMessageError: true}})
                } :  () => {

                    if (category) {

                        dispatch({type: 'UPDATE_CATEGORY', payload: {category: category, description: description}})
                        dispatch({type: 'SHOW_MESSAGE_MODAL', payload: {isMessageModalOpen: true, modalContent: 'Successfully Updated', isMessageError: false}})
                    }
                    else {
                        dispatch({type: 'SHOW_MESSAGE_MODAL', payload: {isMessageModalOpen: true, modalContent: 'Input field empty', isMessageError: true}})
                    }
                }}
                className={!isUpdateModalOpen ? "bg-green-300 font-bold py-2 px-3 hover:bg-green-400 shadow" : "bg-blue-300 font-bold py-2 px-3 hover:bg-blue-400 shadow"} 
                text={!isUpdateModalOpen ? "Add" : "Update"}
                /> 
                    

                    {/* CANCEL BUTTON */}
                    <Button handler={() => {
                    
                    dispatch({type: "CLOSE_MODAL"})
                    dispatch({type: 'SHOW_UPDATE_MODAL', payload: {isUpdateModalOpen: false, category: '', description: ''}})

                    }}

                    className="bg-red-300 font-bold py-2 px-3 hover:bg-red-400 shadow"
                    
                    text="Cancel"/>
                </section>
            </div>
        </div>
    )
}

export default AddFlashcardModal
