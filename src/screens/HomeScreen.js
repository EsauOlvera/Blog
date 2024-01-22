import { React, useEffect, useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native'
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
import AsyncStorage from '@react-native-async-storage/async-storage'
import NetInfo from '@react-native-community/netinfo'

export default function HomeScreen() {
  const { user } = useSelector((state) => state.user)
  const name = useSelector((state) => state.userName)
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [userNameStored, setUserNameStored] = useState('')

  const [allPostsObtained, setAllPostsObtained] = useState([])
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [selectedAuthor, setSelectedAuthor] = useState(null)
  const [postsLoaded, setPostsLoaded] = useState(false)
  const [isOffline, setIsOffLine] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [refreshing, setRefreshing] = useState(null)

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        setIsLoading(true)
        setIsOffLine(true)
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

        savePosts(flattenedPosts)
        setPostsLoaded(true)
        setRefreshing(false)
        setIsOffLine(false)
        const netInfoState = await NetInfo.fetch()
        if (!netInfoState.isConnected) {
          setIsOffLine(false)
        }
      } catch (error) {
        setIsOffLine(true)
        Snackbar.show({
          text: error.message,
          backgroundColor: 'red',
        })
        const netInfoState = await NetInfo.fetch()
        if (netInfoState.isConnected) {
          setAllPostsObtained(await getPosts())
          setPostsLoaded(true)
        } else {
          setError(
            'No se pudo cargar la información. Verifica tu conexión a Internet.'
          )
        }
      } finally {
        setRefreshing(false)
        setIsLoading(false)
      }
    }

    fetchUserName()
  }, [user.uid, dispatch, refreshing])

  const savePosts = async (posts) => {
    try {
      await AsyncStorage.setItem('posts', JSON.stringify(posts))
    } catch (error) {
      console.error('Error al guardar posts:', error)
    }
  }

  const getPosts = async () => {
    try {
      const savedPosts = await AsyncStorage.getItem('posts')
      console.log('Datos obtenidos de AsyncStorage:', savedPosts)
      return savedPosts ? JSON.parse(savedPosts) : []
    } catch (error) {
      console.error('Error al obtener posts:', error)
      return []
    }
  }

  const onAuthorSelected = (author) => {
    setSelectedAuthor(author)
    toggleFilterModal()
  }

  const onDateSelected = (date) => {
    setSelectedDate(date)
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
              onDateSelected={onDateSelected}
            />
          )}
        </View>
        <View>
          {isLoading ? (
            <NowLoading />
          ) : (
            postsLoaded && (
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
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={() => {
                      setRefreshing(true)
                    }}
                  />
                }
                renderItem={({ item }) => (
                  <PostView
                    title={item.title}
                    autor={item.author}
                    date={item.timestamp}
                    content={item.content}
                  />
                )}
              />
            )
          )}
        </View>
      </View>
      <View className="flex justify-between mx-4">
        <TouchableOpacity
          onPress={() => navigation.navigate('Creacion')}
          className={`rounded-full p-2 shadow-sm bg-blue-600 my-6  ${
            isOffline ? 'opacity-50' : ''
          } ${refreshing ? 'opacity-50' : ''}`}
          disabled={isOffline || refreshing}
        >
          <Text className="text-center text-white text-lg font-bold">
            {refreshing
              ? `Cargando`
              : isOffline
              ? `Servicio no disponible`
              : `Nuevo Post`}
          </Text>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  )
}
