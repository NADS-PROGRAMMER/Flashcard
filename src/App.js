import Header from './Components/Header'
import Categories from './Components/Categories'
import AddFlashcardModal from './Components/AddFlashcardModal'
import './index.css'
import React, {useEffect, useReducer} from 'react'

function App() {
  
  const reducer = (state, action) => {

    // Opens the modal
    if (action.type === 'SHOW_MODAL') {

      let categoryLength = 25
      let descriptionLength = 45

      return {
        ...state,
        isModalOpen: true,
        categoryLength: categoryLength,
        descriptionLength: descriptionLength,
      }
    }
    // Closes the modal
    if (action.type === 'CLOSE_MODAL') {
      return {
        ...state,
        isModalOpen: false,
      }
    }

    // CHANGE THE CATEGORY LENGTH VALUE
    if (action.type === 'CHANGE_CATEGORY_VALUE') {

      let originalLength = 25
      let newCategoryLength = originalLength - action.payload.length

      return {
        ...state,
        categoryLength:  newCategoryLength
      }
    }

    // CHANGE THE CATEGORY LENGTH VALUE
    if (action.type === 'CHANGE_DESCRIPTION_VALUE') {
 
      let originalLength = 45
      let newDescriptionLength = originalLength - action.payload.length

      if (newDescriptionLength < 0)
        return state

      return {
        ...state,
        descriptionLength: newDescriptionLength
      }
    }

    if (action.type === 'ADD_CATEGORY') {

      const newCategories = [...state.categories, {...action.payload, id: new Date().getTime().toString()}]

      localStorage.setItem('categories', JSON.stringify(newCategories))

      console.log(typeof JSON.parse(localStorage.getItem('categories')))
      console.log(JSON.parse(localStorage.getItem('categories'))[1])

      return {
        ...state,
        categories: newCategories,
        isModalOpen: false,
      }
    }

    // HERE'S THE ACTION FOR REMOVING THE SPECIFIC CATEGORY BASED ON ID.
    if (action.type === 'REMOVE_CATEGORY') {

      const newCategories = JSON.parse(localStorage.getItem('categories')).filter(category => {

        return category.id !== action.payload
      })
      
      localStorage.setItem('categories', JSON.stringify(newCategories))
      return {
        ...state,
        categories: newCategories
      }
    }
  }

  const initialState = {

    categories: JSON.parse(localStorage.getItem('categories')) || [],
    isModalOpen: false,
    categoryLength: 25,
    descriptionLength: 45,
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <div className="">
      <Header openModal={dispatch}/>
      <Categories dispatch={dispatch} categories={JSON.parse(localStorage.getItem('categories'))}/>

      {state.isModalOpen && <AddFlashcardModal categoryLength={state.categoryLength} descriptionLength={state.descriptionLength} isModalOpen={state.isModalOpen} showModal={dispatch}/>}
    </div>
  );
}

export default App;
