import { React } from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import ScreenWrapper from '../components/ScreenWrapper'
import { colors } from '../theme'
import { items } from '../constants/items'
import PostView from '../components/PostView'
import { signOut } from 'firebase/auth'
import { auth } from '../config/firebase'
import { useNavigation } from '@react-navigation/native'

export default function HomeScreen() {
  const navigation = useNavigation()

  const handleLogOut = async () => {
    await signOut(auth)
  }

  return (
    <ScreenWrapper>
      <View className="flex-row justify-between items-center p-3 mt-6">
        <Text className={`${colors.heading} font-bold text-3xl shadow-sm`}>
          Bienvenido
        </Text>
        <TouchableOpacity
          onPress={handleLogOut}
          className="p-2 px-3 bg-white border-gray-200 rounded-full"
        >
          <Text className={`${colors.red}`}>Salir</Text>
        </TouchableOpacity>
      </View>
      <View className="max-h-[70%] mx-3 my-6">
        <View className="justify-between items-center">
          <Text className={`${colors.heading} font-bold text-xl`}>
            Publicaciones Receientes
          </Text>
        </View>
        <View>
          <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <PostView
                  title={item.title}
                  autor={item.author}
                  date={item.date}
                  content={item.content}
                />
              )
            }}
          />
        </View>
      </View>
      <View className="flex justify-between mx-4">
        <TouchableOpacity
          onPress={() => navigation.navigate('Creacion')}
          className="rounded-full p-2 shadow-sm bg-blue-600 my-6"
        >
          <Text className="text-center text-white text-lg font-bold">
            Nuevo Post
          </Text>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  )
}
