import React from 'react'
import Button from './Button'
import '../../src/index.css'

function Header({openModal, disabled}) {
    
    return (
        <header className="flex items-center gap-3 px-10 py-2 mb-8 bg-gray-900 w-screen">
            
            <h1 className="text-3xl font-bold md:text-4xl text-blue-50">Flashcards</h1>

            <Button disabled={disabled} className="bg-gray-900 font-bold py-2 px-4 hover:bg-gray-800 shadow md:py-2 md:px-4 md:w-20 text-white my-4 outline-none border border-white rounded-md transition-all transform hover:scale-110" 
            text="New" 
            handler={() => openModal({type: 'SHOW_MODAL'})}
            
            />
        </header>
    )
}

export default Header
