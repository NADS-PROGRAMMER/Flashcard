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

    // FOR SHOWING THE MESSAGE MODAL
    if (action.type === 'SHOW_MESSAGE_MODAL' || action.type === 'HIDE_MESSAGE_MODAL') {

        let newObj = {...state.message, isMessageModalOpen: action.payload.isMessageModalOpen, modalContent: action.payload.modalContent, isMessageError: action.payload.isMessageError}
        return {

            ...state,
            message: newObj
        }
    }
  }