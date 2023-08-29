import { Link } from 'react-router-dom';
import styles from '../styles/Browse.module.css';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { useObserver } from '../hooks/useObserver';
import gamesService from '../API/gamesService';
import { useFetching } from '../hooks/useFetching';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import BrowseListItem from './BrowseListItem';

const BrowseList = ({
	title,
	urlPath,
	browseItems,
	setBrowseItems,
	totalPageCount,
}) => {
	const lastElement = useRef();
	const [page, setPage] = useState(1);
	const page_size = 28;

	const [fetchGames, isGamesLoading, gamesError] = useFetching(
		async (page, page_size, urlPath) => {
			const response = await gamesService.getBrowseItemList(
				urlPath,
				page,
				page_size
			);
			console.log(response);
			setBrowseItems([...browseItems, ...response.results]);
		}
	);

	useObserver(lastElement, page < totalPageCount, isGamesLoading, () => {
		setPage(page + 1);
	});

	useEffect(() => {
		if (page != 1) fetchGames(page, page_size, urlPath);
	}, [page, title]);

	return (
		<section className={styles.items}>
			{title && <h2>{title}</h2>}

			<TransitionGroup className={styles.list}>
				{browseItems.map((browseItem, index) => {
					return <BrowseListItem browseItem={browseItem} key={index} />;
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
export default BrowseList;
