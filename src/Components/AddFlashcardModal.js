import React from 'react'
import Textfield from '../InputComponents/Textfield'
import Button from './Button'


function AddFlashcardModal({showModal}) {

    return (
        <div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-100 px-3 py-2 border-2 border-green-500 flex flex-col gap-4 sm:w-96 lg:w-96 drop-shadow-lg shadow-lg">
            <section className="flex flex-col">
                <label className="font-medium" htmlFor="question">Category: </label>
                <input className="border border-black py-2" type="text" name="" id="" />
            </section>
            <section className="flex flex-col">
                <label className="font-medium" htmlFor="answer">Short Description: </label>
                <Textfield className="border border-black py-2" name="answer"/>
            </section>
            <section className="flex gap-2">
                <Button className="bg-green-300 font-bold py-2 px-3 hover:bg-green-400 shadow" text="Add Question"/>

                <Button handler={() => showModal({type: "CLOSE_MODAL"})}

                className="bg-red-300 font-bold py-2 px-3 hover:bg-red-400 shadow"
                
                text="Cancel"/>
            </section>
        </div>
    )
}

export default AddFlashcardModal
