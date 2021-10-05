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
        <div ref={divRef} className="fixed opacity-0 -mt-10 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 bg-green-300 py-4 px-4
         h-auto w-3/4 md:max-w-md flex flex-col justify-between shadow-2xl rounded-md">

            <section className="self-end cursor-pointer mb-2" onClick={() => dispatch({type: 'CLOSE_FLASHCARD', payload: {isFlashcardOpen: false}})}>✖</section>

            {currentQuestions.length > 0 && <div className="bg-gray-100 h-auto mb-2 px-3 flex flex-col justify-between" onClick={() => setShow(!isShow)}>
                <div className="flex flex-col justify-center mt-3">
                    <p className="text-center font-mono text-lg font-bold mb-4 break-words">{content.question}</p>
                    {isShow && <p className="text-center font-medium text-xl break-words">{content.answer}</p>}
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
                     className="font-bold" 
                     text="Previous"/> 

                     <span className="font-medium">{`${index + 1}/${currentQuestions.length}`}</span> 

                <Button 
                    handler={() => {
                        setIndex(
                            index + 1 > currentQuestions.length - 1 ? 0 : index + 1
                        )
                        setShow(false)
                    }}
                    className="font-bold" 
                    text="Next" />
            </div>}

            {currentQuestions.length < 1 && <h1 className="text-center font-bold text-2xl">There are no created questions</h1>}
        </div>
    )
}

export default QuestionsModal
