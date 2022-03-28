export const RESTART_QUESTIONS = "RESTART_QUESTIONS";
export const UPDATE_FILTERD_CATEGORIES = "UPDATE_FILTERD_CATEGORIES"

export const restartQuestions = () =>{
    return {
        type: RESTART_QUESTIONS
    }
}

export const updateFilterdCategories = (categoryID) =>{
    return {
        type: UPDATE_FILTERD_CATEGORIES,
        payload: categoryID
    }
}

