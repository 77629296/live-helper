import React from 'react'
import { Button, TextInput } from 'react-native-paper'
import { View } from 'react-native'

const BindDouyin = () => {
  const [text, onChangeText] = React.useState('')

  return (
    <View style={{ flex: 1, padding: 12 }}>
      <TextInput
        style={{ height: 260 }}
        maxLength={1000}
        mode="outlined"
        multiline
        value={text}
        placeholder="复制抖音用户主页分享，在这里粘贴..."
        onChangeText={onChangeText}
      />
      <Button
        key="去直播"
        mode="contained"
        style={{
          margin: 24,
        }}
        onPress={() => console.log('bind')}
      >
        确定
      </Button>
      
    </View>
  )
}

export default BindDouyin
