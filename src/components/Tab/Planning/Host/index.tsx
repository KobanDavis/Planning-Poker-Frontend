import { Card, Flex } from 'components'
import { FC, useEffect, useState, VFC } from 'react'
import { Poker } from 'types'
import { Button } from '@fluentui/react-northstar'
import { useSocket } from 'providers/socket'
import clsx from 'clsx'

interface HostPlanningProps {
	cards: Poker.Card[]
}

const HostPlanning: FC<HostPlanningProps> = ({ cards }) => {
	const [isReady, setIsReady] = useState<boolean>(false)
	const [flyout, setFlyout] = useState<boolean>(false)

	const socket = useSocket()

	const startGame = () => {
		setIsReady(true)
		setTimeout(() => {
			setFlyout(true)
			setTimeout(() => {
				socket.emit('game_state', Poker.GameState.INGAME)
			}, 800)
		}, 500)
	}

	return (
		<Flex itemsCenter center col className='w-full h-full'>
			<Flex
				center
				itemsCenter
				className={clsx(
					'transition-all duration-500 relative rounded h-[21rem] w-[15rem] border-2 border-dashed border-white',
					isReady && 'border-transparent'
				)}
			>
				<Flex
					center
					itemsCenter
					className='w-full h-full absolute transition-all duration-500'
					style={{ transform: flyout ? `translateY(-${window.innerHeight / 2 + 320}px)` : 'translateY(0px)', opacity: flyout ? 0 : 1 }}
				>
					{cards.map((card) => (
						<Animation key={card.id} straight={isReady} />
					))}
				</Flex>
			</Flex>
			<Button
				className={clsx('mt-4 transition-opacity', isReady ? 'opacity-0' : 'opacity-100')}
				disabled={cards.length === 0 || isReady}
				onClick={startGame}
			>
				Ready
			</Button>
		</Flex>
	)
}

const Animation: VFC<{ straight: boolean }> = ({ straight }) => {
	const [deg, setDeg] = useState(Math.floor(Math.random() * 20) - 10)
	const [x, setX] = useState(window.innerWidth / 2 + 224)

	useEffect(() => {
		setTimeout(() => setX(0), 0)
	}, [])

	useEffect(() => {
		if (straight) {
			setDeg(0)
		}
	}, [straight])

	return (
		<div
			className='absolute transition-all duration-500'
			style={{
				transform: `translateX(${x}px) rotate(${deg}deg)`
			}}
		>
			<Card />
		</div>
	)
}

export default HostPlanning
