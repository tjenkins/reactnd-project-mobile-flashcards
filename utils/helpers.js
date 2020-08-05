import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'
import { AsyncStorage } from 'react-native'

const NOTIFICATION_KEY = 'Udacity:flashcard-notifications'

export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

export function setLocalNotification (startDate) {
  return AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              Notifications.setNotificationHandler({
                handleNotification: async () => ({
                  shouldShowAlert: true,
                  shouldPlaySound: true,
                  shouldSetBadge: true
                })
              })

              Notifications.scheduleNotificationAsync({
                content: {
                  title: 'Time to practice!',
                  body: "Don't forget to practice your flashcards today!"
                },
                trigger: {
                  year: startDate.getFullYear(),
                  month: startDate.getMonth(),
                  day: startDate.getDate(),
                  hour: 20,
                  minute: 0,
                  repeats: true
                }
              })

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}