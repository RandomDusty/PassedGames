import { Link } from 'react-router-dom';
import styles from '../../styles/Games.module.css';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { useObserver } from '../../hooks/useObserver';
import gamesService from '../../API/gamesService';
import { useFetching } from '../../hooks/useFetching';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import InfiniteLoader from 'react-window-infinite-loader';

const Games = ({ title, paramsForApi, games, setGames, totalPageCount }) => {
	const redMetascore = { color: 'red', borderColor: 'red' };
	const yellowMetascore = { color: 'yellow', borderColor: 'yellow' };
	const greenMetascore = { color: '#00FF00', borderColor: '#00FF00' };

	const lastElement = useRef();
	const [page, setPage] = useState(1);
	const page_size = 28;

	const [fetchGames, isGamesLoading, gamesError] = useFetching(
		async (page, page_size, paramsForApi, visibleStartIndex) => {
			const response = await gamesService.getGames({
				page,
				page_size,
				...paramsForApi,
			});
			console.log(response);
			setGames([...games, ...response.results]);
		}
	);

	useObserver(lastElement, page < totalPageCount, isGamesLoading, () => {
		setPage(page + 1);
	});

	useEffect(() => {
		if (page != 1) fetchGames(page, page_size, paramsForApi);
	}, [page, title]);

	return (
		<section className={styles.games}>
			{title && <h2>{title}</h2>}

			<TransitionGroup className={styles.list}>
				{games.map(({ id, slug, name, background_image, metacritic }) => {
					return (
						<CSSTransition key={id} timeout={500} className={styles.game}>
							<Link to={`/games/${slug}`}>
								<LazyLoadImage
									className={styles.image}
									alt={`Image ${name}`}
									src={background_image}
								/>

								<div className={styles.wrapper}>
									<h3 className={styles.title}>{name}</h3>
									{metacritic && (
										<p
											className={styles.metascore}
											style={
												metacritic >= 75
													? greenMetascore
													: metacritic >= 50
													? yellowMetascore
													: redMetascore
											}
										>
											{metacritic}
										</p>
									)}
								</div>
							</Link>
						</CSSTransition>
					);
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
export default memo(Games);
