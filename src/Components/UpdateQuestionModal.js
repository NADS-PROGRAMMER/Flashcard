import React from 'react'
import Button from './Button'

function UpdateQuestionModal() {
    return (
        // opacity-0 -mt-10
        <form className="bg-blue-200  w-60 sm:w-32 md:w-72 flex flex-col gap-3 fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 py-4 px-2 border border-blue-500 shadow-xl z-10">
            <div className="flex flex-col items-stretch">
                <label className="font-medium" htmlFor="updated-question">
                    Updated Question:
                </label>
                <input className="border border-black py-2 px-1" type="text" name="updated-question" id="updated-question"/>
            </div>
            <div className="flex flex-col items-stretch">
                <label className="font-medium" htmlFor="updated-answer">
                    Updated Answer:
                </label>
                <input className="border border-black py-2 px-1" type="text" name="updated-answer" id="updated-answer" />
            </div>
            <div className="flex justify-end">
                <Button className="bg-blue-300 font-bold py-2 px-2 hover:bg-blue-400 shadow w-30 mx-1"  text="Update" />
                <Button className="bg-red-300 font-bold py-2 px-3 hover:bg-red-400 shadow" text="Cancel" />
            </div>
        </form>
    )
}

export default UpdateQuestionModal
