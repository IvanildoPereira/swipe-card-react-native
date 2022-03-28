import { questions, categories } from '../../constants/dummyData'
import { RESTART_QUESTIONS, UPDATE_FILTERD_CATEGORIES } from '../actions/questionsAction';

const filterdCategories = []; 
categories.map((category)=>{
    filterdCategories.push(category.id)
})

/* Randomize array in-place using Durstenfeld shuffle algorithm */
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

const filterQuestions = (questionsArray, filterdCategories) =>{
    return questionsArray.filter((question) => {
        return filterdCategories.includes(question.category)
    })
}

shuffleArray(questions)

const initialState = {
    questions: questions.slice(0,20),
    filterdCategories: filterdCategories,
    lastUpdate: Date.now()
}

const questionsReducer = (state = initialState, action) => {
    switch(action.type){
        case RESTART_QUESTIONS: 
            let newQ = filterQuestions(questions, state.filterdCategories)
            shuffleArray(newQ);          
            return {...state, questions: newQ.splice(0, 20), lastUpdate: Date.now()}
        case UPDATE_FILTERD_CATEGORIES:
           const updatedFiltedCategories = [...state.filterdCategories];
           let exist  = updatedFiltedCategories.includes(action.payload)
           if(exist){
               updatedFiltedCategories.splice(updatedFiltedCategories.indexOf(action.payload), 1)
           }
           else if(!exist){
               updatedFiltedCategories.push(action.payload)
           }

           return {
               ...state, filterdCategories: updatedFiltedCategories
           }
        default:
            return state;
    }
}

export default questionsReducer;
