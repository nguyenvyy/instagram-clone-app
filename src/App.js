import React, { useEffect } from 'react';
import './App.css';
import { DataProvider } from './store/DataProvider';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  useEffect(() => {
    document.title = 'Instagram'
  }, [])
	return (
		<div className="App">
			<Router>
				<DataProvider>
          <div />
        </DataProvider>
			</Router>
		</div>
	);
}

export default App;
