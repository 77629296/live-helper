import { MaterialCommunityIcons } from '@expo/vector-icons'
import { JetBrainsMono_400Regular } from '@expo-google-fonts/jetbrains-mono'
import { NotoSans_400Regular } from '@expo-google-fonts/noto-sans'
import {
  DarkTheme as NavDarkTheme,
  DefaultTheme as NavLightTheme,
  ThemeProvider,
} from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { SplashScreen, Stack, router } from 'expo-router'
import * as SecureStore from 'expo-secure-store'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { useColorScheme, View } from 'react-native'
import {
  adaptNavigationTheme,
  PaperProvider,
  Appbar,
  Tooltip,
} from 'react-native-paper'

import { Setting, StackHeader, Themes } from '@/lib'
import Constants from 'expo-constants'

// Catch any errors thrown by the Layout component.
export { ErrorBoundary } from 'expo-router'

// Ensure that reloading on `/modal` keeps a back button present.
export const unstable_settings = { initialRouteName: '(tabs)' }

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

const RootLayout = () => {
  const [loaded, error] = useFonts({
    NotoSans_400Regular,
    JetBrainsMono_400Regular,
    ...MaterialCommunityIcons.font,
  })

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  React.useEffect(() => {
    if (error) throw error
  }, [error])

  React.useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return <RootLayoutNav />
}

const RootLayoutNav = () => {
  const colorScheme = useColorScheme()
  const [settings, setSettings] = React.useState<Setting>({
    theme: 'auto',
    color: 'default',
  })

  // Load settings from the device
  React.useEffect(() => {
    SecureStore.getItemAsync('settings').then((result) => {
      if (result === null) {
        SecureStore.setItemAsync('settings', JSON.stringify(settings)).then(
          (res) => console.log(res),
        )
      }

      setSettings(JSON.parse(result ?? JSON.stringify(settings)))
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const theme =
    Themes[
      settings.theme === 'auto' ? (colorScheme ?? 'dark') : settings.theme
    ][settings.color]

  const { DarkTheme, LightTheme } = adaptNavigationTheme({
    reactNavigationDark: NavDarkTheme,
    reactNavigationLight: NavLightTheme,
    materialDark: Themes.dark[settings.color],
    materialLight: Themes.light[settings.color],
  })

  return (
    <ThemeProvider
      value={
        colorScheme === 'light'
          ? { ...LightTheme, fonts: NavLightTheme.fonts }
          : { ...DarkTheme, fonts: NavDarkTheme.fonts }
      }
    >
      <PaperProvider theme={theme}>
        <Stack
          screenOptions={{
            animation: 'slide_from_bottom',
            header: (props) => (
              <StackHeader navProps={props} children={undefined} />
            ),
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />

          {/* script */}
          <Stack.Screen name="script/edit" options={{ title: '脚本修改' }} />
          <Stack.Screen
            name="script/play"
            options={{
              header: () => (
                <View style={styles.container}>
                  <StatusBar />
                </View>
              ),
            }}
          />

          {/* account */}
          <Stack.Screen
            name="account/select"
            options={{
              title: '账号选择',
              headerRight: () => (
                <Tooltip title={'search'}>
                  <Appbar.Action
                    icon="plus"
                    onPress={() => router.push('/account/bind')}
                  />
                </Tooltip>
              ),
            }}
          />
          <Stack.Screen
            name="account/bind"
            options={{
              title: '账号绑定',
            }}
          />
          <Stack.Screen
            name="modal"
            options={{ title: 'titleModal', presentation: 'modal' }}
          />
        </Stack>
      </PaperProvider>
      <StatusBar style="auto" />
    </ThemeProvider>
  )
}

const styles = {
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    padding: 8,
  },
}

export default RootLayout
