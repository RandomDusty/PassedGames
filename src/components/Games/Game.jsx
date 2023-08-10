import styles from '../../styles/Game.module.css';

const Game = ({ gameInfo }) => {
	console.log(gameInfo);
	let description = { __html: gameInfo.description };

	return (
		<section className={styles.Game}>
			<div className={styles.images}>
				<div
					className={styles.current}
					style={{ backgroundImage: `url(${gameInfo.background_image})` }}
				/>
				{/* {gameInfo.background_image.images.map((image, i) => (
					<div
						key={i}
						className={styles.current}
						style={{ backgroundImage: `url(${image})` }}
					/>
				))} */}
			</div>
			<div className={styles.info}>
				<h1 className={styles.title}>{gameInfo.name}</h1>
			</div>
			<div className={styles.description}>
				<div dangerouslySetInnerHTML={description} />
			</div>

			<div className={styles.actions}>
				<div className={styles.add}>Add to library</div>
				<div className={styles.favourite}>Add to Wishlist</div>
			</div>
		</section>
	);
};
export default Game;
