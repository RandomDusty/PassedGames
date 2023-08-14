import React, { useState } from 'react';

import styles from '../../styles/Header.module.css';
import { Link } from 'react-router-dom';

import { ROUTES } from '../../utils/routes';
import logo from '../../images/logo.png';
import avatar from '../../images/avatar.jpg';
import { useGetGamesQuery } from '../../features/api/apiSlice';
import { API_KEY } from '../../utils/constants';

const Header = () => {
	const key = API_KEY;
	const page = 1;
	const page_size = 5;
	const [searchValue, setSearchValue] = useState('');

	const { data, isLoading } = useGetGamesQuery({
		key,
		page,
		page_size,
		search: searchValue,
	});

	const searchData = data && data.results;

	const handleSearch = ({ target: { value } }) => {
		setSearchValue(value);
	};

	return (
		<div className={styles.header}>
			<div className={styles.info}>
				<div className={styles.logo}>
					<Link to={ROUTES.HOME}>
						<img src={logo} alt='Stuff' />
					</Link>
				</div>
				<form className={styles.form}>
					<div className={styles.icon}>
						<svg className='icon'>
							<use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#search`} />
						</svg>
					</div>
					<div className={styles.input}>
						<input
							type='search'
							name='search'
							placeholder='Search for a game'
							autoComplete='off'
							onChange={handleSearch}
							value={searchValue}
						/>
					</div>

					{searchValue && (
						<div className={styles.box}>
							{isLoading
								? 'Loading'
								: !searchData.length
								? 'No results'
								: searchData.map(({ id, slug, name, background_image }) => {
										return (
											<Link
												onClick={() => setSearchValue('')}
												to={`games/${slug}`}
												key={id}
												className={styles.item}
											>
												<div
													className={styles.image}
													style={{
														backgroundImage: `url(${background_image})`,
													}}
												></div>
												<div className={styles.title}>{name}</div>
											</Link>
										);
								  })}
						</div>
					)}
				</form>
				<div className={styles.account}>
					<Link to={ROUTES.WISHLIST} className={styles.wishlist}>
						<svg className={styles['icon-wishlist']}>
							<use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#heart`} />
						</svg>
					</Link>

					<Link to={ROUTES.LIBRARY} className={styles.cart}>
						<svg className={styles['icon-library']}>
							<use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#library`} />
						</svg>
					</Link>

					<div className={styles.user}>
						<div
							className={styles.avatar}
							style={{ backgroundImage: `url(${avatar})` }}
						/>
						<div className={styles.username}>Guest</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Header;
