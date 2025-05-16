import React, { useRef, useState, useEffect } from 'react'
import {
  Animated,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  PanResponder,
  LayoutChangeEvent,
  ScrollView,
} from 'react-native'
import { IconButton } from 'react-native-paper'

interface Script {
  content: string;
}

interface AutoScrollTextProps {
  currentScript: Script;
  initialSpeed?: number;
  preScrollEnd?: number;
}

const AutoScrollText: React.FC<AutoScrollTextProps> = ({
  currentScript,
  initialSpeed = 0.25,
  preScrollEnd = 100, // 预滚动区域高度(像素)
}) => {
  // 动画和状态管理
  const scrollY = useRef(new Animated.Value(0)).current
  const scrollViewRef = useRef<ScrollView>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [speed, setSpeed] = useState(initialSpeed)
  const animationRef = useRef<number | null>(null)
  const contentHeight = useRef(0)
  const containerHeight = useRef(0)
  const isDragging = useRef(false)
  const lastScrollTime = useRef(0)

  // 测量内容尺寸
  const measureContent = (e: LayoutChangeEvent) => {
    contentHeight.current = e.nativeEvent.layout.height
  }

  const measureContainer = (e: LayoutChangeEvent) => {
    containerHeight.current = e.nativeEvent.layout.height
  }

  // 开始自动滚动
  const startAutoScroll = () => {
    if (
      animationRef.current ||
      contentHeight.current <= containerHeight.current
    ) {
      return
    }

    setIsPlaying(true)
    lastScrollTime.current = performance.now()

    const scroll = () => {
      if (isDragging.current) {
        animationRef.current = null
        return
      }

      const now = performance.now()
      const deltaTime = now - lastScrollTime.current
      lastScrollTime.current = now

      const currentY = (scrollY as any)._value
      const maxScroll = contentHeight.current - containerHeight.current
      const scrollStep = (speed * deltaTime) / 16

      let newY = currentY + scrollStep

      // 优化后的循环逻辑 - 确保完全滚动到底部
      if (newY >= maxScroll + preScrollEnd) {
        // 完全滚动到底部并多滚动preScrollEnd像素后，平滑回到顶部
        scrollY.setValue(0)
        scrollViewRef.current?.scrollTo({ y: 0, animated: false })
        newY = scrollStep - (maxScroll + preScrollEnd - currentY)
      }

      scrollY.setValue(newY)
      scrollViewRef.current?.scrollTo({ y: newY, animated: false })

      animationRef.current = requestAnimationFrame(scroll)
    }

    animationRef.current = requestAnimationFrame(scroll)
  }

  // 停止自动滚动
  const stopAutoScroll = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }
    setIsPlaying(false)
  }

  // 切换播放状态
  const togglePlay = () => {
    if (isPlaying) {
      stopAutoScroll()
    } else {
      startAutoScroll()
    }
  }

  // 手势处理
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        isDragging.current = true
        stopAutoScroll()
      },
      onPanResponderMove: (_, gestureState) => {
        const currentY = (scrollY as any)._value
        const newY = Math.max(0, currentY - gestureState.dy)
        scrollY.setValue(newY)
        scrollViewRef.current?.scrollTo({ y: newY, animated: false })
      },
      onPanResponderRelease: () => {
        isDragging.current = false
        if (isPlaying) {
          startAutoScroll()
        }
      },
    }),
  ).current

  // 初始化
  useEffect(() => {
    startAutoScroll()
    return () => {
      stopAutoScroll()
    }
  }, [])

  // 速度变化处理
  useEffect(() => {
    if (isPlaying) {
      stopAutoScroll()
      startAutoScroll()
    }
  }, [speed])

  return (
    <View style={[styles.container]}>
      <Animated.ScrollView
        ref={scrollViewRef}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true },
        )}
        scrollEnabled={false}
        style={styles.scrollView}
        {...panResponder.panHandlers}
        onLayout={measureContainer}
      >
        <Text style={[styles.text]} onLayout={measureContent}>
          {currentScript.content}
        </Text>
      </Animated.ScrollView>

      <TouchableOpacity
        style={styles.controlButton}
        onPress={togglePlay}
        activeOpacity={0.7}
      >
        {isPlaying && (
          <IconButton icon="pause" iconColor='rgba(0,0,0,0.2)' size={80} />
        )}
        {!isPlaying && (
          <IconButton icon="play" iconColor='rgba(0,0,0,0.5)' size={80} />
        )}
      </TouchableOpacity>

      <View style={styles.controls}>
        <View style={styles.speedControls}>
          <Text style={styles.speedLabel}>速度:</Text>
          <TouchableOpacity
            style={[styles.speedButton, speed <= 0.25 && styles.disabledButton]}
            onPress={() => setSpeed(Math.max(0.25, speed - 0.25))}
            disabled={speed <= 0.25}
          >
            <Text style={styles.speedText}>-</Text>
          </TouchableOpacity>

          <Text style={styles.speedValue}>{speed.toFixed(2)}x</Text>

          <TouchableOpacity
            style={[styles.speedButton, speed >= 3 && styles.disabledButton]}
            onPress={() => setSpeed(Math.min(3, speed + 0.25))}
            disabled={speed >= 3}
          >
            <Text style={styles.speedText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    position: 'relative',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(250,250,250,0.95)',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  controlButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: '-50%' }, { translateY: '-50%' }],
  },
  speedControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  speedLabel: {
    fontSize: 14,
    color: '#666',
    marginRight: 8,
  },
  speedButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#6200ee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  speedText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  speedValue: {
    fontSize: 14,
    color: '#333',
    marginHorizontal: 8,
    minWidth: 30,
    textAlign: 'center',
  },
})

export default AutoScrollText
