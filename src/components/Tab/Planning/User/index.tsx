import { Button, Input } from '@fluentui/react-northstar'
import { Card, Flex } from 'components'
import { useSocket } from 'providers/socket'
import React, { FC, useState } from 'react'
import { Poker } from 'types'
import clsx from 'clsx'

interface PlanningUserProps extends Poker.User {
	cards: Poker.Card[]
}

const User: FC<PlanningUserProps> = ({ context, name, cards }) => {
	const [value, setValue] = useState<string>('')
	const [isFlipped, setIsFlipped] = useState(true)
	const [flyout, setFlyout] = useState(false)
	const socket = useSocket()

	const submit = () => {
		setIsFlipped(false)
		setTimeout(() => {
			setFlyout(true)
			setTimeout(() => {
				socket.emit('card', { value, name, id: context.userObjectId })
			}, 300)
		}, 500)
	}

	const hasSubmitted = cards.some((card) => card.id === context.userObjectId)

	return !hasSubmitted ? (
		<Flex itemsCenter center col className='h-full'>
			<div
				className='transition-all duration-300'
				style={{
					transform: flyout ? `translateX(-${window.innerWidth}px)` : 'translateX(-0px)',
					opacity: Number(!flyout)
				}}
			>
				<Card isFlipped={isFlipped} value={value} name={name} className='relative flex justify-center' />
			</div>
			<div className={clsx('flex flex-col transition-opacity', isFlipped ? 'opacity-100' : 'opacity-0')}>
				<Input inverted className='mt-2' value={value} label='Estimate' onChange={(e) => setValue((e.target as any).value)} />
				<Button disabled={Number(value) < 0 || value.length === 0} className='mt-2' onClick={submit}>
					Submit
				</Button>
			</div>
		</Flex>
	) : null
}

export default User
