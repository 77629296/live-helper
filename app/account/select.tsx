import React from 'react'
import { Button, Surface, List, useTheme, Divider } from 'react-native-paper'
import { ScrollView, View, Image, Alert } from 'react-native'

import { styles as commonStyles } from '@/lib'
import { getUserProfile } from '@/lib/api/douyin-api'
import { router } from 'expo-router'

const BindDouyin = () => {
  const theme = useTheme()
  const users = [
    {
      link: 'https://v.douyin.com/bwkVbJvdqSQ/',
      sec_user_id:
        'MS4wLjABAAAADzXN5VSrOx6ZhGaXRLZMqBmrmpQ-CvS9llXY8FxWn4k2YAeB1G71jhZwdjGZxjSG',
      nickname: '王老五',
      avatar:
        'https://p3-pc.douyinpic.com/img/aweme-avatar/tos-cn-avt-0015_27bfa6e8c1e05e91cc64267f5cfaea72~c5_168x168.jpeg?from=2956013662',
      unique_id: '95984383502',
    },
    {
      link: 'https://v.douyin.com/3cza9Ap_q5E/',
      sec_user_id: 'MS4wLjABAAAAFuEkKAhAp64_l_ExoAwVeCBEe_obOW6CBXMSqsrlqJs',
      nickname: '家有三宝（麻辣小咖妃）',
      avatar:
        'https://p3-pc.douyinpic.com/img/aweme-avatar/tos-cn-i-0813_oIABEXPOAY7EI7eBLMACvEIGwAIEYAREf2exvy~c5_168x168.jpeg?from=2956013662',
      unique_id: '81535074021',
    },
  ]

  const toLive = async (sec_user_id: string) => {
    const result = await getUserProfile(sec_user_id)
    const roomId = result?.data?.user?.room_id
    if (!roomId) {
      Alert.alert('未开播')
      return
    }
    router.push('/script/play')
  }

  const toPractice = async () => {
    router.push('/script/play?mode=practice')
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <Surface style={{ ...commonStyles.screen, alignItems: undefined }}>
        {users.map((user) => (
          <View key={user.unique_id}>
            <List.Item
              title={user.nickname}
              left={(props) => (
                <Image
                  source={{ uri: user.avatar }}
                  style={{ width: 40, height: 40 }}
                />
              )}
              right={(props) => [
                <Button
                  key="删除"
                  icon="delete-outline"
                  mode="text"
                  textColor={theme.colors.error}
                  onPress={() => console.log('Pressed')}
                >
                  删除
                </Button>,
                <Button
                  key="去直播"
                  icon="video-outline"
                  mode="text"
                  textColor={theme.colors.primary}
                  onPress={() => toLive(user.sec_user_id)}
                >
                  去直播
                </Button>,
              ]}
            />
            <Divider />
          </View>
        ))}
        <Button
          key="去直播"
          mode="contained-tonal"
          style={{
            margin: 24,
          }}
          onPress={toPractice}
        >
          去试播
        </Button>
      </Surface>
    </ScrollView>
  )
}

export default BindDouyin
