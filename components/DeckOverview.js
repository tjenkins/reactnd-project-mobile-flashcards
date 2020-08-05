import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import TextButton from './TextButton'

class DeckOverview extends Component {
  render() {
    const { deck, navigation } = this.props

    return (
      <View style={styles.container}>
        <View style={styles.deckInfo}>
          <Text style={{fontSize: 24}}>{deck.title}</Text>
          <Text style={{fontSize: 14}}>{deck.questions.length} cards</Text>
        </View>
        <View>
          <TextButton onPress={() => navigation.navigate('NewQuestion', { id: deck.title })}>
            Add Card
          </TextButton>
          {deck.questions.length > 0 &&
            <TextButton onPress={() => navigation.navigate('Quiz', { id: deck.title })}>
              Start Quiz
            </TextButton>}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'stretch',
    flex: 1,
    backgroundColor: '#fff'
  },
  deckInfo: {
    alignItems: 'center',
    padding: 50,
    paddingTop: 100,
    paddingBottom: 100,
  },
})

function mapStateToProps (state, { navigation }) {
  const { id } = navigation.state.params
  return {
    deck: state[id]
  }
}

export default connect(mapStateToProps)(DeckOverview)