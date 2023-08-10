import { Link } from 'react-router-dom';
import styles from '../../styles/Games.module.css';

const Games = ({ title, games = [] }) => {
	return (
		<section className={styles.games}>
			{title && <h2>{title}</h2>}
			<div className={styles.list}>
				{games.map(({ id, slug, name, background_image }) => {
					return (
						<Link to={`/games/${slug}`} key={id} className={styles.game}>
							<div
								className={styles.image}
								style={{ backgroundImage: `url(${background_image})` }}
							/>
							<div className={styles.wrapper}>
								<h3 className={styles.title}>{name}</h3>
							</div>
						</Link>
					);
				})}
			</div>
		</section>
	);
};
export default Games;
