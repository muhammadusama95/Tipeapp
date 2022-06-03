import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'

export function Input({
  label,
  value,
  onChangeText,
  error,
  validate,
  ...rest
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={label}
        style={styles.input}
        {...rest}
      />
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
    </View>
  )
}

var styles = StyleSheet.create({
  container: { paddingBottom: 20 },
  input: {
    backgroundColor: '#fff',
    paddingLeft: 10,
    height: 43,
    borderRadius: 5
  },
  label: { color: 'grey', marginBottom: 3, marginLeft: 2 }
})
