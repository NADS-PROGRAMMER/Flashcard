import Header from './Components/Header'
import Categories from './Components/Categories'
import AddFlashcardModal from './Components/AddFlashcardModal'
import './index.css'
import React, {useEffect, useReducer} from 'react'
import {reducer} from './Javascripts/reducer'
import MessageModal from './Components/MessageModal'

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
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <div className="">
      <Header openModal={dispatch}/>
      <Categories dispatch={dispatch} categories={JSON.parse(localStorage.getItem('categories'))}/>

      {state.isModalOpen && 
          <AddFlashcardModal 
          categoryLength={state.categoryLength} 
          descriptionLength={state.descriptionLength} 
          isModalOpen={state.isModalOpen} 
          showModal={dispatch}
        />}
        {state.message.isMessageModalOpen && 
        
          <MessageModal 
          modalContent={state.message.modalContent}  
          isMessageError={state.message.isMessageError} 
          dispatch={dispatch}
        />}
    </div>
  );
}

export default App;
