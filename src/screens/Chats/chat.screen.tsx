import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

export default function Chats() {
  const navigation = useNavigation()
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate("ChangeProfile")}>
      <Text>Chats</Text>
      </TouchableOpacity>
    </View>
  )
}