import React from 'react'
import Textfield from '../InputComponents/Textfield'
import Button from './Button'
import '../CSS/modal.css'

function AddFlashcardModal() {
    return (
        <div className="modal">
            <section className="form-control">
                <label htmlFor="question">Question: </label>
                <textarea name="question" id="" cols="30" rows="5"></textarea>
            </section>
            <section className="form-control">
                <label htmlFor="answer">Answer: </label>
                <Textfield name="answer"/>
            </section>
            <section className="form-control">
                <Button className="btn-add-question" text="Add Question"/>
            </section>
        </div>
    )
}

export default AddFlashcardModal
