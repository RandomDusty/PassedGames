import styles from '../../styles/Games.module.css';

const Games = ({ title, games = []}) => {
	return <section>{title && <h2>{title}</h2>}</section>;

	{games.map}
};
export default Games;
