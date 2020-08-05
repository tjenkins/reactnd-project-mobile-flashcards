export const CREATE_DECK = 'CREATE_DECK'
export const CREATE_QUESTION = 'CREATE_QUESTION'
export const RECEIVE_DECKS = 'RECEIVE_DECKS'

export function receiveDecks (decks) {
  return {
    type: RECEIVE_DECKS,
    decks
  }
}

export function createDeck (title) {
  return {
    type: CREATE_DECK,
    title
  }
}

export function createQuestion (question) {
  return {
    type: CREATE_QUESTION,
    question
  }
}