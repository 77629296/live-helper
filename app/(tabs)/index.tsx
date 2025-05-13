import * as React from 'react'
import { Alert, ScrollView, StyleSheet } from 'react-native'

import {
  Button,
  Card,
  IconButton,
  Paragraph,
  Text,
} from 'react-native-paper'

import { useExampleTheme } from '../../lib/hooks/useExampleTheme'
import ScreenWrapper from '../ScreenWrapper'


const CardExample = () => {
  const { colors, isV3 } = useExampleTheme()
  const TextComponent = isV3 ? Text : Paragraph

  return (
    <ScreenWrapper contentContainerStyle={styles.content}>
      <ScrollView
        style={[styles.container, { backgroundColor: colors?.background }]}
        contentContainerStyle={styles.content}
      >
        <Card style={styles.card}>
          <Card.Title
            title="Abandoned Ship"
            right={(props: any) => (
              <IconButton {...props} icon="dots-vertical" onPress={() => {
                Alert.alert('... is Pressed')
              }} />
            )}
          />
          <Card.Content>
            <TextComponent numberOfLines={2} variant="bodyMedium">
              The Abandoned Ship is a wrecked ship located on Route 108 in
              Hoenn, originally being a ship named the S.S. Cactus. The second
              part of the ship can only be accessed by using Dive and contains
              the Scanner. The Abandoned Ship is a wrecked ship located on Route 108 in
              Hoenn, originally being a ship named the S.S. Cactus. The second
              part of the ship can only be accessed by using Dive and contains
              the Scanner.
            </TextComponent>
          </Card.Content>
          <Card.Actions>
            <Button mode="text" onPress={() => {}}>删除</Button>
            <Button mode="text" onPress={() => {}}>编辑</Button>
            <Button mode="text" onPress={() => {}}>开始直播</Button>
          </Card.Actions>
        </Card>
      </ScrollView>
    </ScreenWrapper>
  )
}

CardExample.title = 'Card'

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
})

export default CardExample
