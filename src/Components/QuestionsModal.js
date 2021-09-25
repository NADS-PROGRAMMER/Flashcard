import React, {useEffect, useState, useRef} from 'react'
import Button from './Button'
import {gsap} from 'gsap'

function QuestionsModal({dispatch, questions}) {

    // ANIMATIONS
    const divRef = useRef()

    useEffect(() => {

        gsap.to(divRef.current, {opacity: 1, marginTop: '0px'})
    })

    const [currentQuestions, setCurrentQuestions] = useState(questions)
    const [isShow, setShow] = useState(false)
    const [index, setIndex] = useState(0)
    const [content, setContent] = useState({
        question: currentQuestions.length > 0 && currentQuestions[index].question,
        answer: currentQuestions.length > 0 && currentQuestions[index].answer
    })

    useEffect(() => {

        if (currentQuestions.length > 0) {

            setContent({
                id: currentQuestions[index].id,
                question: currentQuestions[index].question,
                answer: currentQuestions[index].answer
            })
        }
    }, [index])

    return (
        <div ref={divRef} className="fixed opacity-0 -mt-10 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 bg-green-300 py-4 px-4
        h-auto w-full max-w-xs md:max-w-md flex flex-col justify-between shadow-2xl rounded-md">

            <section className="self-end cursor-pointer mb-2" onClick={() => dispatch({type: 'CLOSE_FLASHCARD', payload: {isFlashcardOpen: false}})}>✖</section>

            {currentQuestions.length > 0 && <div className="bg-gray-100 h-auto mb-2 flex flex-col justify-between" onClick={() => setShow(!isShow)}>
                <div className="flex flex-col justify-center mt-3">
                    <p className="text-center font-mono text-lg font-bold mb-4 break-words">{content.question}</p>
                    {isShow && <p className="text-center font-medium text-xl break-words">{content.answer}</p>}
                </div>
                <div className="py-2 px-2 flex justify-evenly">
                    <Button className="font-bold text-green-400" text="Update"/>
                    <Button className="font-bold text-red-400" text="Delete" />
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
