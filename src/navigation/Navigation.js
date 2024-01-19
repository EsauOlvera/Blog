import { React } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import SignUpScreen from '../screens/SignUpScreen';
import SignInScreen from '../screens/SignInScreen';
import { useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  const {user} = useSelector(state=> state.user);

  if(user) {
    return(
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Inicio" screenOptions={{ headerBackTitleVisible: false }}>
          <Stack.Screen options={{headerBackVisible: false}} name="Inicio" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  } else {
    return(
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Bienvenido" screenOptions={{ headerBackTitleVisible: false }}>
          <Stack.Screen name="Bienvenido" component={WelcomeScreen} />
          <Stack.Screen name="Acceso" component={SignInScreen} />
          <Stack.Screen name="Registro" component={SignUpScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}
  
  
  

