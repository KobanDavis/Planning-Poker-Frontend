import { FC } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Privacy, TermsOfUse, Tab, TabConfig } from 'components'
import { Provider, teamsV2Theme, teamsDarkV2Theme, teamsHighContrastTheme } from '@fluentui/react-northstar'
// import { useTeamsContext } from 'providers/teamsContext'

type ThemeId = 'default' | 'dark' | 'contrast'

const getTheme = (themeId: ThemeId) => {
	switch (themeId) {
		case 'default':
			return teamsV2Theme
		case 'dark':
			return teamsDarkV2Theme
		case 'contrast':
			return teamsHighContrastTheme
		default:
			throw new Error(`Theme not implemented: "${themeId}"`)
	}
}

const App: FC = () => {
	// const params = Object.fromEntries(new URLSearchParams(window.location.href.split('?')[1]).entries())
	// const context = useTeamsContext()
	// const theme = context.theme || params.theme || 'dark'
	const theme = 'dark'
	document.body.classList.add('overflow-hidden')
	return (
		<Provider theme={getTheme(theme as ThemeId)}>
			<div className={theme === 'dark' ? 'dark' : undefined}>
				<div className='h-screen w-screen bg-[#1F1F1F]'>
					<Router>
						<Route exact path='/privacy' component={Privacy} />
						<Route exact path='/termsofuse' component={TermsOfUse} />
						<Route exact path='/config' component={TabConfig} />
						<Route exact path='/tab' component={Tab} />
					</Router>
				</div>
			</div>
		</Provider>
	)
}

export default App
