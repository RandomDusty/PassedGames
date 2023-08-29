import { Link } from 'react-router-dom';
import styles from '../styles/Games.module.css';
import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import { useObserver } from '../hooks/useObserver';
import gamesService from '../API/gamesService';
import { useFetching } from '../hooks/useFetching';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import InfiniteLoader from 'react-window-infinite-loader';
import { useInView } from 'react-intersection-observer';
import GameListItem from './GameListItem';
import Dropdown from './Dropdown';
import { orderDropdownList, platformDropdownList } from '../utils/constants';

const GameList = ({ title, paramsForApi, games, setGames, totalPageCount }) => {
	const lastElement = useRef();
	const [page, setPage] = useState(1);
	const page_size = 28;
	const [orderParams, setOrderParams] = useState([]);
	const [currentOrder, setCurrentOrder] = useState('Popularity');

	const [fetchGames, isGamesLoading, gamesError] = useFetching(
		async (page, page_size, paramsForApi, firstPage) => {
			const response = await gamesService.getGames({
				page,
				page_size,
				...paramsForApi,
			});
			console.log(response);
			if (firstPage) {
				setGames(response.results);
			} else {
				setGames([...games, ...response.results]);
			}
		}
	);

	useObserver(lastElement, page < totalPageCount, isGamesLoading, () => {
		setPage(page + 1);
	});

	useEffect(() => {
		if (page !== 1 && games.length !== 0) {
			fetchGames(
				page,
				page_size,
				{
					...paramsForApi,
					...orderParams,
				},
				false
			);
		}
	}, [page, title]);

	useEffect(() => {
		if (orderParams.length !== 0) {
			setPage(1);
			fetchGames(
				1,
				page_size,
				{
					...paramsForApi,
					...orderParams,
				},
				true
			);
		}
	}, [orderParams]);

	return (
		<section className={styles.games}>
			{title && <h2>{title}</h2>}

			<Dropdown
				trigger={
					<button>
						Order by: {currentOrder}
						<svg className='icon'>
							<use
								xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#svg-Arrow_Down`}
							/>
						</svg>
					</button>
				}
				menu={orderDropdownList}
				setCurrentOrder={setCurrentOrder}
				setOrderParams={setOrderParams}
			/>

			<TransitionGroup className={styles.list}>
				{games.map((game, index) => {
					return <GameListItem game={game} key={index} />;
				})}

				{isGamesLoading && (
					<section className='preloader'>
						<div className='loader'></div>
					</section>
				)}
			</TransitionGroup>
			<div ref={lastElement} />
		</section>
	);
};
export default memo(GameList);
