import { NavLink } from 'react-router-dom';
import styles from '../../styles/Sidebar.module.css';
import { sidebarList } from '../../utils/constants';
import { getRefactorTitleForURL } from '../../utils/functions';
import { memo, useState } from 'react';

function Sidebar() {
	const [show, setShow] = useState(false);

	function toggleShow() {
		setShow(!show);
	}

	let iconShowButton = show ? 'svg-Arrow_Up' : 'svg-Arrow_Down';

	return (
		<section className={styles.sidebar}>
			{sidebarList.map(category => {
				return category.map((item, id, arr) => {
					return id === 0 ? (
						<div className={styles.title} key={id}>
							{item.title}
						</div>
					) : (
						<nav key={id}>
							<ul
								className={styles.menu}
								style={{ display: show || id < 4 ? 'block' : 'none' }}
							>
								<li>
									<svg className={styles.icon}>
										<use
											xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#${item.icon}`}
										/>
									</svg>
									<NavLink
										className={({ isActive }) =>
											`${styles.link} ${isActive ? styles.active : ''}`
										}
										to={`/discover/${getRefactorTitleForURL(item.title)}`}
										state={{
											title: item.title,
											paramsForApi: item.paramsForApi,
										}}
									>
										{item.title}
									</NavLink>
								</li>
							</ul>
							{arr.length >= 4 && id === arr.length - 1 ? (
								<li style={{ marginTop: '15px', opacity: '0.4' }}>
									<svg className={styles.icon}>
										<use
											xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#${iconShowButton}`}
										/>
									</svg>
									<button className={styles.showButton} onClick={toggleShow}>
										{show ? 'Hide' : 'Show all'}
									</button>
								</li>
							) : (
								<></>
							)}
						</nav>
					);
				});
			})}
		</section>
	);
}
export default memo(Sidebar);
