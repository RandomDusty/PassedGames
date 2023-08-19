import { useLocation, useParams } from 'react-router-dom';
import Games from '../Games/Games';
import { memo, useEffect, useMemo, useState } from 'react';
import gamesService from '../../API/gamesService';
import { useFetching } from '../../hooks/useFetching';

const Discover = () => {
	const page = 1;
	const page_size = 28;
	const location = useLocation();
	const { title, paramsForApi } = location.state;
	const [games, setGames] = useState([]);
	const [totalPages, setTotalPages] = useState(0);

	const [fetchGames, isGamesLoading, gamesError] = useFetching(
		async (page, page_size, paramsForApi) => {
			const response = await gamesService.getGames({
				page,
				page_size,
				...paramsForApi,
			});
			console.log(response);
			setGames(response.results);
			const pageCount = Math.ceil(response.count / page_size);
			setTotalPages(pageCount);
		}
	);

	useEffect(() => {
		fetchGames(page, page_size, paramsForApi);
	}, [title]);

	return isGamesLoading ? (
		<section className='preloader'>
			<div className='loader'></div>
		</section>
	) : !gamesError ? (
		<>
			<Games
				title={title}
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
export default memo(Discover);
