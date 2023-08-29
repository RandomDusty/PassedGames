import { FixedSizeList } from 'react-window';
import { sidebarList } from '../../utils/constants';
import { useEffect } from 'react';
import { useFetching } from '../../hooks/useFetching';
import { useState } from 'react';
import gamesService from '../../API/gamesService';
import styles from '../../styles/Games.module.css';
import AutoSizer from 'react-virtualized-auto-sizer';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const VirtualGames = () => {
	const page = 1;
	const page_size = 28;
	const [games, setGames] = useState([]);
	const [totalPages, setTotalPages] = useState(0);

	const Row = ({ index, style }) => {
		// console.log(index);
		const { id, slug, name, background_image, metacritic } = games[index];
		return (
			<Link to={`/games/${slug}`} className={styles.game}>
				<LazyLoadImage
					className={styles.image}
					alt={`Image ${name}`}
					src={background_image}
				/>

				<div className={styles.wrapper}>
					<h3 className={styles.title}>{name}</h3>
					<p>{metacritic}</p>
				</div>
			</Link>
		);
	};

	const [fetchGames, isGamesLoading, gamesError] = useFetching(
		async (page, page_size) => {
			const response = await gamesService.getGames({
				page,
				page_size,
			});
			await setGames(response.results);
			console.log(response.results);

			const pageCount = Math.ceil(response.count / page_size);
			setTotalPages(pageCount);
		}
	);

	useEffect(() => {
		fetchGames(page, page_size);
	}, []);

	return (
		<section className={styles.games}>
			<h2>Games</h2>

			<FixedSizeList
				className={styles.list}
				height={window.innerHeight}
				itemCount={games.length}
				itemSize={games.length / 4}
				width='100%'
				style={{ overflow: 'none', display: 'flex' }}
			>
				{Row}
			</FixedSizeList>
		</section>
	);
};

export default VirtualGames;
