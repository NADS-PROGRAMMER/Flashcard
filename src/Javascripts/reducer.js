export const reducer = (state, action) => {

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

    if (action.type === 'SHOW_QUESTION_MODAL') {

      return {
        ...state,
        isModalOpen: true,
        addQuestion: {
          isAddQuestionModalOpen: true,
          categoryID: action.payload
        }
      }
    }

    // Closes the modal
    if (action.type === 'CLOSE_MODAL') {
      return {
        ...state,
        isModalOpen: false,
        addQuestion: {
          isAddQuestionModalOpen: false,
          categoryID: 0
        }
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

      return {
        ...state,
        categories: newCategories,
        isModalOpen: false,
      }
    }

    if (action.type === 'SHOW_CONFIRMATION') {

      return {
        ...state,
        delete: {
          categoryName: action.payload.categoryName,
          isConfirmationModalOpen: action.payload.isConfirmationModalOpen,
          categoryID: action.payload.categoryID
        }
      }
    }
    // HERE'S THE ACTION FOR REMOVING THE SPECIFIC CATEGORY BASED ON ID.
    if (action.type === 'REMOVE_CATEGORY') {

      const newCategories = JSON.parse(localStorage.getItem('categories')).filter(category => {

        return category.id !== state['delete'].categoryID
      })
      
      localStorage.setItem('categories', JSON.stringify(newCategories))

      return {
        ...state,
        categories: newCategories,
        delete: {
          categoryName: '',
          isConfirmationModalOpen: false,
          categoryID: 0
        }
      }
    }

    // FOR SHOWING THE MESSAGE MODAL
    if (action.type === 'SHOW_MESSAGE_MODAL' || action.type === 'HIDE_MESSAGE_MODAL') {

        let newObj = {...state.message, isMessageModalOpen: action.payload.isMessageModalOpen, modalContent: action.payload.modalContent, isMessageError: action.payload.isMessageError}
        return {

            ...state,
            message: newObj
        }
    }

    // SHOW UPDATE MODAL
    if (action.type === 'SHOW_UPDATE_MODAL') {

        let newObj = {...state.update, isUpdateModalOpen: action.payload.isUpdateModalOpen, updateCategoryContent: action.payload.category, updateDescriptionContent: action.payload.description, categoryID: action.payload.categoryID}

        return {
            ...state,
            isModalOpen: action.payload.isUpdateModalOpen,
            update: newObj,
        }
    }
    
    // EVENTS FOR UPDATING THE SPECIFIC CATEGORY.
    if (action.type === 'UPDATE_CATEGORY') {

      let newCategories = JSON.parse(localStorage.getItem('categories')).map(category => {

        if (state.update.categoryID === category['id']) {

          return {

            ...category,
            category: action.payload.category,
            description: action.payload.description
          }
        }
        return category
      })

      localStorage.setItem('categories', JSON.stringify(newCategories))

      return {
        ...state,
        categories: newCategories,
        isModalOpen: false,
        categoryLength: 25,
        descriptionLength: 45,
        update: {
          isUpdateModalOpen: false,
          updateCategoryContent: '',
          updateDescriptionContent: '',
          categoryID: 0
        }
      }
    }

    /** NOTE:
     * 
     * BUGS ARE STILL OCCURING IN THIS BLOCK OF CODE.
     */
    if (action.type === 'ADD_QUESTION') {

      let newCategories = JSON.parse(localStorage.getItem('categories')).map(category => {

        if (category.id === state['addQuestion'].categoryID) {

          let updatedQuestions = [...category['questions'], {question: action.payload.question, answer: action.payload.answer, id: new Date().getTime().toString()}]

          return {

            ...category,
            questions: updatedQuestions
          }
        }
        return category
      })

      localStorage.setItem('categories', JSON.stringify(newCategories))

      return {

        ...state,
        categories: newCategories
      }
    }
  }