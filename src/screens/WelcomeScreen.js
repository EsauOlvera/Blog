import { useNavigation } from '@react-navigation/native';
import { React } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ChevronRightIcon } from 'react-native-heroicons/outline';
import ScreenWrapper from '../components/ScreenWrapper';
import { colors } from '../theme';

export default function WelcomeScreen() {

    const navigation = useNavigation()

    return (
        <ScreenWrapper>
            <View className="mx-5 mb-20">

                <Text className={`text-center font-bold text-4xl ${colors.heading} mb-10`}>Super Blog</Text>
            
                <TouchableOpacity onPress={()=> navigation.navigate('Acceso')} className="shadow p-3 rounded-full mb-5 bg-blue-600">
                    <Text className="text-center text-white text-lg font-bold">Ingresa</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> navigation.navigate('Registro')} className="shadow p-3 rounded-full mb-5 bg-blue-600">
                    <Text className="text-center text-white text-lg font-bold">Registrate</Text>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={()=> signIn()} className="shadow p-3 rounded-full bg-white" >
                    <View className="flex-row justify-center items-center ">
                        <Text className="text-center text-gray-600 text-lg font-bold">Inicia con Google</Text>
                        <ChevronRightIcon size="25" color={colors.black} />
                    </View>    
                </TouchableOpacity>

            </View>
        </ScreenWrapper>
    )
}