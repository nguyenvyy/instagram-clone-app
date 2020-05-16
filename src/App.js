import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import 'antd/dist/antd.css';
import { DataProvider } from './store/DataProvider';
import { SignUpPage } from './pages/SignUpPage/SignUpPage';



function App() {
	useEffect(() => {
		document.title = 'Instagram';
	}, []);
	return (
		<div className="App">
			<Router>
				<DataProvider>
					
					<Switch>
						<Route path="/sign-up">
							<SignUpPage />
						</Route>
					</Switch>
				</DataProvider>
			</Router>
		</div>
	);
}

export default App;
