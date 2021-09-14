import React from 'react'
import Button from './Button'
import '../../src/index.css'

function Header({openModal}) {
    
    return (
        <header className="flex items-center gap-2 px-2 py-2 mb-8 bg-blue-900">
            
            <h1 className="text-3xl font-bold md:text-4xl text-blue-50">Flashcards</h1>

            <Button className="bg-green-300 font-bold py-2 px-3 hover:bg-green-400 shadow md:py-3 md:px-4 md:w-20 text-gray-900 my-4 outline-none border border-green-200" 
            text="New" 
            handler={() => openModal({type: 'SHOW_MODAL'})}
            
            />
        </header>
    )
}

export default Header
