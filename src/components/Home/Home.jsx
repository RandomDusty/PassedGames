import React, { useEffect } from 'react';
import gamesService from '../../API/gamesService';
import { CLIENT_ID, CLIENT_SECRET } from '../../utils/constants';

const Home = () => {
	const fetch = async () => {
		const response = await gamesService.getToken(CLIENT_ID, CLIENT_SECRET);

		const response2 = await gamesService.getGames(
			CLIENT_ID,
			response.access_token
		);
	};

	useEffect(() => {
		fetch();
	}, []);

	return <div></div>;
};
export default Home;
