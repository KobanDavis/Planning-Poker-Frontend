import { Card, Flex } from 'components'
import { FC, useEffect, useState, VFC } from 'react'
import { Poker } from 'types'
import { Button } from '@fluentui/react-northstar'
import { useSocket } from 'providers/socket'

interface HostProps {
	cards: Poker.Card[]
	gameState: Poker.GameState
}

const Animation: FC<{ delay: number }> = ({ delay, children }) => {
	const [y, setY] = useState(200)

	useEffect(() => {
		setTimeout(() => setY(0), delay)
	}, [delay])

	return (
		<div
			className='absolute transition-all duration-300'
			style={{
				opacity: y === 0 ? 1 : 0,
				transform: `translateY(${-y}px)`
			}}
		>
			{children}
		</div>
	)
}

const Host: VFC<HostProps> = ({ cards, gameState }) => {
	const socket = useSocket()

	const finishGame = () => {
		socket.emit('game_state', Poker.GameState.POSTGAME)
	}

	const newGame = () => {
		socket.emit('new_game')
		socket.emit('game_state', Poker.GameState.PLANNING)
	}

	const values = cards
		.map((card) => card.value)
		.filter((value) => value && Number.isFinite(Number(value)))
		.sort((a, b) => a - b)

	const getMode = () => {
		if (values.length === 0) return '?'
		const map = values.reduce((map, value) => {
			if (map[value]) {
				map[value]++
			} else {
				map[value] = 1
			}
			return map
		}, {} as Record<number, number>)
		console.log(values, map)

		return Object.entries(map)
			.sort(([, a], [, b]) => b - a)[0][0]
			.toString()
	}

	const getMedian = () => {
		if (values.length === 0) return '?'

		const middle = values.length / 2 - 1
		if (Number.isInteger(middle)) {
			// even
			const a = values[middle]
			const b = values[middle + 1]
			return ((a + b) / 2).toString()
		} else {
			return values[Math.round(middle)].toString()
		}
	}

	const getMean = () => {
		if (values.length === 0) return '?'

		const total = values.reduce((total, value) => total + Number(value), 0)
		return (total / values.length).toString()
	}

	return (
		<Flex col itemsCenter center className='w-full h-full'>
			<Flex className='w-full justify-center scale-75 space-x-2'>
				{cards.map((card, i) => (
					<div className='w-56 h-80' key={card.id}>
						<Animation delay={i * 300}>
							<Card isFlipped={gameState === Poker.GameState.POSTGAME} value={card.value} name={card.name} />
						</Animation>
					</div>
				))}
			</Flex>
			{gameState === Poker.GameState.POSTGAME ? (
				<Flex col className='mt-6'>
					<span>Common estimate: {getMode()}</span>
					<span>Middle of the deck: {getMedian()}</span>
					<span>Average estimate: {getMean()}</span>
				</Flex>
			) : null}
			<Flex className='mt-6'>
				{gameState === Poker.GameState.INGAME ? <Button onClick={finishGame}>Show</Button> : <Button onClick={newGame}>New round</Button>}
			</Flex>
		</Flex>
	)
}

export default Host
