import { Button, Input, Loader } from '@fluentui/react-northstar'
import { Context } from '@microsoft/teams-js'
import { Flex } from 'components'
import { FC, useState } from 'react'
import { Socket } from 'socket.io-client'
import { Poker } from 'types'

interface UserLobbyProps {
	context: Context
	gameState: Poker.GameState
	socket: Socket
}

const UserLobby: FC<UserLobbyProps> = ({ context, socket, gameState }) => {
	const [name, setName] = useState<string>(context.userPrincipalName.split('@')[0])

	return (
		<Flex itemsCenter center className='h-full bg-[#1f1f1f]'>
			{gameState === null ? (
				<Flex col>
					<Input inverted className='mb-2' value={name} label='Name' type='text' onChange={(e) => setName((e.target as any).value)} />
					<Button className='w-min whitespace-pre' onClick={() => socket.emit('join_room', context, name)}>
						Join Game
					</Button>
				</Flex>
			) : (
				<Flex col>
					<span className='font-bold mb-2'>Waiting for host to start game...</span>
					<Loader />
				</Flex>
			)}
		</Flex>
	)
}

export default UserLobby
