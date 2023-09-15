import { NavLink } from 'react-router-dom';
import styles from '../styles/Sidebar.module.css';
import { sidebarList } from '../utils/constants';
import { getRefactorTitleForURL } from '../utils/functions';
import { memo, useEffect, useState } from 'react';
import SidebarItem from './SidebarItem';

function Sidebar({ showHeader }) {
	const [showButtons, setShowButtons] = useState([]);

	function toggleShow(sidebarItemsId) {
		let currentShowButtons = showButtons.slice(0);

		if (currentShowButtons[sidebarItemsId] !== undefined) {
			currentShowButtons[sidebarItemsId] = !currentShowButtons[sidebarItemsId];
		} else {
			currentShowButtons[sidebarItemsId] = true;
		}

		setShowButtons(currentShowButtons);
	}

	return (
		<section
			className={styles.sidebar}
			style={{ top: showHeader ? '80px' : '0' }}
		>
			{sidebarList.map((sidebarItems, sidebarItemsId) => {
				return sidebarItems.map(
					(categoryItem, sidebarItemId, categoryArr) => {
						return (
							<div key={+(sidebarItemsId + '' + sidebarItemId)}>
								<SidebarItem
									categoryItem={categoryItem}
									sidebarItemId={sidebarItemId}
									showButtons={showButtons}
									sidebarItemsId={sidebarItemsId}
								/>
								{categoryArr.length >= 4 &&
								sidebarItemId === categoryArr.length - 1 ? (
									<li style={{ marginTop: '15px', opacity: '0.4' }}>
										<svg className={styles.icon}>
											<use
												xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#${
													showButtons[sidebarItemsId]
														? 'svg-Arrow_Up'
														: 'svg-Arrow_Down'
												}`}
											/>
										</svg>
										<button
											className={styles.showButton}
											onClick={() => toggleShow(sidebarItemsId)}
										>
											{showButtons[sidebarItemsId] ? 'Hide' : 'Show all'}
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
