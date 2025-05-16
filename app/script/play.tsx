import React from 'react'
import { View, StyleSheet } from 'react-native'

import { AutoScrollText } from '@/lib/ui/components'

const ScriptPlay = () => {
  return (
    <View style={{ flex: 1, padding: 12 }}>
      <View style={styles.script}>
        <AutoScrollText
          currentScript={{
            content: `
startstartstartstartstartstart您说话真好听，小嘴抹了开塞露似的 厕所里打灯笼 找屎呢
你是有尿毒症把 嘴巴怎么这么毒
我是配钥匙的，请问你配吗
我是打饭的，请问你要饭吗
我是算命的，请你你算什么
你上辈子是条毛巾吧 这么拧巴
你下棋下的挺好吧，看你马后炮挺在行
有脸做好你的人，没脸闭好你的嘴
老师让我们不要乱扔垃圾，不然我早就把你丢了
我本来有两颗心，遇到你只有就剩一颗心了，因为恶心死了
你是什么牌子的塑料袋，这么能装
你这么厉害，一定是自己长大的吧 小嘴抹了开塞露似的 老往外喷
人类进化的时候 你躲起来了吗
你长的给二维码似的，不扫一下，都不知道你是个什么东西
你那么嚣张，是有动物协会保护你吗
你是元素周期表的第51号元素，
你就像上世纪七十年代的美国经济
你在八卦阵买房子了吗，说话那么阴阳怪气
有空一起去吃鱼吧，我看你挺会挑刺的
你一定很会下厨吧，我看你挺会添油加醋的
你长脑袋只是为了让自己看起来高一点吗
你打扮成这样，是对这个世界不满吗
我想单独给你聊聊三观，哈哈哈，我哪有时间 你哪有三观
草船上借的不就是你吗
如果不能说脏话，那我对你无话可说
臭泥鳅沾点海水，还真把自己当海鲜了
你妈真幽默，生了个笑话，我的五官是我父母给的，不想你，全是你街坊邻居拼凑的
为什么骂人，我骂的是人吗 你怎么证明我骂的是人呢--------endendendendendend-`,
          }}
        />
      </View>
      <View style={styles.actions}></View>
      <View style={styles.fuctions}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  script: {
    width: '100%',
    height: '55%',
    backgroundColor: 'tan',
  },
  actions: {
    width: '100%',
    height: '35%',
    backgroundColor: 'skyblue',
  },
  fuctions: {
    width: '100%',
    height: '10%',
    backgroundColor: 'pink',
  },
})

export default ScriptPlay
