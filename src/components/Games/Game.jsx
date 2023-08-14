import { useDispatch, useSelector } from 'react-redux';
import styles from '../../styles/Game.module.css';
import {
	addGameToLibrary,
	addGameToWishlist,
} from '../../features/user/userSlice';
import { Link } from 'react-router-dom';

const Game = ({ gameInfo, dlcList, gamesInSeriesList, parentGamesList }) => {
	console.log(gameInfo);

	const dispatch = useDispatch();

	const { library, wishlist } = useSelector(({ user }) => user);

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
							style={{ backgroundImage: `url(${gameInfo.background_image})` }}
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
						<p>About</p>
						<div dangerouslySetInnerHTML={description} />
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
				<div>
					<p>Other games in the series :</p>
					{gamesInSeriesList.map((game, id) => {
						return (
							<span key={id}>
								<Link className={styles.linkGame} to={`/games/${game.slug}`}>
									{game.name}
								</Link>
								{id != gamesInSeriesList.length - 1 ? (
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
			{gameInfo.additions_count > 0 ? (
				<div>
					<p>DLC's and editions :</p>
					{dlcList.map((game, id) => {
						return (
							<span key={id}>
								<Link className={styles.linkGame} to={`/games/${game.slug}`}>
									{game.name}
								</Link>
								{id != dlcList.length - 1 ? <span>, </span> : <span></span>}
							</span>
						);
					})}
				</div>
			) : (
				<div></div>
			)}
		</section>
	);
};
export default Game;
