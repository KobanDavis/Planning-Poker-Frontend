import { FC } from 'react'
import clsx from 'clsx'

import { Flex } from 'components'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
	isFlipped?: boolean
	value?: string | number
	name?: string
}

const Card: FC<CardProps> = ({ isFlipped = false, value, name, children, className, ...rest }) => {
	return (
		<div className='[perspective:1000px] h-80 w-56' {...rest}>
			<div
				className={clsx(
					'w-full h-full transition-transform duration-500 rounded-md bg-white border [transform-style:preserve-3d] relative',
					isFlipped && '[transform:rotateY(180deg)]'
				)}
			>
				<div
					style={{
						backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.25' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`
					}}
					className='bg-purple-600 rounded-sm z-10 absolute w-[stretch] h-[stretch]  m-3 [backface-visibility:hidden]'
				/>
				<Flex itemsCenter center className='absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)]'>
					<div className='text-6xl text-purple-600'>{value}</div>
					<span className='absolute bottom-1 text-purple-400'>{name}</span>
				</Flex>
			</div>
		</div>
	)
}

export default Card
