import React, { Component } from 'react'
import Constants from 'expo-constants'
import { View, StatusBar } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers'
import DeckList from './components/DeckList'
import DeckOverview from './components/DeckOverview'
import Quiz from './components/Quiz'
import NewDeck from './components/NewDeck'
import NewQuestion from './components/NewQuestion'
import { resetDecks } from './utils/api'
import { setLocalNotification } from './utils/helpers'

function AppStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ height: Constants.statusBarHeight }}>
      <StatusBar {...props} />
    </View>
  )
}

const MainNavigator = createStackNavigator({
  Decks: {
    screen: DeckList,
    navigationOptions: {
      headerShown: false
    }
  },
  Deck: {
    screen: DeckOverview,
    navigationOptions: {
      headerBackTitle: 'Decks'
    }
  },
  Quiz: {
    screen: Quiz,
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      headerTitle: 'New Deck'
    }
  },
  NewQuestion: {
    screen: NewQuestion,
    navigationOptions: {
      headerTitle: 'New Question'
    }
  }
},{
  defaultNavigationOptions: {
    headerTitle: ''
  }
})

const AppContainer = createAppContainer(MainNavigator)

resetDecks()

class App extends Component {
  componentDidMount() {
    setLocalNotification(new Date)
  }

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <AppStatusBar barStyle="dark-content" />
          <AppContainer />
        </View>
      </Provider>
    )
  }
}

export default App