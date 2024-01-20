import { React } from 'react'
import { View, Text, StatusBar } from 'react-native'

export default function ScreenWrapper({ children }) {
  let statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight : 30

  return <View style={{ paddingTop: statusBarHeight }}>{children}</View>
}
