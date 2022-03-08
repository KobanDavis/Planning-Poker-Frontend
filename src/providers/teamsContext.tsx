import { Context } from '@microsoft/teams-js'
import React, { useContext, createContext, FC, useState, useEffect } from 'react'
import * as microsoftTeams from '@microsoft/teams-js'

type TeamsContextContext = Context

const inTeams = () => {
	try {
		return window.self !== window.top
	} catch (e) {
		return true
	}
}

let userObjectId = window.localStorage.getItem('userObjectId')
if (!userObjectId) {
	const id = Math.random().toString().slice(2)
	localStorage.setItem('userObjectId', id)
	userObjectId = id
}

const TeamsContextProvider: FC = (props) => {
	const [teamsContext, setTeamsContext] = useState<Context>(null)
	const params = Object.fromEntries(new URLSearchParams(window.location.href.split('?')?.[1]))

	useEffect(() => {
		if (inTeams()) {
			if (inTeams()) {
				microsoftTeams.initialize(() => {
					microsoftTeams.getContext(setTeamsContext)
					microsoftTeams.registerOnThemeChangeHandler((theme) => {
						setTeamsContext((o) => ({ ...o, theme }))
					})
				})
			}
		} else {
			setTeamsContext({
				locale: 'en-gb',
				theme: 'dark',
				userObjectId,
				entityId: '',
				frameContext: (params.host === '1' ? 'meetingStage' : '') as any,
				meetingId: params.meetingId
			})
		}
	}, [])

	if (!teamsContext) {
		return null
	}

	return <TeamsContext.Provider value={teamsContext} {...props} />
}

const TeamsContext = createContext<TeamsContextContext>(null)

const useTeamsContext = (): TeamsContextContext => useContext<TeamsContextContext>(TeamsContext)

export { TeamsContextProvider, useTeamsContext }
