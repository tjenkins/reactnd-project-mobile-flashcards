import { AsyncStorage } from 'react-native'
import { FLASHCARD_STORAGE_KEY, setDummyData } from './_flashcards'

export function getDecks () {

  return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
    .then((result) => {
      if (result === null) {
        return setDummyData()
      }  else {
        return JSON.parse(result)
      }
    })
}

export function resetDecks () {
  return AsyncStorage.removeItem(FLASHCARD_STORAGE_KEY)
    .then(getDecks)
}

export function getDeck (id) {
  return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
    .then((result) => {
      return JSON.parse(result)[id]
    })
}

export function saveDeckTitle (title) {
  return AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY, JSON.stringify({
    [title]: {
      title,
      questions: []
    }
  }))
}

export function addCardToDeck (title, card) {
  return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
    .then((result) => {
      const data = JSON.parse(result)

      return AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY, JSON.stringify({
        [title]: {
          questions: [
            ...data[title].questions,
            card
          ]
        }
      }))
    })
}