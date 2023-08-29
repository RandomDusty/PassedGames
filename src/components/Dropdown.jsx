import React from 'react';
import styles from '../styles/Dropdown.module.css';

const Dropdown = ({ trigger, menu, setCurrentOrder, setOrderParams }) => {
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		setOpen(!open);
	};

	return (
		<div className={styles.dropdown}>
			{React.cloneElement(trigger, {
				className: open ? styles.open_title : styles.title,
				onClick: handleOpen,
			})}
			{open ? (
				<ul className={styles.menu}>
					{menu.map((menuItem, index) => (
						<li key={index} className={styles.menuItem}>
							<button
								onClick={() => {
									setCurrentOrder(menuItem.title);
									setOrderParams(menuItem.params);
									console.log(menuItem.params);
									setOpen(false);
								}}
							>
								{menuItem.title}
							</button>
						</li>
					))}
				</ul>
			) : null}
		</div>
	);
};
export default Dropdown;
