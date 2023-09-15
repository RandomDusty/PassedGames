import { Link } from 'react-router-dom';
import styles from '../styles/Games.module.css';
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
import imageNotFound from '../images/image_not_found.jpg';

const GameListItem = ({ game }) => {
	const redMetascore = { color: 'red', borderColor: 'red' };
	const yellowMetascore = { color: 'yellow', borderColor: 'yellow' };
	const greenMetascore = { color: '#00FF00', borderColor: '#00FF00' };
	const { id, slug, name, background_image, metacritic } = game;

	const { ref, inView } = useInView({
		threshold: 0.5,
		triggerOnce: true,
	});

	return (
		<Link to={`/games/${slug}`} ref={ref} className={styles.game}>
			{inView ? (
				<LazyLoadImage
					className={styles.image}
					alt={`Image ${name}`}
					src={background_image ? background_image : imageNotFound}
				/>
			) : (
				<div className={styles.image_skeleton}></div>
			)}

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
	);
};
export default GameListItem;
