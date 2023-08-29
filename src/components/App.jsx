import React, { memo, useEffect } from 'react';
import AppRoutes from './Routes';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import { useDispatch } from 'react-redux';

const App = () => {
	return (
		<div className='app'>
			<Header />
			<div className='container'>
				<Sidebar />
				<AppRoutes />
			</div>
			<Footer />
		</div>
	);
};

export default memo(App);
