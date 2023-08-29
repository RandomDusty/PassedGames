import { NavLink } from 'react-router-dom';
import styles from '../styles/Sidebar.module.css';
import { sidebarList } from '../utils/constants';
import { getRefactorTitleForURL } from '../utils/functions';
import { memo, useEffect, useState } from 'react';
import SidebarItem from './SidebarItem';

function Sidebar() {
	const [show, setShow] = useState([]);

	function toggleShow(sidebarItemsId) {
		let showButtons = show.slice(0);

		if (showButtons[sidebarItemsId] !== undefined) {
			showButtons[sidebarItemsId] = !showButtons[sidebarItemsId];
		} else {
			showButtons[sidebarItemsId] = true;
		}

		setShow(showButtons);
	}

	return (
		<section className={styles.sidebar}>
			{sidebarList.map((sidebarItems, sidebarItemsId) => {
				return sidebarItems.map(
					(categoryItem, sidebarItemId, categoryArr) => {
						return (
							<div key={+(sidebarItemsId + '' + sidebarItemId)}>
								<SidebarItem
									categoryItem={categoryItem}
									sidebarItemId={sidebarItemId}
									showButtons={show}
									sidebarItemsId={sidebarItemsId}
								/>
								{categoryArr.length >= 4 &&
								sidebarItemId === categoryArr.length - 1 ? (
									<li style={{ marginTop: '15px', opacity: '0.4' }}>
										<svg className={styles.icon}>
											<use
												xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#${
													show[sidebarItemsId]
														? 'svg-Arrow_Up'
														: 'svg-Arrow_Down'
												}`}
											/>
										</svg>
										<button
											className={styles.showButton}
											onClick={() => toggleShow(sidebarItemsId)}
										>
											{show[sidebarItemsId] ? 'Hide' : 'Show all'}
										</button>
									</li>
								) : (
									<></>
								)}
							</div>
						);
					},
					[sidebarItemsId]
				);
			})}
		</section>
	);
}
export default memo(Sidebar);
