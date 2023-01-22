import React, {useEffect, useState, useRef} from 'react'
import Button from './Button'
import {gsap} from 'gsap'

function QuestionsModal({dispatch, currentIndex, categories, questions}) {

    // ANIMATIONS
    const divRef = useRef()

    useEffect(() => {

        gsap.to(divRef.current, {opacity: 1, marginTop: '0px'})
    })

    const [currentQuestions, setCurrentQuestions] = useState(questions)
    const [isShow, setShow] = useState(false)
    const [index, setIndex] = useState(currentIndex !== -1 ? currentIndex : 0)
    const [content, setContent] = useState({
        id: currentQuestions.length > 0 && currentQuestions[index].id,
        question: currentQuestions.length > 0 && currentQuestions[index].question,
        answer: currentQuestions.length > 0 && currentQuestions[index].answer
    })

    useEffect(() => {


        if (questions.length > 0) {

            setContent({
                id: questions[index].id,
                question: questions[index].question,
                answer: questions[index].answer
            })
        }
    }, [index])

    useEffect(() => {

        setCurrentQuestions(questions)
        setIndex(currentIndex !== -1 ? currentIndex : 0)

        let mustIndex = currentIndex !== -1 ? currentIndex : 0

        if (questions.length > 0) {

            setContent({
                id: questions[mustIndex].id,
                question: questions[mustIndex].question,
                answer: questions[mustIndex].answer
            })
        }
    }, [questions])

    return (
        <div ref={divRef} className="fixed opacity-0 -mt-10 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 bg-gray-900 py-4 px-4
         h-auto w-3/4 md:max-w-md flex flex-col justify-between shadow-2xl rounded-md">

            <section className="self-end cursor-pointer mb-2" onClick={() => dispatch({type: 'CLOSE_FLASHCARD', payload: {isFlashcardOpen: false}})}>✖</section>

            {currentQuestions.length > 0 && <div className="bg-gray-100 h-auto mb-2 px-3 flex flex-col justify-between border border-white" onClick={() => setShow(!isShow)}>

                <div className="flex flex-col justify-center mt-3">

                    {/* Question */}
                    <p className="text-center font-mono text-lg font-bold mb-4 break-words select-none">{content.question}</p>

                    {
                        isShow ? 
                        <p className="select-none text-center cursor-pointer text-green-700 font-medium text-xl break-words">{content.answer}</p> : <p className="select-none text-center text-green-700 font-medium text-xl break-words cursor-pointer">Show Answer</p>}
                </div>

                <div className="py-2 px-2 flex justify-evenly">
                    {/* UPDATE BUTTON */}
                    <Button 
                    handler={(e) => { 
                        e.stopPropagation()
                        dispatch({type: 'SHOW_UPDATE_QUESTION_MODAL', payload: true})
                        dispatch({type: 'SETUP_UPDATE_QUESTION_MODAL', payload: {index: index, questionID: questions[index].id, question: questions[index].question, answer: questions[index].answer}})
                    }}
                    className="font-bold text-green-400" 
                    text="Update"/>

                    {/* DELETE BUTTON */}
                    <Button
                     handler={(e) => { 
                         e.stopPropagation(); 
                          dispatch({type: 'SETUP_UPDATE_QUESTION_MODAL', payload: {index: -1, questionID: '', question: '', answer: ''}})
                        {dispatch({type: 'DELETE_QUESTION_CONFIRMATION', payload: content.id})}}}
                     className="font-bold text-red-400" 
                     text="Delete" />
                </div>
            </div>}

            {currentQuestions.length > 0 && <div className="flex justify-evenly">
                <Button 
                     handler={() => {
                         
                         setIndex(index - 1 < 0 ? currentQuestions.length - 1 : index - 1)
                         setShow(false)
                     }}
                     className="font-bold text-white text-xl" 
                     text="Previous"/> 

                     <span className="select-none text-white text-2xl font-bold">{`${index + 1}/${currentQuestions.length}`}</span> 

                <Button 
                    handler={() => {
                        setIndex(
                            index + 1 > currentQuestions.length - 1 ? 0 : index + 1
                        )
                        setShow(false)
                    }}
                    className="font-bold text-white text-xl" 
                    text="Next" />
            </div>}
            
            { currentQuestions.length < 1 && <div className='flex flex-col items-center'>

                
                <svg style={{fill: 'white'}} className='w-24 white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-144c-17.7 0-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32z"/>
                </svg>

                 <h1 className="p-8 text-center font-bold text-2xl text-white">There are no created questions</h1>
            </div> }
            
        </div>
    )
}

export default QuestionsModal
