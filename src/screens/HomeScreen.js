import { React, useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import ScreenWrapper from '../components/ScreenWrapper'
import { colors } from '../theme'
import PostView from '../components/PostView'
import { signOut } from 'firebase/auth'
import {
  auth,
  getUserNameFromFirebase,
  getAllUsers,
  getUserPosts,
} from '../config/firebase'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { setUserName } from '../redux/slices/user'
import NowLoading from '../components/NowLoading'
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import FilterModal from '../components/FilterModal'

export default function HomeScreen() {
  const { user } = useSelector((state) => state.user)
  const name = useSelector((state) => state.userName)
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [userNameStored, setUserNameStored] = useState('')

  const [allPostsObtained, setAllPostsObtained] = useState([])
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [selectedAuthor, setSelectedAuthor] = useState(null)

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        setIsLoading(true)
        const fetchedUserName = await getUserNameFromFirebase(user.uid)
        setUserNameStored(fetchedUserName)
        dispatch(setUserName(fetchedUserName))

        const users = await getAllUsers()

        const usersWithPosts = await Promise.all(
          users.map(async (user) => {
            const userPosts = await getUserPosts(user.id)
            const userName = await getUserNameFromFirebase(user.id)

            const postsWithAuthor = userPosts.map((post) => ({
              id: post.id,
              author: userName,
              ...post,
            }))

            return postsWithAuthor
          })
        )

        const flattenedPosts = usersWithPosts.flat()
        setAllPostsObtained(flattenedPosts)
      } catch (error) {
        console.error('Error al obtener información', error.message)
        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserName()
  }, [user.uid, dispatch])

  const onAuthorSelected = (author) => {
    setSelectedAuthor(author)
    toggleFilterModal()
  }

  const toggleFilterModal = () => {
    setShowFilterModal(!showFilterModal)
  }

  const handleLogOut = async () => {
    await signOut(auth)
  }

  return (
    <ScreenWrapper>
      <View className="flex-row justify-between items-center p-3 mt-6">
        <Text className={`${colors.heading} font-bold text-3xl shadow-sm`}>
          Bienvenido {`${userNameStored}`}
        </Text>
        <TouchableOpacity
          onPress={handleLogOut}
          className="p-2 px-3 bg-white border-gray-200 rounded-full"
        >
          <Text className={`${colors.red}`}>Salir</Text>
        </TouchableOpacity>
      </View>
      <View className="max-h-[70%] mx-3 my-6">
        <View className="justify-between items-center flex-row">
          <Text className={`${colors.heading} font-bold text-xl`}>
            Publicaciones Recientes
          </Text>
          <TouchableOpacity
            onPress={() => setShowFilterModal(!showFilterModal)}
          >
            <MagnifyingGlassIcon size="30" />
          </TouchableOpacity>
          {showFilterModal && (
            <FilterModal
              visible={showFilterModal}
              onClose={toggleFilterModal}
              allPostsObtained={allPostsObtained}
              onAuthorSelected={onAuthorSelected}
            />
          )}
        </View>
        <View>
          {isLoading ? (
            <NowLoading />
          ) : error ? (
            <Text>Error: {error}</Text>
          ) : (
            <FlatList
              data={
                selectedAuthor
                  ? allPostsObtained.filter(
                      (post) => post.author === selectedAuthor
                    )
                  : allPostsObtained
              }
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <PostView
                  title={item.title}
                  autor={item.author}
                  date={item.timestamp}
                  content={item.content}
                />
              )}
            />
          )}
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
