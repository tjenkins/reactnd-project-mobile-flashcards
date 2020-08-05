import { CREATE_DECK, CREATE_QUESTION, RECEIVE_DECKS } from '../actions'

function flashcards (state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS :
      return {
        ...state,
        ...action.decks
      }
    case CREATE_DECK : {
      const title = action.title

      return {
        ...state,
        [title]: {
          title,
          questions: []
        }
      }
    }
    case CREATE_QUESTION : {
      const title = action.question.title
      const { question, answer } = action.question.card

      return {
        ...state,
        [title]: {
          ...state[title],
          questions: [
            ...state[title].questions,
            { question,
              answer
            }
          ]
        }
      }
    }
    default :
      return state
  }
}

export default flashcards