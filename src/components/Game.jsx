import { useDispatch, useSelector } from 'react-redux';
import styles from '../styles/Game.module.css';
import {
	addGameToLibrary,
	addGameToWishlist,
} from '../features/user/userSlice';
import { Link } from 'react-router-dom';
import { memo, useMemo, useState } from 'react';
import imageNotFound from '../images/image_not_found.jpg';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Game = ({ gameInfo, dlcList, gamesInSeriesList, parentGamesList }) => {
	console.log(gameInfo);

	const dispatch = useDispatch();

	const { library, wishlist } = useSelector(({ user }) => user);
	const [isFullDescriptionHidden, setIsFullDescriptionHidden] = useState(true);

	let description = { __html: gameInfo.description };
	let dateOfRelease = new Date(gameInfo.released).toLocaleString('en-US', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	});

	const addToLibrary = () => {
		dispatch(addGameToLibrary(gameInfo));
	};

	const addToWishlist = () => {
		dispatch(addGameToWishlist(gameInfo));
	};

	const readMoreButtonToggle = () => {
		setIsFullDescriptionHidden(!isFullDescriptionHidden);
	};

	return (
		<section className={styles.game}>
			<div className={styles.topInfo}>
				<p>
					Release date:{' '}
					<span className={styles.dateOfRelease}> {dateOfRelease}</span>
				</p>
				<p>AVERAGE PLAYTIME: {gameInfo.playtime} HOURS</p>
			</div>
			<div style={{ display: 'flex', flexDirection: 'row', columnGap: '15px' }}>
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<div className={styles.images}>
						<div
							className={styles.current}
							style={{
								backgroundImage: `url(${
									gameInfo.background_image
										? gameInfo.background_image
										: imageNotFound
								})`,
							}}
						/>
					</div>
					<div className={styles.actions}>
						<button className={styles.add} onClick={addToLibrary}>
							{library.indexOf(gameInfo)
								? 'Add to Library'
								: 'Del from Library'}
						</button>

						<button className={styles.favourite} onClick={addToWishlist}>
							{wishlist.indexOf(gameInfo)
								? 'Add to Wishlist'
								: 'Del from Wishlist'}
						</button>
					</div>
				</div>
				<div className={styles.info}>
					<h1 className={styles.title}>{gameInfo.name}</h1>
					<div className={styles.description}>
						<h3 style={{ color: '#f6f6f7' }}>Summary</h3>
						<div
							dangerouslySetInnerHTML={description}
							style={{
								overflow: `${isFullDescriptionHidden ? 'hidden' : ''}`,
								height: `${isFullDescriptionHidden ? '100px' : 'auto'}`,
							}}
						/>
						<p
							className={styles.readMoreButton}
							onClick={() => {
								readMoreButtonToggle();
							}}
						>
							{isFullDescriptionHidden ? 'Read more' : 'Show less'}
						</p>
					</div>
				</div>
			</div>
			{gameInfo.parents_count > 0 ? (
				<div>
					<p style={{ color: '576067' }}>Parent game :</p>
					{parentGamesList.map((game, id) => {
						return (
							<span key={id}>
								<Link className={styles.linkGame} to={`/games/${game.slug}`}>
									{game.name}
								</Link>
								{id != parentGamesList.length - 1 ? (
									<span>, </span>
								) : (
									<span></span>
								)}
							</span>
						);
					})}
				</div>
			) : (
				<div></div>
			)}

			{gameInfo.game_series_count > 0 ? (
				<>
					<p>Other games in the series :</p>{' '}
					<div className={styles.relatedGamesList}>
						{gamesInSeriesList.map((game, id) => {
							return (
								<Link
									className={styles.relatedGamesListItem}
									key={id}
									to={`/games/${game.slug}`}
								>
									<div
										className={styles.image}
										style={{
											backgroundImage: `url(${
												game.background_image
													? game.background_image
													: imageNotFound
											})`,
										}}
									/>
									<p>{game.name}</p>
								</Link>
							);
						})}
					</div>
				</>
			) : (
				<div></div>
			)}

			{gameInfo.additions_count > 0 ? (
				<>
					<p>DLC's and editions :</p>
					<div className={styles.relatedGamesList}>
						{dlcList.map((game, id) => {
							return (
								<Link
									className={styles.relatedGamesListItem}
									key={id}
									to={`/games/${game.slug}`}
								>
									<div
										className={styles.image}
										style={{
											backgroundImage: `url(${
												game.background_image
													? game.background_image
													: imageNotFound
											})`,
										}}
									/>
									<p>{game.name}</p>
								</Link>
							);
						})}
					</div>
				</>
			) : (
				<div></div>
			)}
		</section>
	);
};

export default memo(Game);
