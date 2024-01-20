import { React } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/HomeScreen'
import CreatePostScreen from '../screens/CreatePostScreen'
import WelcomeScreen from '../screens/WelcomeScreen'
import SignUpScreen from '../screens/SignUpScreen'
import SignInScreen from '../screens/SignInScreen'
import { useDispatch, useSelector } from 'react-redux'
import { onAuthStateChanged } from 'firebase/auth'
import { setUser } from '../redux/slices/user'
import { auth } from '../config/firebase'

const Stack = createNativeStackNavigator()

export default function AppNavigation() {
  const { user } = useSelector((state) => state.user)

  const dispatch = useDispatch()

  onAuthStateChanged(auth, (u) => {
    dispatch(setUser(u))
  })

  if (user) {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Inicio"
          screenOptions={{ headerBackTitleVisible: false }}
        >
          <Stack.Screen
            options={{ headerBackVisible: false }}
            name="Inicio"
            component={HomeScreen}
          />
          <Stack.Screen
            screenOptions={{ headerBackTitleVisible: false }}
            name="Creacion"
            component={CreatePostScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    )
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Bienvenido"
          screenOptions={{ headerBackTitleVisible: false }}
        >
          <Stack.Screen name="Bienvenido" component={WelcomeScreen} />
          <Stack.Screen name="Acceso" component={SignInScreen} />
          <Stack.Screen name="Registro" component={SignUpScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}
