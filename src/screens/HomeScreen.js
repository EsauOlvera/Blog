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
    <ScreenWrapper className="flex-1">
      <View className="flex-row justify-between items-center p-3">
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
      <View className="max-h-[77%] mx-3">
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
                  title={item.titulo}
                  autor={item.autor}
                  date={item.fecha}
                  content={item.contenido}
                />
              )
            }}
          />
        </View>
      </View>
      <View className="justify-between items-center">
        <TouchableOpacity
          onPress={() => navigation.navigate('Creacion')}
          className={`${colors.heading} p-2 px-3 bg-blue-600 rounded-full my-8`}
        >
          <Text className={`${colors.btnColor}`}>Añadir nueva publicación</Text>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  )
}
