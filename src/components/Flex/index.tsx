import React, { forwardRef } from 'react'
import clsx from 'clsx'

interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
	col?: boolean
	row?: boolean
	center?: boolean
	itemsCenter?: boolean
	between?: boolean
	wrap?: boolean
}

const Flex = forwardRef<HTMLDivElement, FlexProps>(({ className, col, row, center, itemsCenter, between, wrap, ...rest }, ref) => {
	return (
		<div
			ref={ref}
			className={clsx(
				'flex',
				row && 'flex-row',
				col && 'flex-col',
				center && 'justify-center',
				itemsCenter && 'items-center',
				between && 'justify-between',
				wrap && 'flex-wrap',
				className
			)}
			{...rest}
		/>
	)
})

export default Flex
