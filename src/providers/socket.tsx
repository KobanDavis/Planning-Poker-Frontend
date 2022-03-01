import React, { useContext, createContext, FC, useState } from 'react'
import io, { Socket as SocketType } from 'socket.io-client'

type SocketContext = SocketType

const SocketProvider: FC = (props) => {
	const [socket] = useState<SocketType>(io(process.env.SERVER_URL))
	return <Socket.Provider value={socket} {...props} />
}

const Socket = createContext<SocketContext>(null)

const useSocket = (): SocketContext => useContext<SocketContext>(Socket)

export { SocketProvider, useSocket }
