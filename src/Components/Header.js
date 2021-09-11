import React from 'react'
import Button from './Button'

// STYLES
import '../CSS/header.css'

function Header() {
    return (
        <header>
            <h1>Flashcards</h1>
            <Button className="btn-add-category" text="Add"/>
        </header>
    )
}

export default Header
