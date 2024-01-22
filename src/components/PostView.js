import { React, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

export default function PostView({ title, autor, date, content }) {
  const [showContent, setShowContent] = useState(true)

  const truncatedContent = (text) => {
    const contentMaxLength = 70
    return text.length >= contentMaxLength
      ? text.substring(0, contentMaxLength) + '...'
      : text
  }

  const toggleContentVisibility = () => {
    setShowContent(!showContent)
  }

  const formattedContent = showContent ? truncatedContent(content) : content

  const formatDate = (date) => {
    if (date && date.seconds && date.nanoseconds !== undefined) {
      // Convertir el timestamp de Firebase a un objeto Date
      const dateObject = date.toDate()

      const options = { day: '2-digit', month: 'long', year: 'numeric' }
      const formattedDate = dateObject.toLocaleDateString(undefined, options)
      return formattedDate
    } else {
      console.error('El objeto date no es un timestamp de Firebase válido.')
      return ''
    }
  }

  return (
    <View className="flex-1 bg-slate-300 rounded shadow-sm my-1">
      <View className="justify-between items-baseline p-3">
        <Text className="font-bold text-2xl text-clip">{title}</Text>
      </View>
      <View className="flex-row px-3 justify-between items-baseline">
        <Text className="font-light">{autor}</Text>
        <Text className="font-light">{formatDate(date)}</Text>
      </View>
      <View className="p-3 justify-start">
        <Text numberOfLines={null}>{formattedContent}</Text>
      </View>
      {content.length >= 70 && (
        <TouchableOpacity className="p-3" onPress={toggleContentVisibility}>
          <Text>{showContent ? 'Ver más...' : 'Ocultar'}</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}
