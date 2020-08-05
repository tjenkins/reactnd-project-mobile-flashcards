import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { connect } from 'react-redux'
import TextButton from './TextButton'
import { addCardToDeck } from '../utils/api'
import { createQuestion } from '../actions'

class NewQuestion extends Component {
  state = {
    question: '',
    answer: ''
  }

  handleChangeText = (name) => (text) => {
    this.setState({
      [name]: text
    })
  }

  handleSubmit = () => {
    const { id } = this.props.navigation.state.params
    const { question, answer } = this.state

    this.props.dispatch(createQuestion({
      title: id,
      card: {
        question,
        answer
      }
    }))

    addCardToDeck(id, {question, answer})

    this.props.navigation.goBack()
  }

  handleCancel = () => {
    this.setState({
      question: '',
      answer: ''
    })

    this.props.navigation.goBack()
  }

  render() {
    const { question, answer } = this.state

    return (
      <View style={styles.container}>
        <View style={styles.inputWrapper}>
          <Text>Question:</Text>
          <TextInput autoFocus value={question} style={styles.input} onChangeText={this.handleChangeText('question')} />
          <Text>Answer:</Text>
          <TextInput value={answer} style={styles.input} onChangeText={this.handleChangeText('answer')} />
          <View style={styles.btnContainer} >
            <TextButton
              onPress={this.handleSubmit}
              disabled={question === '' || answer === ''}
            >
              Save
            </TextButton>
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
    marginTop: 10,
    marginBottom: 20,
    padding: 5
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})

export default connect()(NewQuestion)