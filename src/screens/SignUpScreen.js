import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import ScreenWrapper from '../components/ScreenWrapper';
import { colors } from '../theme';
import { useNavigation } from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useDispatch, useSelector } from 'react-redux';
import NowLoading from '../components/NowLoading';
import { setUserLoading } from '../redux/slices/user';

export default function SignUpScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const {userLoading} = useSelector(state => state.user)
    const dispatch = useDispatch()

    const handleSubmit = async () => {
        if(email && password) {
            try {
                dispatch(setUserLoading(true))
                await createUserWithEmailAndPassword(auth, email, password)
                dispatch(setUserLoading(false))
            } catch (e) {
                dispatch(setUserLoading(false))
                Snackbar.show({
                    text: e.message,
                    backgroundColor: 'red'
                })
            }
        } else {
            Snackbar.show({
                text: "Correo y contraseña son campos requeridos",
                backgroundColor: 'red'
            })
        }
    }

    return (
        <ScreenWrapper>
            <View className="flex justify-between mx-4">
                <View>
                    <View className="relative">
                        <Text className={`${colors.heading} text-xl font-bold text-center`}>Registrate</Text>
                    </View>
                    <View className="space-y-2 mx-2">
                        <Text className={`${colors.heading} text-lg font-bold`}>Email</Text>
                        <TextInput value={email} onChangeText={value=> setEmail(value)} className="p-4 bg-white rounded-full mb-3" />
                        <Text  className={`${colors.heading} text-lg font-bold`}>Contraseña</Text>
                        <TextInput value={password} secureTextEntry onChangeText={value=> setPassword(value)} className="p-4 bg-white rounded-full mb-3" />
                    </View>
                </View>
                <View>
                    {
                        userLoading? (
                            <NowLoading />
                            ):(
                            <TouchableOpacity onPress={handleSubmit} className="my-6 rounded-full p-3 shadow-sm mx-2 bg-blue-600">
                                <Text className="text-center text-white text-lg font-bold">Registrar</Text>
                            </TouchableOpacity>
                        )
                    }
                </View>
            </View>
        </ScreenWrapper>
    )
}