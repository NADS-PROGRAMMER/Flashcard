import React from 'react'
import Button from './Button'

function QuestionsModal() {
    return (
        <div className="fixed transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 bg-green-300 py-4 px-4
        h-1/4 w-full max-w-xs md:max-w-md flex flex-col justify-between shadow-2xl rounded-md">
            <div className="bg-gray-100 h-full max-h-44 flex flex-col justify-between">
                <div className="flex flex-col justify-center mt-3">
                    <p className="text-center font-mono text-lg font-bold mb-4">Question</p>
                    <p className="text-center">Answer</p>
                </div>
                <div className="py-2 px-2 flex justify-evenly">
                    <Button className="font-bold text-green-400" text="Update"/>
                    <Button className="font-bold text-red-400" text="Delete" />
                </div>
            </div>
            <div className="flex justify-evenly">
                <Button className="font-bold" text="Previous"/> <span className="font-medium">1/10</span> <Button className="font-bold" text="Next" />
            </div>
        </div>
    )
}

export default QuestionsModal
