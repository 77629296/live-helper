import * as React from 'react'
import { Alert, ScrollView, StyleSheet } from 'react-native'
import { router } from 'expo-router'
import {
  Button,
  Card,
  IconButton,
  Text,
} from 'react-native-paper'
import { useExampleTheme } from '../../lib/hooks/useExampleTheme'
import { DialogWithButtons } from '@/lib/ui/components'

const Index = () => {
  const { colors } = useExampleTheme()

  const handleDelete = () => {
    console.log('delete')
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
            <Text numberOfLines={2} variant="bodyMedium">
              The Abandoned Ship is a wrecked ship located on Route 108 in
              Hoenn, originally being a ship named the S.S. Cactus. The second
              part of the ship can only be accessed by using Dive and contains
              the Scanner. The Abandoned Ship is a wrecked ship located on Route
              108 in Hoenn, originally being a ship named the S.S. Cactus. The
              second part of the ship can only be accessed by using Dive and
              contains the Scanner.
            </Text>
          </Card.Content>
          <Card.Actions>
            <DialogWithButtons
              type="error"
              title="确定删除吗？"
              content="删除后不可恢复，请谨慎操作"
              confirmText="删除"
              confirm={handleDelete}
            />

            <Button mode="text" onPress={() => router.push('/script/edit')}>
              编辑
            </Button>
            <Button mode="text" onPress={() => router.push('/account/select')}>
              开始直播
            </Button>
          </Card.Actions>
        </Card>
      </ScrollView>
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
