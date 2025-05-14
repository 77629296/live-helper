import * as React from 'react'
import { Alert, ScrollView, StyleSheet } from 'react-native'
import { router } from 'expo-router'
import {
  Button,
  Card,
  IconButton,
  Paragraph,
  Text,
  List,
} from 'react-native-paper'
import BottomSheet, { BottomSheetMethods } from '@devvie/bottom-sheet'
import { useExampleTheme } from '../../lib/hooks/useExampleTheme'
import { DialogWithButtons } from '@/lib/ui/components'
import { useRef } from 'react'
import { Portal } from 'react-native-portalize'

const Index = () => {
  const { colors, isV3 } = useExampleTheme()
  const TextComponent = isV3 ? Text : Paragraph
  const sheetRefApps = useRef<BottomSheetMethods>(null)
  const sheetRefDouyin = useRef<BottomSheetMethods>(null)

  const handleDelete = () => {
    console.log('delete')
  }

  const handleBeginLive = () => {
    sheetRefApps.current?.open()
  }

  return (
    <>
      <ScrollView
        style={[styles.container, { backgroundColor: colors?.background }]}
        contentContainerStyle={styles.content}
      >
        <Card style={styles.card}>
          <Card.Title
            title="Abandoned Ship"
            right={(props: any) => (
              <IconButton
                {...props}
                icon="dots-vertical"
                onPress={() => {
                  Alert.alert('... is Pressed')
                }}
              />
            )}
          />
          <Card.Content>
            <TextComponent numberOfLines={2} variant="bodyMedium">
              The Abandoned Ship is a wrecked ship located on Route 108 in
              Hoenn, originally being a ship named the S.S. Cactus. The second
              part of the ship can only be accessed by using Dive and contains
              the Scanner. The Abandoned Ship is a wrecked ship located on Route
              108 in Hoenn, originally being a ship named the S.S. Cactus. The
              second part of the ship can only be accessed by using Dive and
              contains the Scanner.
            </TextComponent>
          </Card.Content>
          <Card.Actions>
            <DialogWithButtons
              type="error"
              title="确定删除吗？"
              content="删除后不可恢复，请谨慎操作"
              confirmText="删除"
              confirm={handleDelete}
            />

            <Button mode="text" onPress={() => router.push('/script-edit')}>
              编辑
            </Button>
            <Button mode="text" onPress={handleBeginLive}>
              开始直播
            </Button>
          </Card.Actions>
        </Card>
      </ScrollView>
      <Portal>
        <BottomSheet height={260} ref={sheetRefApps}>
          <List.Item
            title="抖音"
            key="抖音"
            onPress={() => {
              sheetRefApps.current?.close()
              sheetRefDouyin.current?.open()
            }}
            left={(props) => <List.Icon {...props} icon="folder" />}
          />
          <List.Item
            title="练习"
            key="练习"
            left={(props) => <List.Icon {...props} icon="folder" />}
          />
          <Button
            mode="contained"
            style={{
              marginLeft: 32,
              marginRight: 32,
              position: 'fixed',
              bottom: 0,
            }}
            onPress={() => sheetRefApps.current?.close()}
          >
            关闭
          </Button>
        </BottomSheet>
      </Portal>

      <Portal>
        <BottomSheet style={{ paddingBottom: 120 }} ref={sheetRefDouyin}>
          <ScrollView>
            {new Array(15).fill(5).map((item, index) => (
              <List.Item
                key={index}
                title={`抖音号${index + 1}`}
                left={(props) => <List.Icon {...props} icon="video-account" />}
                right={(props) => [
                  <Button
                    key="解绑"
                    icon="delete-outline"
                    mode="contained-tonal"
                    onPress={() => console.log('Pressed')}
                  >
                    解绑
                  </Button>,
                  <Button
                    key="直播"
                    icon="video-outline"
                    mode="contained-tonal"
                    style={{ marginLeft: 12 }}
                    onPress={() => console.log('Pressed')}
                  >
                    直播
                  </Button>,
                ]}
              />
            ))}
          </ScrollView>
          <Button
            icon="plus"
            mode="contained"
            style={{
              marginLeft: 32,
              marginRight: 32,
            }}
            onPress={() => sheetRefDouyin.current?.close()}
          >
            绑定抖音
          </Button>
        </BottomSheet>
      </Portal>
    </>
  )
}

Index.title = 'index'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 4,
  },
  card: {
    margin: 4,
  },
  chip: {
    margin: 4,
  },
  preference: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  button: {
    borderRadius: 12,
  },
  customCardRadius: {
    borderTopLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  customCoverRadius: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 24,
  },

  contentContainerStyle: {
    padding: 16,
    backgroundColor: '#F3F4F9',
  },
  header: {
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHandle: {
    width: 40,
    height: 2,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 4,
  },
  item: {
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'white',
    alignItems: 'center',
    marginVertical: 10,
  },
})

export default Index
