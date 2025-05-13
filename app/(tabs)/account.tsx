import React from 'react'
import { Surface, Button } from 'react-native-paper'

import { styles } from '@/lib'
import { router } from 'expo-router'

const Settings = () => {
  return (
    <Surface style={styles.screen}>
      <Surface elevation={0}>
        <Button mode="contained" onPress={() => router.push('/(auth)/login')}>
          去登录
        </Button>
      </Surface>
    </Surface>
  )
}

export default Settings
