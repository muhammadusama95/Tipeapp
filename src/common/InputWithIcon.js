import React from 'react'
import { View, TextInput, StyleSheet, Dimensions } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const { width, height } = Dimensions.get('screen')

export function InputWithIcon({
  value,
  onChangeText,
  label,
  icon,
  validate,
  ...rest
}) {
  return (
    <View style={styles.inputContainer}>
      {icon && (
        <Ionicons name={icon} size={24} color="grey" style={styles.Icon} />
      )}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={label}
        style={styles.input}
        onBlur={validate}
        {...rest}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    height: height * 0.05,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
    marginBottom: 10
  },
  Icon: { width: width * 0.08 },
  input: {
    fontFamily: 'Urbanist Regular',
    height: height * 0.045,
    fontSize: 16,
    flex: 1,
    color: 'black'
  }
})
