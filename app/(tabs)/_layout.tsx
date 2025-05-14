import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Appbar, Tooltip } from 'react-native-paper'

import { TabBar, TabsHeader } from '@/lib'
import { View } from 'react-native'
import Constants from 'expo-constants'
import { Host } from 'react-native-portalize'

const TabLayout = () => {
  return (
    <Host>
      <Tabs
        tabBar={(props) => <TabBar {...props} />}
        screenOptions={{
          tabBarHideOnKeyboard: true,
          header: (props) => (
            <TabsHeader navProps={props} children={undefined} />
          ),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: '首页',
            headerRight: () => (
              <>
                <Tooltip title={'search'}>
                  <Appbar.Action icon="plus" onPress={() => {}} />
                </Tooltip>
              </>
            ),
            tabBarIcon: (props) => (
              <MaterialCommunityIcons
                {...props}
                size={24}
                name={props.focused ? 'home' : 'home-outline'}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="interact"
          options={{
            title: '互动',
            header: () => (
              <View style={styles.container}>
                <StatusBar />
              </View>
            ),
            tabBarIcon: (props) => (
              <MaterialCommunityIcons
                {...props}
                size={24}
                name={props.focused ? 'forum' : 'forum-outline'}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="account"
          options={{
            title: '我的',
            headerRight: () => (
              <Tooltip title={'drawerNav'}>
                <Appbar.Action icon="gesture-swipe" onPress={() => {}} />
              </Tooltip>
            ),
            tabBarIcon: (props) => (
              <MaterialCommunityIcons
                {...props}
                size={24}
                name={props.focused ? 'account' : 'account-outline'}
              />
            ),
          }}
        />
      </Tabs>
    </Host>
  )
}

const styles = {
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    padding: 8,
  },
}

export default TabLayout
