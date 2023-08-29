import styles from '../styles/Sidebar.module.css';
import { NavLink } from 'react-router-dom';
import { getRefactorTitleForURL } from '../utils/functions';

const SidebarItem = ({
	categoryItem,
	sidebarItemId,
	showButtons,
	sidebarItemsId,
}) => {
	return (
		<>
			{sidebarItemId === 0 ? (
				<div className={styles.title}>{categoryItem.title}</div>
			) : (
				<nav>
					<ul
						className={styles.menu}
						style={{
							display:
								sidebarItemId < 4
									? 'flex'
									: showButtons[sidebarItemsId]
									? 'flex'
									: 'none',
						}}
					>
						<li>
							<svg className={styles.icon}>
								<use
									xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#${categoryItem.icon}`}
								/>
							</svg>
							<NavLink
								className={({ isActive }) =>
									`${styles.link} ${isActive ? styles.active : ''}`
								}
								to={
									categoryItem.urlPath !== undefined
										? `/browse/${categoryItem.urlPath}`
										: `/discover/${getRefactorTitleForURL(categoryItem.title)}`
								}
								state={{
									title: categoryItem.title,
									paramsForApi: categoryItem.paramsForApi,
									urlPath: categoryItem.urlPath,
								}}
							>
								{categoryItem.title}
							</NavLink>
						</li>
					</ul>
				</nav>
			)}
		</>
	);
};
export default SidebarItem;
