import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux'
import TextButton from './TextButton'
import { createDeck } from '../actions'
import { saveDeckTitle } from '../utils/api'

class NewDeck extends Component {
  state = {
    input: ''
  }

  handleChangeText = (text) => {
    this.setState({
      input: text
    })
  }

  handleSubmit = () => {
    const { input } = this.state

    this.props.dispatch(createDeck(input))

    saveDeckTitle(input)

    const resetAction = StackActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({ routeName: 'Decks' }),
        NavigationActions.navigate({ routeName: 'Deck', params: {id: input} }),
      ],
    })

    this.props.navigation.dispatch(resetAction)
  }

  handleCancel = () => {
    this.setState({
      input: ''
    })
    this.props.navigation.goBack()
  }

  render() {
    const { input } = this.state

    return (
      <View style={styles.container}>
        <View style={styles.inputWrapper}>
          <Text style={{marginBottom: 20, marginTop: 50}}>Enter a title:</Text>
          <TextInput autoFocus value={input} style={styles.input} onChangeText={this.handleChangeText} />
          <View style={styles.btnContainer} >
            <TextButton onPress={this.handleSubmit} disabled={input === ''}>Save</TextButton>
            <TextButton onPress={this.handleCancel}>Cancel</TextButton>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  inputWrapper: {
    flex: 1,
    padding: 50,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
    marginBottom: 10,
    padding: 5
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})

export default connect()(NewDeck)