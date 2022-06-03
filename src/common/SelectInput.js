import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Picker from "./Picker";

export function SelectInput({
  children,
  label,
  value,
  onValueChange,
  validate,
  error
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.selectInput}>
        <Picker
          selectedValue={value}
          onValueChange={(value) => {
            onValueChange(value)
          }}
        >
          {children}
        </Picker>
      </View>
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
    </View>
  )
}

var styles = StyleSheet.create({
  container: { paddingBottom: 20 },
  selectInput: {
    backgroundColor: 'white',
    paddingVertical: 10,
    borderRadius: 5
  },
  input: {
    backgroundColor: '#fff',
    paddingLeft: 10,
    height: 43,
    borderRadius: 5
  },
  label: { color: 'grey', marginBottom: 3, marginLeft: 2 }
})
