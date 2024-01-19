import { React } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { colors } from '../theme';

export default function NowLoading({children}) {


    return (
        <View className="flex-row justify-center py-8">
            <ActivityIndicator size="large" color={colors.button}/>
        </View>
    )
}