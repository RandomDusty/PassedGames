import { Link } from 'react-router-dom';
import styles from '../styles/Games.module.css';
import { memo, useEffect, useRef, useState } from 'react';
import { useObserver } from '../hooks/useObserver';
import gamesService from '../API/gamesService';
import { useFetching } from '../hooks/useFetching';
import GameList from '../components/GameList';

const Games = () => {
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
			<GameList
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
export default memo(Games);
