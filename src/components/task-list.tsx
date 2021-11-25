import React, { useCallback, useRef } from 'react'
import { AnimatePresence, View } from 'moti'
import {
	PanGestureHandlerProps,
	ScrollView,
} from 'react-native-gesture-handler'

import TaskItem from './task-item'
import { makeStyledComponent } from '../utils/styled'

const StyledView = makeStyledComponent(View)
const StyledScrollView = makeStyledComponent(ScrollView)

interface TaskItemData {
	id: string
	subject: string
	done: boolean
}

interface TaskListProps {
	data: Array<TaskItemData>
	editingItemId: string | null
	onToggleItem: (item: TaskItemData) => void
	onChangeSubject: (item: TaskItemData, newSubject: string) => void
	onFinishedEditing: (item: TaskItemData) => void
	onPressLabel: (item: TaskItemData) => void
	onRemoveItem: (item: TaskItemData) => void
}

interface TaskItemProps
	extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
	data: TaskItemData
	isEditing: boolean
	onToggleItem: (item: TaskItemData) => void
	onChangeSubject: (item: TaskItemData, newSubject: string) => void
	onFinishedEditing: (item: TaskItemData) => void
	onPressLabel: (item: TaskItemData) => void
	onRemoveItem: (item: TaskItemData) => void
}

export const AnimatedTaskItem = (props: TaskItemProps) => {
	const {
		simultaneousHandlers,
		data,
		isEditing,
		onChangeSubject,
		onFinishedEditing,
		onRemoveItem,
		onPressLabel,
		onToggleItem,
	} = props

	const handleToggleChechbox = useCallback(() => {
		onToggleItem(data)
	}, [data, onToggleItem])

	const handleChangeSubject = useCallback(
		(subject) => {
			onChangeSubject(data, subject)
		},
		[data, onChangeSubject]
	)

	const handleFinishedEditing = useCallback(() => {
		onFinishedEditing(data)
	}, [data, onFinishedEditing])

	const handlePressLabel = useCallback(() => {
		onPressLabel(data)
	}, [data, onPressLabel])

	const handleRemove = useCallback(() => {
		onRemoveItem(data)
	}, [data, onRemoveItem])

	return (
		<StyledView
			w='full'
			from={{
				opacity: 0,
				scale: 0.5,
				marginBottom: -46,
			}}
			animate={{
				opacity: 1,
				scale: 1,
				marginBottom: 0,
			}}
			exit={{
				opacity: 0,
				scale: 0.5,
				marginBottom: -46,
			}}>
			<TaskItem
				simultaneousHandlers={simultaneousHandlers}
				subject={data.subject}
				isDone={data.done}
				isEditing={isEditing}
				onToggleCheckbox={handleToggleChechbox}
				onChangeSubject={handleChangeSubject}
				onFinishEditing={handleFinishedEditing}
				onPressLabel={handlePressLabel}
				onRemove={handleRemove}></TaskItem>
		</StyledView>
	)
}

export default function TaskList(props: TaskListProps) {
	const {
		data,
		editingItemId,
		onChangeSubject,
		onFinishedEditing,
		onPressLabel,
		onRemoveItem,
		onToggleItem,
	} = props

	const refScrollView = useRef(null)

	return (
		<StyledScrollView ref={refScrollView} w='full'>
			<AnimatePresence>
				{data.map((item) => (
					<AnimatedTaskItem
						key={item.id}
						data={item}
						simultaneousHandlers={refScrollView}
						isEditing={item.id === editingItemId}
						onChangeSubject={onChangeSubject}
						onFinishedEditing={onFinishedEditing}
						onPressLabel={onPressLabel}
						onRemoveItem={onRemoveItem}
						onToggleItem={onToggleItem}
					/>
				))}
			</AnimatePresence>
		</StyledScrollView>
	)
}
