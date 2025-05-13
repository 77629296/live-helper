import { Link, Stack } from 'expo-router'
import React from 'react'
import { Surface, Text } from 'react-native-paper'

import { styles } from '@/lib'

const NotFound = () => (
  <Surface style={styles.screen}>
    <Stack.Screen options={{ title: 'titleNotFound' }} />

    <Text variant="displayLarge">{'titleNotFound'}</Text>

    <Text variant="bodyLarge">{'screen404'}</Text>

    <Link href="/">
      <Text variant="bodyLarge">{'goHome'}</Text>
    </Link>
  </Surface>
)

export default NotFound
