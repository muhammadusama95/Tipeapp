import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

export function Pagination({ length, pageNumber, pageLength, onNext, onPrev }) {
  const isFirstPage = pageNumber === 0
  const isLastPage = length <= (pageNumber + 1) * pageLength

  return (
    <View style={styles.container}>
      {!isFirstPage && (
        <TouchableOpacity
          style={[styles.button, styles.prevButton]}
          onPress={onPrev}
        >
          <Text style={styles.text}>{"<"}</Text>
        </TouchableOpacity>
      )}
      {!isLastPage && (
        <TouchableOpacity
          style={[styles.button, styles.nextButton]}
          onPress={onNext}
        >
          <Text style={styles.text}>{">"}</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 'auto',
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between'
  },
  prevButton: {
    marginRight: 'auto'
  },
  nextButton: {
    marginLeft: 'auto'
  },
  button: {
    width: 80,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
    borderRadius: 5,
    backgroundColor: 'rgb(80,80,180)'
  },
  text: {
    fontSize: 12,
    fontFamily: 'normal',
    color: '#fff'
  }
})
