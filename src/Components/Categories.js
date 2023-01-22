import React from 'react'
import Button from './Button'

function Categories({dispatch, categories, disabled}) {

    return (
        <div className=" px-4 py-2 md:px-8 flex gap-2 flex-wrap">

            {categories && categories.map((category) => {

                return (
                    <section 
                        key={category.id} 
                        className="flex flex-col jusitfy-around  gap-3 bg-gray-900 py-5 px-3 hover:scale-150 border-2 border-gray-800 max-w-sm w-full
                       shadow-2xl hover:bg-gray-800 cursor-pointer rounded-md transition-colors" 
                       onClick={() => dispatch({type: 'OPEN_FLASHCARD', payload: {isFlashcardOpen: true, categoryID: category.id}})}>
      
                        <section>
                            <h1 className="text-2xl break-all text-white font-bold">{category['category']}</h1>
                            <p className="font-normal break-all text-white">{category['description']}</p>
                        </section>
                        
                        <section className="flex gap-2">

                            {/* ADD QUESTION BUTTON */}
                            <Button 
                                disabled={disabled}
                                className="px-3 border border-white text-white font-semibold hover:bg-gray-700 rounded-lg max-h-80 transition-transform transform hover:scale-110" 
                                text="Add Question"
                                handler={(e) => {
                                    e.stopPropagation(); // to also avoid running the event of the whole category.
                                    dispatch({type: 'SHOW_QUESTION_MODAL', payload: category.id})
                                }}
                            />

                            {/* EDIT BUTTON */}
                            <Button 
                                disabled={disabled}
                                className="bg-blue-900 text-white font-bold py-2 hover:bg-blue-800 shadow w-30 px-3 rounded-lg border border-white transition-transform transform hover:scale-110" 
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
                                className="bg-red-900 font-bold px-3 hover:bg-red-800 shadow border border-white rounded-lg text-white transition-transform transform hover:scale-110" 
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
