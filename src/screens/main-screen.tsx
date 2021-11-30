import React, { useCallback, useState } from 'react'
import { VStack, Fab, Icon, useColorModeValue } from 'native-base'
import { AntDesign } from '@expo/vector-icons'
import shortid from 'shortid'

import TaskList from '../components/task-list'
import AnimatedColorBox from '../components/animated-color-box'
import MastHead from '../components/masthead'

const initialData = [
	{
		id: shortid.generate(),
		subject: 'Exmaple',
		done: false,
	},
	{
		id: shortid.generate(),
		subject: 'Task item',
		done: false,
	},
	{
		id: shortid.generate(),
		subject: 'Task example',
		done: false,
	},
]

export default function MainScreen() {
	const [data, setData] = useState(initialData)
	const [editingItemId, setEditingItemId] = useState<string | null>(null)

	const handleToggleTaskItem = useCallback((item) => {
		setData((prev) => {
			const newData = [...prev]
			const index = prev.indexOf(item)

			newData[index] = {
				...item,
				done: !item.done,
			}

			return newData
		})
	}, [])

	const handleChangeTaskItemSubject = useCallback((item, newSubject) => {
		setData((prev) => {
			const newData = [...prev]
			const index = prev.indexOf(item)

			newData[index] = {
				...item,
				subject: newSubject,
			}

			return newData
		})
	}, [])

	const handleFinishEditingTaskItem = useCallback((_item) => {
		setEditingItemId(null)
	}, [])

	const handlePressTaskItemLabel = useCallback((item) => {
		setEditingItemId(item.id)
	}, [])

	const handleRemoveItem = useCallback((item) => {
		setData((prev) => {
			const newData = prev.filter((i) => i !== item)

			return newData
		})
	}, [])

	return (
		<AnimatedColorBox
			flex={1}
			bg={useColorModeValue('warmGray.50', 'primary.900')}
			w='full'>
			<MastHead
				title='Seja bem vindo!'
				image={require('../assets/masthead.png')}></MastHead>

			<VStack
				flex={1}
				space={1}
				mt='-20px'
				bg={useColorModeValue('warmGray.50', 'primary.900')}
				borderTopLeftRadius='20px'
				borderTopRightRadius='20px'
				pt='20px'>
				<TaskList
					data={data}
					editingItemId={editingItemId}
					onChangeSubject={handleChangeTaskItemSubject}
					onFinishedEditing={handleFinishEditingTaskItem}
					onPressLabel={handlePressTaskItemLabel}
					onRemoveItem={handleRemoveItem}
					onToggleItem={handleToggleTaskItem}
				/>
			</VStack>

			<Fab
				position='absolute'
				renderInPortal={false}
				size='sm'
				icon={<Icon color='white' as={<AntDesign name='plus' />} />}
				colorScheme={useColorModeValue('blue', 'darkBlue')}
				bg={useColorModeValue('blue.500', 'blue.400')}
				onPress={() => {
					const id = shortid.generate()

					setData([
						{
							id,
							subject: 'Item',
							done: false,
						},
						...data,
					])

					setEditingItemId(id)
				}}
			/>
		</AnimatedColorBox>
	)
}
