import React, { useState } from 'react'
import { View, Text, Image, TextInput, TouchableOpacity  } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import { colors } from '../theme';
import { useNavigation } from '@react-navigation/native';

export default function SignInScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation()

    const handleSubmit = () => {
        if(email && password) {
            navigation.navigate('Inicio')
        }
    }

    return (
        <ScreenWrapper>
            <View className="flex justify-between mx-4">
                <View>
                    <View className="relative">
                        <Text className={`${colors.heading} text-xl font-bold text-center`}>Iniciar Sesión</Text>
                    </View>
                    <View className="space-y-2 mx-2">
                        <Text className={`${colors.heading} text-lg font-bold`}>Email</Text>
                        <TextInput value={email} onChangeText={value=> setEmail(value)} className="p-4 bg-white rounded-full mb-3" />
                        <Text  className={`${colors.heading} text-lg font-bold`}>Contraseña</Text>
                        <TextInput value={password} secureTextEntry onChangeText={value=> setPassword(value)} className="p-4 bg-white rounded-full mb-3" />
                        <TouchableOpacity className="flex-row justify-end">
                            <Text>¿Contraseña Olvidada?</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            <View>
            {
                /*
                userLoading? (
                    <Loading />
                ):(*/
                    <TouchableOpacity onPress={handleSubmit} className="rounded-full p-3 shadow-sm mx-2 bg-blue-600 my-4">
                        <Text className="text-center text-white text-lg font-bold">Ingresa</Text>
                    </TouchableOpacity>
                    
                
            }
            </View>
        </View>
    </ScreenWrapper>
    )
}