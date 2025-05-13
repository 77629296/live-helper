import { Stack } from 'expo-router'

import { StackHeader } from '@/lib'

const Layout = () => (
  <Stack
    screenOptions={{
      animation: 'slide_from_bottom',
      header: (props) => <StackHeader navProps={props} children={undefined} />,
    }}
  >
    <Stack.Screen name="login" options={{ title: 'login' }} />
    <Stack.Screen name="signup" options={{ title: 'signup' }} />
  </Stack>
)

export default Layout
