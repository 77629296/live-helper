import * as React from 'react'
import { Text } from 'react-native'
import { Button, Portal, Dialog, useTheme } from 'react-native-paper'

const DialogWithButtons = ({
  type = 'primary',
  title,
  content,
  confirmText = '确定',
  cancelText = '取消',
  cancel,
  confirm,
}: {
  type: 'primary' | 'error'
  title?: string
  content?: string
  confirmText?: string
  cancelText?: string
  cancel?: () => void
  confirm?: () => void
}) => {
  const theme = useTheme()
  const [visible, setVisible] = React.useState(false)
  const showDialog = () => setVisible(true)
  const hideDialog = () => {
    setVisible(false)
    cancel && cancel()
  }

  const handleConfirm = () => {
    confirm && confirm()
    setVisible(false)
  }

  return (
    <>
      <Button mode="text" onPress={showDialog}>
        删除
      </Button>
      <Portal>
        <Dialog
          onDismiss={hideDialog}
          visible={visible}
          dismissable={false}
          dismissableBackButton
        >
          <Dialog.Title>{title}</Dialog.Title>
          <Dialog.Content>
            <Text>{content}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>{cancelText}</Button>
            <Button onPress={handleConfirm} textColor={theme.colors[type]}>
              {confirmText}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  )
}

export default DialogWithButtons
