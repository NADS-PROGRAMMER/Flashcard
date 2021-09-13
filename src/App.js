import Header from './Components/Header'
import Categories from './Components/Categories'
import AddFlashcardModal from './Components/AddFlashcardModal'
import './index.css'
import React, {useReducer} from 'react'

function App() {

  const reducer = (state, action) => {

    // Opens the modal
    if (action.type === 'SHOW_MODAL') {
      return {
        ...state,
        isModalOpen: true,
      }
    }
    // Closes the modal
    if (action.type === 'CLOSE_MODAL') {
      return {
        ...state,
        isModalOpen: false,
      }
    }
  }
  const initialState = {

    isModalOpen: false,
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <div className="py-4 px-4">
      <Header openModal={dispatch}/>
      <Categories />
      {state.isModalOpen && <AddFlashcardModal showModal={dispatch}/>}
    </div>
  );
}

export default App;
