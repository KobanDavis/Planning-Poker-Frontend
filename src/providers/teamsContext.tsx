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

const TeamsContextProvider: FC = (props) => {
	const [teamsContext, setTeamsContext] = useState<Context>(null)
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
				userObjectId: Math.random().toString().slice(2),
				entityId: 'test',
				frameContext: 'meetingStage' as any,
				meetingId: 'MCMxOTptZWV0aW5nX1lUbGpPREprTldFdFpqTXhaUzAwTTJFeUxXSmlZekl0Tm1FeU1HWXlaREptWmpCbUB0aHJlYWQudjIjMA=='
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
