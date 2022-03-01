import { useSocket } from 'providers/socket'
import { useTeamsContext } from 'providers/teamsContext'
import { FC, useEffect, useState } from 'react'
import { Poker } from 'types'
import Lobby from './Lobby'
import Planning from './Planning'
import InGame from './InGame'

const Tab: FC = () => {
	const context = useTeamsContext()
	const socket = useSocket()
	const [gameState, setGameState] = useState<Poker.GameState>(null)
	const [users, setUsers] = useState<Poker.User[]>([])
	const [cards, setCards] = useState<Poker.Card[]>([])
	const isHost = context.frameContext === 'meetingStage'

	useEffect(() => {
		socket.on('game_state', setGameState)
		socket.on('users', setUsers)
		socket.on('cards', setCards)
	}, [socket])

	useEffect(() => {
		if (isHost) {
			socket.emit('join_room', context)
		} else {
			socket.emit('reconnect_player', context)
		}
	}, [isHost, context, socket])

	return (
		<>
			{/* <span>{gameState ?? 'null'}, cards: {cards?.length}</span> */}
			{(() => {
				if (isHost) {
					switch (gameState) {
						case Poker.GameState.INGAME:
						case Poker.GameState.POSTGAME:
							return <InGame.Host gameState={gameState} cards={cards} />
						case Poker.GameState.PLANNING:
							return <Planning.Host cards={cards} />
						case Poker.GameState.LOBBY:
							return <Lobby.Host users={users} />
						default:
							return null
					}
				} else {
					switch (gameState) {
						case Poker.GameState.PLANNING:
							return <Planning.User {...users.find((user) => user.context.userObjectId === context.userObjectId)} cards={cards} />
						case Poker.GameState.LOBBY:
						case null:
							return <Lobby.User gameState={gameState} socket={socket} context={context} />
					}
				}
			})()}
		</>
	)
}
export default Tab
