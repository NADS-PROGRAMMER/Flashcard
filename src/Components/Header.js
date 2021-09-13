import React from 'react'
import Button from './Button'
import '../../src/index.css'

function Header({openModal, isModalOpen}) {
    return (
        <header className="">
            <h1 className="text-3xl font-bold md:text-4xl">Flashcards</h1>
            <Button className="bg-green-300 font-bold py-2 px-3 hover:bg-green-400    shadow md:py-3 md:px-4 md:w-20 text-gray-900 my-4" 
            
            
            text="ADD" 
        
            handler={() => openModal({type: 'SHOW_MODAL'})}
            
            />
        </header>
    )
}

export default Header
