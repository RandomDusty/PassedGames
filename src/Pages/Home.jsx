import React, { StrictMode, useEffect, useState } from 'react';
import Games from '../components/Games/Games';
import { useSelector } from 'react-redux';
import { API_KEY } from '../utils/constants';
import { useGetGamesQuery } from '../features/api/apiSlice';
import { useFetching } from '../hooks/useFetching';
import gamesService from '../API/gamesService';

const Home = () => {
	const page = 1;
	const page_size = 28;
	const [games, setGames] = useState([]);
	const [totalPages, setTotalPages] = useState(0);

	const [fetchGames, isGamesLoading, gamesError] = useFetching(
		async (page, page_size) => {
			const response = await gamesService.getGames({
				page,
				page_size,
			});
			console.log(response);
			setGames(response.results);
			const pageCount = Math.ceil(response.count / page_size);
			setTotalPages(pageCount);
		}
	);

	useEffect(() => {
		fetchGames(page, page_size);
	}, []);

	return isGamesLoading ? (
		<section className='preloader'>
			<div className='loader'></div>
		</section>
	) : !gamesError ? (
		<>
			<Games
				title={'All Games'}
				paramsForApi={{}}
				games={games}
				setGames={setGames}
				totalPageCount={totalPages}
			/>
		</>
	) : (
		<div className='preloader'>
			There are some problems with the server, try to come back later!
		</div>
	);
};
export default Home;
