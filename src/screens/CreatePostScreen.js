import { useNavigation } from '@react-navigation/native'
import { addDoc, doc, setDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import Snackbar from 'react-native-snackbar'
import { useSelector } from 'react-redux'
import NowLoading from '../components/NowLoading'
import ScreenWrapper from '../components/ScreenWrapper'
import { db, postRef } from '../config/firebase'
import { colors } from '../theme'

export default function CreatePostScreen() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const { user } = useSelector((state) => state.user)

  const navigation = useNavigation()

  const handlePost = async () => {
    if (title && content) {
      try {
        setLoading(true)
        let doc = await addDoc(postRef, {
          title,
          content,
        })
        setLoading(false)
        if (doc && doc.id) navigation.goBack()
      } catch (e) {
        Snackbar.show({
          text: e.message,
          backgroundColor: 'red',
        })
      }
    } else {
      Snackbar.show({
        text: 'Correo y contraseña son requeridos',
        backgroundColor: 'red',
      })
    }
  }

  return (
    <ScreenWrapper>
      <View className="flex justify-between mx-4">
        <View>
          <View className="relative">
            <Text className={`${colors.heading} text-xl font-bold text-center`}>
              Crea un nuevo post
            </Text>
          </View>
          <View className="space-y-2 mx-2">
            <Text className={`${colors.heading} text-lg font-bold`}>
              Título
            </Text>
            <TextInput
              value={title}
              onChangeText={(value) => setTitle(value)}
              className="p-4 bg-white rounded-full mb-3"
            />
            <Text className={`${colors.heading} text-lg font-bold`}>
              Contenido
            </Text>
            <TextInput
              value={content}
              onChangeText={(value) => setContent(value)}
              className="p-4 bg-white rounded-full mb-3"
            />
          </View>
        </View>
        <View>
          {loading ? (
            <NowLoading />
          ) : (
            <TouchableOpacity
              onPress={handlePost}
              className="rounded-full p-3 shadow-sm mx-2 bg-blue-600 my-4"
            >
              <Text className="text-center text-white text-lg font-bold">
                Publicar
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScreenWrapper>
  )
}
