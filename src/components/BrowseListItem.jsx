import { Link } from 'react-router-dom';
import styles from '../styles/Browse.module.css';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { useObserver } from '../hooks/useObserver';
import gamesService from '../API/gamesService';
import { useFetching } from '../hooks/useFetching';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import InfiniteLoader from 'react-window-infinite-loader';
import { useInView } from 'react-intersection-observer';

const BrowseListItem = ({ browseItem }) => {
	const { id, games_count, name, image_background, games, image } = browseItem;

	const { ref, inView } = useInView({
		threshold: 0.5,
		triggerOnce: true,
	});

	return (
		<div
			className={styles.item}
			ref={ref}
			style={{
				backgroundImage: `linear-gradient(rgba(25, 25, 25, 0.5), rgb(25, 25, 25) 70%), url(${
					image ? image : image_background
				})`,
			}}
		>
			<CSSTransition timeout={500}>
				<div className={styles.wrapper}>
					<h3 className={styles.title}>{name}</h3>
					<p>Games count: {games_count}</p>
					<div>
						<p>Popular games:</p>
						<div className={styles.flexBlock}>
							{games.map((game, index) => {
								return (
									<Link
										to={`/games/${game.slug}`}
										key={index}
										className={styles.browseGameItem}
										alt={game.name}
									>
										{game.name}
									</Link>
								);
							})}
						</div>
					</div>
				</div>
			</CSSTransition>
		</div>
	);
};
export default BrowseListItem;
