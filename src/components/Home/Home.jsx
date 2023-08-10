import React, { StrictMode, useEffect } from 'react';
import Games from '../Games/Games';
import { useSelector } from 'react-redux';

const Home = () => {
	const { list } = useSelector(({ games }) => games);

	return (
		<>
			<Games games={list} title={'All Games'} />
		</>
	);
};
export default Home;
