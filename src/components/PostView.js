import { React } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

export default function PostView({ title, autor, date, content }) {
  let contentMaxLength = 70
  const truncatedContent =
    content.length >= contentMaxLength
      ? content.substring(0, contentMaxLength) + '...'
      : content

  return (
    <TouchableOpacity className="flex-1 bg-slate-300 rounded shadow-sm my-1">
      <View className="justify-between items-baseline p-3">
        <Text className="font-bold text-2xl text-clip">{title}</Text>
      </View>
      <View className="flex-row px-3 justify-between items-baseline">
        <Text className="font-light">{autor}</Text>
        <Text className="font-light">{date}</Text>
      </View>
      <View className="flex-1 p-3 justify-start">
        <Text>{truncatedContent}</Text>
      </View>
    </TouchableOpacity>
  )
}
