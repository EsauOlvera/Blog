import { React } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

export default function PostView({ title, autor, date, content }) {
  let contentMaxLength = 70

  const contentText = typeof content === 'string' ? content : ''

  const truncatedContent =
    contentText.length >= contentMaxLength
      ? contentText.substring(0, contentMaxLength) + '...'
      : contentText

  const formatDate = (date) => {
    if (date && date.seconds && date.nanoseconds !== undefined) {
      // Convertir el timestamp de Firebase a un objeto Date
      const dateObject = date.toDate()

      const options = { day: '2-digit', month: 'long', year: 'numeric' }
      const formattedDate = dateObject.toLocaleDateString(undefined, options)
      console.log(formattedDate)
      return formattedDate
    } else {
      console.error('El objeto date no es un timestamp de Firebase válido.')
      return ''
    }
  }

  return (
    <TouchableOpacity className="flex-1 bg-slate-300 rounded shadow-sm my-1">
      <View className="justify-between items-baseline p-3">
        <Text className="font-bold text-2xl text-clip">{title}</Text>
      </View>
      <View className="flex-row px-3 justify-between items-baseline">
        <Text className="font-light">{autor}</Text>
        <Text className="font-light">{formatDate(date)}</Text>
      </View>
      <View className="flex-1 p-3 justify-start">
        <Text>{truncatedContent}</Text>
      </View>
    </TouchableOpacity>
  )
}
