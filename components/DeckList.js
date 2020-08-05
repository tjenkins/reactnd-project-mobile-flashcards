import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableHighlight } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { AppLoading } from 'expo'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions/index'
import { getDecks } from '../utils/api'

class DeckList extends Component {

  state = {
    ready: false
  }

  componentDidMount () {
    const { dispatch } = this.props
    getDecks()
      .then((decks) => dispatch(receiveDecks(decks)))
      .then(() => this.setState({ready: true}))
  }

  renderItem = ({ numCards, title, handlePress }) => (
    <TouchableHighlight
      activeOpacity={0.6}
      underlayColor='#ddd'
      onPress={handlePress}
    >
      <View style={styles.deckItem}>
        <Text>{title}</Text>
        <Text style={{ color: '#555' }}>{numCards} cards</Text>
      </View>
    </TouchableHighlight>
  )

  render() {
    const { decks } = this.props
    const { ready } = this.state

    if (ready === false) {
      return (
        <View>
          <AppLoading />
        </View>
      )
    }

    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={styles.title}>
          <Text style={{ fontSize: 20 }}>Deck List</Text>
        </View>
        {decks === undefined
          ? <View><Text>Add a deck</Text></View>
          : (<FlatList
              data={Object.entries(decks).map(([key, value]) => ({key, value}))}
              renderItem={({item}) => {
                return (
                  this.renderItem({
                    numCards: item.value.questions.length,
                    title: item.value.title,
                    handlePress: () => this.props.navigation.navigate(
                      'Deck',
                      {id: item.value.title}
                    )
                  }))
                }
              }
            />)}
        <View style={styles.footer}>
          <View style={{width: 50}}></View>
          <Text style={{fontSize: 12}}>{Object.keys(decks).length || 0} Decks</Text>
          <Entypo
            style={{width: 50}}
            onPress={() => this.props.navigation.navigate(
              'NewDeck',
            )}
            name="new-message"
            size={24}
            color="orange"
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    padding: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    borderTopWidth: 0,
  },
  deckItem: {
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: '#ccc',
  },
  container: {
    flex: 1
  },
  footer: {
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
})

function mapStateToProps (state) {
  return {
    decks: state
  }
}

export default connect(mapStateToProps)(DeckList)