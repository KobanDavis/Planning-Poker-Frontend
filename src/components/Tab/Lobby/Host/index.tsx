import { Button, Header } from '@fluentui/react-northstar'
import { Flex } from 'components'
import { useSocket } from 'providers/socket'
import { FC, useEffect } from 'react'
import { Poker } from 'types'

interface HostLobbyProps {
	users: Poker.User[]
}

const HostLobby: FC<HostLobbyProps> = ({ users }) => {
	const socket = useSocket()

	useEffect(() => {
		socket.emit('get_users')
	}, [socket])

	const startPlanning = () => {
		socket.emit('game_state', Poker.GameState.PLANNING)
	}

	return (
		<Flex center itemsCenter col className='h-full w-full'>
			<Header className='mb-2'>🃏 Planning Poker 🃏</Header>
			<Flex col>
				<span className='font-bold mb-2'>Connected players:</span>
				<Flex col itemsCenter className='mb-2'>
					{users.map((user) => (
						<span key={user.context.userObjectId}>{user.name}</span>
					))}
				</Flex>
			</Flex>
			<Button disabled={users.length === 0} onClick={startPlanning}>
				Start planning
			</Button>
		</Flex>
	)
}

export default HostLobby
