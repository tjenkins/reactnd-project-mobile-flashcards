import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { blue } from '../utils/colors'

export default function TextButton ({ children, onPress, style = {}, disabled = false }) {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <Text style={[styles.reset, disabled && styles.disabled, style]}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  reset: {
    textAlign: 'center',
    color: blue,
    padding: 10
  },
  disabled: {
    color: '#ccc'
  }
})