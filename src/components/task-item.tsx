import React, { useEffect } from 'react'
import { Pressable } from 'react-native'
import {
	Box,
	Text,
	useTheme,
	themeTools,
	useColorModeValue,
	HStack,
} from 'native-base'

import AnimatedCheckbox from './animated-checkbox'
import AnimatedTaskLabel from './animated-task-label'

interface Props {
	isDone: boolean
	onToggleCheckbox?: () => void
}

const TaskItem = (props: Props) => {
	const { isDone, onToggleCheckbox } = props
	const theme = useTheme()

	const highlightColor = themeTools.getColor(
		theme,
		useColorModeValue('blue.500', 'blue.400')
	)

	const boxStrokeColor = themeTools.getColor(
		theme,
		useColorModeValue('muted.300', 'muted.500')
	)

	const checkMarkColor = themeTools.getColor(
		theme,
		useColorModeValue('white', 'white')
	)

	const activeTextColor = themeTools.getColor(
		theme,
		useColorModeValue('darkText', 'lightText')
	)

	const doneTextColor = themeTools.getColor(
		theme,
		useColorModeValue('muted.400', 'muted.600')
	)

	return (
		<HStack
			alignItems='center'
			w='full'
			px={4}
			py={2}
			bg={useColorModeValue('warmGray.50', 'primary.900')}>
			<Box width={30} height={30} mr={2}>
				<Pressable onPress={onToggleCheckbox}>
					<AnimatedCheckbox
						highlightColor={highlightColor}
						boxOutlineColor={boxStrokeColor}
						checkmarkColor={checkMarkColor}
						checked={isDone}></AnimatedCheckbox>
				</Pressable>
			</Box>
			<AnimatedTaskLabel
				textColor={activeTextColor}
				inactiveTextColor={doneTextColor}
				strikethrough={isDone}>
				Task item
			</AnimatedTaskLabel>
		</HStack>
	)
}

export default TaskItem
