import React from 'react'
import { ImageSourcePropType } from 'react-native'
import { Box, VStack, Heading, Image } from 'native-base'
import NavBar from './navbar'

interface Props {
	title: string
	image: ImageSourcePropType
	children?: React.ReactNode
}

const MastHead = ({ children, image, title }: Props) => {
	return (
		<VStack h='300px' pb={5}>
			<Image
				position='absolute'
				left={0}
				right={0}
				bottom={0}
				w='full'
				h='300px'
				resizeMode='cover'
				source={image}
				alt='image'
			/>
			<NavBar />
			{children}
			<Box flex={1} />
			<Heading color='white' p={6} size='xl'>
				{title}
			</Heading>
		</VStack>
	)
}

export default MastHead
