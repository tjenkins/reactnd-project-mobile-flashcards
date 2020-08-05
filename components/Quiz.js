import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { white } from '../utils/colors'
import TextButton from './TextButton'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'

class Quiz extends Component {
  state = {
    responses: [],
    display: 'Question'
  }

  toggleDisplay = () => {
    this.setState((prevState) => ({
      display: prevState.display === 'Question' ? 'Answer' : 'Question'
    }))
  }

  getCurrentQuestion = () => (
    this.props.deck.questions[this.state.responses.length].question
  )

  getCurrentAnswer = () => (
    this.props.deck.questions[this.state.responses.length].answer
  )

  getCardText = () => (
    this.state.display === 'Question' ? this.getCurrentQuestion() : this.getCurrentAnswer()
  )

  logResponse = (response) => {
    this.setState((prevState) => {
      const responses = [...prevState.responses, response]
      return {
        responses,
        display: 'Question'
      }
    })
  }

  getNumCorrect = () => (
    this.state.responses.filter((response) => response === 'Correct').length
  )

  resetQuiz = () => {
    this.setState({
      responses: [],
      display: 'Question'
    })
  }

  clearTodayNotification = () => {
    return clearLocalNotification()
        .then(() => {
          let startDate = new Date()
          startDate.setDate(startDate.getDate() + 1)
          return setLocalNotification(startDate)
        })
  }

  render() {
    const { deck } = this.props
    const { responses, display } = this.state
    numQuestions = deck.questions.length

    if (numQuestions === responses.length) {
      this.clearTodayNotification()

      return (
        <View style={[styles.container, {justifyContent: 'center', alignItems: 'center'}]}>
          <Text style={{marginBottom: 30, fontSize: 20}}>You completed the Quiz!</Text>
          <Text style={{marginBottom: 30}}>{`You got ${this.getNumCorrect()} correct out of ${numQuestions} questions`}</Text>
          <TextButton onPress={this.resetQuiz}>Retry</TextButton>
          <TextButton onPress={() => this.props.navigation.goBack()}>Back to Deck</TextButton>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <View>
          <Text>{`${responses.length}/${numQuestions}`}</Text>
        </View>
        <View style={styles.cardWrapper}>
          <View style={styles.card}>
            <Text
              style={[
                styles.cardText,
                display === 'Question'
                  ? styles.questionText
                  : styles.answerText]}
            >
              {this.getCardText()}
            </Text>
            <TextButton onPress={this.toggleDisplay}>{`Show ${display === 'Question' ? 'Answer' : 'Question'}`}</TextButton>
          </View>
          <View>
            <TouchableOpacity style={[styles.btnCorrect, styles.btn]} onPress={() => this.logResponse('Correct')}>
              <Text style={styles.btnText} >Mark Correct</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btnIncorrect, styles.btn]} onPress={() => this.logResponse('Incorrect')}>
              <Text style={styles.btnText} >Mark Incorrect</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    padding: 10,
    flex: 1,
    backgroundColor: '#fff'
  },
  cardWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  card: {
    alignItems: 'center',
    padding: 50,
    paddingTop: 100,
    paddingBottom: 100,
    marginBottom: 50
  },
  cardText: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  btnCorrect: {
    backgroundColor: 'green',
    color: white,
    marginBottom: 10
  },
  btnIncorrect: {
    backgroundColor: 'red',
    color: white
  },
  btn: {
    padding: 10,
    alignItems: 'center',
    marginLeft: 50,
    marginRight: 50,
    borderRadius: 5,
  },
  btnText: {
    color: white,
    fontSize: 16,
    fontWeight: 'bold'
  },
  questionText: {
    color: 'black'
  },
  answerText: {
    color: 'gray'
  }
})

function mapStateToProps (state, { navigation }) {
  const { id } = navigation.state.params
  return {
    deck: state[id]
  }
}

export default connect(mapStateToProps)(Quiz)