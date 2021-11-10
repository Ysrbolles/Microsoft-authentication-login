import logo from './logo.svg';
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
		console.log(publicClientApplication);
		publicClientApplication.loginPopup({
			scopes: config.scopes, prompt: 'select_account'
		}).then(async (response) => {
			if (response.accessToken) {
				setToken(response.accessToken);
				setIsAuthenticated(true);
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
				<img src={logo} className="App-logo" alt="logo" />
				{isAuthenticated && <p>Logged in</p>}
				<button onClick={() => login()}>login </button>
			</header>
		</div >
	);
}

export default App;
