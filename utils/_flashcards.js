// Utilities for backfilling the flashcards.
import { AsyncStorage } from 'react-native'

export const FLASHCARD_STORAGE_KEY = 'Udacity:flashcards'

export function setDummyData () {

  AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(DUMMY_DATA))

  return DUMMY_DATA
}

const DUMMY_DATA = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}