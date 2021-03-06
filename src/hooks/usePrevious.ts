import { useEffect, useRef } from 'react'

const usePrevious = <T extends any>(value: T): T => {
	const ref = useRef<T>(value)
	useEffect(() => {
		ref.current = value
	})
	return ref.current
}

export default usePrevious
