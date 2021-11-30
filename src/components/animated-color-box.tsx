import React, { useEffect } from 'react'
import { Box, useTheme, themeTools } from 'native-base'
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
	interpolateColor,
} from 'react-native-reanimated'

import usePrevious from '../utils/use-previous'

const AnimatedBox = Animated.createAnimatedComponent(Box)

const AnimatedColorBox = ({ bg, ...props }: any) => {
	const theme = useTheme()
	const hexBg = themeTools.getColor(theme, bg)
	const prevHxBg = usePrevious(hexBg)
	const progress = useSharedValue(0)

	useEffect(() => {
		progress.value = 0
	}, [hexBg])

	const animatedStyles = useAnimatedStyle(() => {
		progress.value = withTiming(1, { duration: 200 })

		return {
			backgroundColor: interpolateColor(
				progress.value,
				[0, 1],
				[prevHxBg || hexBg, hexBg]
			),
		}
	}, [hexBg])

	return <AnimatedBox {...props} style={animatedStyles} />
}

export default AnimatedColorBox
