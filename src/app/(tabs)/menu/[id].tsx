import { View, Text } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'

const PeroductDetailsScreen = () => {

  const { id } = useLocalSearchParams();


  return (
    <View>
      <Stack.Screen options={{ title: 'Details: ' + id }} />

      <Text style={{ color: 'white', fontSize: 20}}>PeroductDetailsScreen for id:  {id}</Text>
    </View>
  )
}

export default PeroductDetailsScreen