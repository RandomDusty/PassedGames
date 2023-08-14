import { useNavigate, useParams } from 'react-router-dom';
import { useGetSingleGameBySlugQuery } from '../../features/api/apiSlice';
import { API_KEY } from '../../utils/constants';
import { useEffect } from 'react';
import { ROUTES } from '../../utils/routes';
import Game from './Game';
import { useDispatch, useSelector } from 'react-redux';
import { getRelatedGames } from '../../features/relatedGames/relatedGamesSlice';

const SingleGame = () => {
	const { slug } = useParams();
	const key = API_KEY;
	const navigate = useNavigate();

	const dispatch = useDispatch();
	const { dlcList, gamesInSeriesList, parentGamesList } = useSelector(
		({ relatedGames }) => relatedGames
	);

	const { data, isLoading, isFetching, isSuccess } =
		useGetSingleGameBySlugQuery({ key, slug });

	useEffect(() => {
		if (!isFetching && !isLoading && !isSuccess) {
			navigate(ROUTES.HOME);
		}
	}, [isLoading, isFetching, isSuccess]);

	useEffect(() => {
		if (slug) {
			dispatch(getRelatedGames(slug));
		}
	}, [slug]);

	return !data ? (
		<section className='preloader'>Loading...</section>
	) : (
		<>
			<Game
				gameInfo={data}
				dlcList={dlcList}
				gamesInSeriesList={gamesInSeriesList}
				parentGamesList={parentGamesList}
			/>
		</>
	);
};
export default SingleGame;
