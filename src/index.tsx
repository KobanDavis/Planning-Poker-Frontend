import ReactDOM from 'react-dom'
import App from 'components/App'

import './index.css'
import { TeamsContextProvider } from 'providers/teamsContext'
import { SocketProvider } from 'providers/socket'

const AppWithProviders = () => (
	<TeamsContextProvider>
		<SocketProvider>
			<App />
		</SocketProvider>
	</TeamsContextProvider>
)

ReactDOM.render(<AppWithProviders />, document.getElementById('root'))
