import React, { memo, useEffect, useState } from 'react';
import AppRoutes from './Routes';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import { useDispatch } from 'react-redux';

const App = () => {

	const [showHeader, setShowHeader] = useState(true);

	
	useEffect(() => {
		let previousScrollPosition = 0;
		let currentScrollPosition = 0;

		window.addEventListener('scroll', function (e) {
			// Get the new Value
			currentScrollPosition = window.pageYOffset;

			//Subtract the two and conclude
			if (previousScrollPosition - currentScrollPosition < 0) {
				setShowHeader(false);
			} else if (previousScrollPosition - currentScrollPosition > 0) {
				setShowHeader(true);
			}

			// Update the previous value
			previousScrollPosition = currentScrollPosition;
		});
	}, []);


	return (
		<div className='app'>
			<Header showHeader={showHeader} />
			<div className='container'>
				<Sidebar showHeader={showHeader} />
				<AppRoutes />
			</div>
			<Footer />
		</div>
	);
};

export default memo(App);
