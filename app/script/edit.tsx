import React from 'react'
import {
  Button,
  Surface,
  TextInput,
  HelperText,
} from 'react-native-paper'
import { ScrollView, StyleSheet } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'

import { styles as commonStyles } from '@/lib'

const ScriptEdit = () => {
  return (
    <ScrollView style={{ flex: 1 }}>
      <Surface style={{ ...commonStyles.screen, alignItems: undefined }}>
        <Formik
          initialValues={{
            title: '',
            content: '',
          }}
          onSubmit={(values) => console.log(values)}
          validationSchema={Yup.object().shape({
            title: Yup.string()
              .min(1, '太短啦!')
              .max(64, '太长啦!')
              .required('请输入标题.'),
            content: Yup.string()
              .min(1, '太短啦!')
              .max(1000, '太长啦!')
              .required('请输入内容.'),
          })}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <>
              <Surface elevation={0}>
                <TextInput
                  maxLength={64}
                  mode="outlined"
                  label="标题"
                  value={values.title}
                  error={!!errors.title}
                  onBlur={handleBlur('title')}
                  right={64 - values.title.length}
                  placeholder="请输入标题..."
                  onChangeText={handleChange('title')}
                />
                <HelperText type="error" visible={!!errors.title}>
                  {errors.title}
                </HelperText>
              </Surface>

              <Surface elevation={0}>
                <TextInput
                  style={[styles.textArea]}
                  maxLength={1000}
                  mode="outlined"
                  label="内容"
                  multiline
                  value={values.content}
                  error={!!errors.content}
                  onBlur={handleBlur('content')}
                  right={64 - values.content.length}
                  placeholder="请输入内容..."
                  onChangeText={handleChange('content')}
                />
                <HelperText type="error" visible={!!errors.content}>
                  {errors.content}
                </HelperText>
              </Surface>

              <Button mode="contained" onPress={() => handleSubmit()}>
                保存
              </Button>
            </>
          )}
        </Formik>
      </Surface>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  textArea: {
    height: 500,
  },
})

export default ScriptEdit
