import React from 'react';
import { Provider } from 'react-redux';
import App from './App';
import Store from './Store';

export default () => (
	<Provider store={Store}>
		<App />
	</Provider>
);