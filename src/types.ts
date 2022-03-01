import { Context } from '@microsoft/teams-js'

export namespace Poker {
	export interface User {
		context: Context
		type: 'user'
		name: string
	}
	export interface Card {
		name: string
		id: string
		value: number
	}
	export enum GameState {
		LOBBY = 'lobby',
		PLANNING = 'planning',
		INGAME = 'ingame',
		POSTGAME = 'postgame'
	}
}
