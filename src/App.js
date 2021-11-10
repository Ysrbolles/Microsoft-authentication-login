import logo from './logo.png';
import './App.css';
import config from "./Configs"
import { PublicClientApplication } from '@azure/msal-browser';
import { useEffect, useState } from 'react';

function App() {
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(null);
	const [error, setError] = useState(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [publicClientApplication, setPublicClientApplication] = useState(null);

	useEffect(() => {
		let publicClientApplication = new PublicClientApplication({
			auth: {
				clientId: config.appId,
				authority: config.authority,
				redirectUri: config.redirectUrl,
			},
			cache: {
				cacheLocation: 'sessionStorage',
				storeAuthStateInCookie: true,
			}
		})
		setPublicClientApplication(publicClientApplication);
	}, [])


	const login = async () => {
		publicClientApplication.loginPopup({
			scopes: config.scopes, prompt: 'select_account'
		}).then(async (response) => {
			if (response.accessToken) {
				setToken(response.accessToken);
				setIsAuthenticated(true);
				setUser(response.account);
			}
			else {
				setError(response.error);
			}
		}).catch((error) => {
			setError(error);
		});
	}
	return (
		<div className="App" >
			<header className="App-header">
				<img src={logo} alt="logo" />
				{isAuthenticated ? <p>Welcome {user?.name}</p> :
					<button style={{ padding: "10px", width: "100px" }} onClick={() => login()}>login </button>}
			</header>
		</div >
	);
}

export default App;
