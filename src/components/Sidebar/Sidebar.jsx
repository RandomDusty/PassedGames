import { NavLink } from 'react-router-dom';
import styles from '../../styles/Sidebar.module.css';
import { sidebarList } from '../../utils/constants';

function Sidebar() {
	return (
		<section className={styles.sidebar}>
			{sidebarList.map(category => {
				return category.map((item, id) => {
					return id === 0 ? (
						<div className={styles.title}>{item.title}</div>
					) : (
						<nav>
							<ul className={styles.menu}>
								<li>
									<NavLink
										className={({ isActive }) =>
											`${styles.link} ${isActive ? styles.active : ''}`
										}
										to={`/discover/${item.title
											.toLowerCase()
											.replace(/ /g, '-')}`}
									>
										{item.title}
									</NavLink>
								</li>
							</ul>
						</nav>
					);
				});
			})}
		</section>
	);
}
export default Sidebar;
