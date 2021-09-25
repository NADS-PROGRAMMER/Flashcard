import React from 'react'
import Button from './Button'

function Categories({dispatch, categories, disabled}) {

    return (
        <div className="flex flex-wrap gap-4 justify-center items-stretch px-4 py-2 md:px-8">

            {categories && categories.map((category) => {

                return (
                    <section key={category.id} className="flex flex-col jusitfy-around  gap-3 bg-green-100 py-5 px-3 hover:scale-150 border-2 border-green-900 max-w-sm w-full
                       shadow-2xl hover:bg-green-200 cursor-pointer" onClick={() => dispatch({type: 'OPEN_FLASHCARD', payload: {isFlashcardOpen: true, categoryID: category.id}})}>
      
                        <section>
                            <h1 className="text-2xl break-all font-medium">{category['category']}</h1>
                            <p className="font-semibold break-all text-blue-900">{category['description']}</p>
                        </section>
                        
                        <section className="flex gap-3">

                            {/* ADD QUESTION BUTTON */}
                            <Button 
                                disabled={disabled}
                                className="bg-green-300 font-bold py-2 px-2 hover:bg-green-400 shadow w-30" 
                                text="Add Question"
                                handler={(e) => {
                                    e.stopPropagation(); // to also avoid running the event of the whole category.
                                    dispatch({type: 'SHOW_QUESTION_MODAL', payload: category.id})
                                }}
                            />

                            {/* EDIT BUTTON */}
                            <Button 
                                disabled={disabled}
                                className="bg-blue-300 font-bold py-2 px-2 hover:bg-blue-400 shadow w-30" 
                                text="Edit" 
                                handler={(e) => {

                                    e.stopPropagation();
                                    dispatch({type: 'SHOW_UPDATE_MODAL', payload: {isUpdateModalOpen: true, category: category['category'], description: category['description'], categoryID: category['id']}})
                                }}
                            />

                            {/* This is the "Delete Button" for deleting the specific category 
                                DELETE BUTTON
                            */}
                            <Button  
                                disabled={disabled}
                                className="bg-red-300 font-bold py-2 px-3 hover:bg-red-400 shadow" 
                                text="Delete" 
                                handler={(e) => {

                                e.stopPropagation();
                                dispatch({type: 'SHOW_CONFIRMATION', payload: {isConfirmationModalOpen: true, categoryID: category.id, categoryName: category['category']}})
                            }}/>
                        </section>
                     </section>
                )
            })}
            
        </div>
    )
}

export default Categories
