import Header from './Components/Header'
import Categories from './Components/Categories'
import AddFlashcardModal from './Components/AddFlashcardModal'
import React, {useEffect, useReducer} from 'react'
import {reducer} from './Javascripts/reducer'
import MessageModal from './Components/MessageModal'
import ConfirmationModal from './Components/ConfirmationModal'
import './index.css'

function App() {

  const initialState = {

    categories: JSON.parse(localStorage.getItem('categories')) || [],
    isModalOpen: false,
    categoryLength: 25,
    descriptionLength: 45,
    message: {
      isMessageModalOpen: false,
      modalContent: '',
      isMessageError: false
    },
    update: {
      isUpdateModalOpen: false,
      updateCategoryContent: '',
      updateDescriptionContent: '',
      categoryID: 0
    },
    delete: {
      categoryName: '',
      isConfirmationModalOpen: false,
      categoryID: 0
    },
    addQuestion: {
      isAddQuestionModalOpen: false,
      categoryID: 0
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <div className="">

      <Header disabled={state['delete'].isConfirmationModalOpen} openModal={dispatch}/>

      <Categories 
        disabled={state.isModalOpen || state.delete.isConfirmationModalOpen}
        dispatch={dispatch} 
        categories={JSON.parse(localStorage.getItem('categories'))}
      />

      {state.isModalOpen && 
          <AddFlashcardModal 
          categoryLength={state.categoryLength} 
          descriptionLength={state.descriptionLength} 
          isModalOpen={state.isModalOpen} 
          dispatch={dispatch}
          isUpdateModalOpen={state.update.isUpdateModalOpen}
          updateCategoryContent={state.update.updateCategoryContent}
          updateDescriptionContent={state.update.updateDescriptionContent}
          isAddQuestionModalOpen={state.addQuestion.isAddQuestionModalOpen}
        />}

        {state.message.isMessageModalOpen && 
        
          <MessageModal 
          modalContent={state.message.modalContent}  
          isMessageError={state.message.isMessageError} 
          dispatch={dispatch}
        />}
        {state['delete'].isConfirmationModalOpen && <ConfirmationModal categoryName={state['delete'].categoryName} dispatch={dispatch}/>}

    </div>
  );
}

export default App;
