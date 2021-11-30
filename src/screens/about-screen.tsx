import React from 'react'
import {
	ScrollView,
	Box,
	Text,
	VStack,
	Icon,
	Image,
	useColorModeValue,
} from 'native-base'
import { Feather } from '@expo/vector-icons'

import AnimatedColorBox from '../components/animated-color-box'
import NavBar from '../components/navbar'
import MastHead from '../components/masthead'
import LinkButton from '../components/link-button'

const AboutScreen = () => {
	return (
		<AnimatedColorBox
			flex={1}
			bg={useColorModeValue('warmGray.50', 'warmGray.900')}
			w='full'>
			<MastHead title='Sobre o app' image={require('../assets/masthead.png')} />

			<ScrollView
				borderTopLeftRadius='20px'
				borderTopRightRadius='20px'
				bg={useColorModeValue('warmGray.50', 'primary.900')}
				mt='-20px'
				pt='30px'
				p={4}>
				<VStack flex={1} space={4}>
					<Box alignItems='center'>
						<Image
							source={require('../assets/profile.png')}
							borderRadius='full'
							resizeMode='cover'
							w={120}
							h={120}
							alt='author'
						/>
					</Box>
					<Text fontSize='md' w='full'>
						Esse é um ToDo App construido com React Native
					</Text>

					<LinkButton
						colorScheme='muted'
						size='lg'
						href='https://github.com/Ddiegoreis/todo-app'
						leftIcon={<Icon as={Feather} name='github' size='sm' />}>
						Acesse o repositório no Github
					</LinkButton>
				</VStack>
			</ScrollView>
		</AnimatedColorBox>
	)
}

export default AboutScreen
