import React, { memo, useEffect, useState } from 'react';

import styles from '../styles/Header.module.css';
import { Link } from 'react-router-dom';

import { ROUTES } from '../utils/routes';
import logo from '../images/logo.png';
import avatar from '../images/avatar.jpg';
import gamesService from '../API/gamesService';
import { API_KEY } from '../utils/constants';
import { useFetching } from '../hooks/useFetching';

const Header = () => {
	const page_size = 5;
	const [searchValue, setSearchValue] = useState('');
	const [searchData, setSearchData] = useState('');

	const [fetchGames, isGamesLoading, gamesError] = useFetching(
		async (searchValue, page_size) => {
			const searchResult = await gamesService.getSearchedGames(
				searchValue,
				page_size
			);

			setSearchData(searchResult.results);
			console.log(searchResult.results);
		}
	);

	useEffect(() => {
		if (searchValue) {
			const delaySearch = setTimeout(() => {
				fetchGames(searchValue, page_size);
			}, 500);

			return () => clearTimeout(delaySearch);
		}
	}, [searchValue]);

	const handleSearch = ({ target: { value } }) => {
		setSearchValue(value);
	};

	return (
		<div className={styles.header}>
			<div className={styles.info}>
				<div className={styles.logo}>
					<Link to={ROUTES.HOME}>
						<img src={logo} alt='GameLib' />
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
							{!isGamesLoading && searchData ? (
								!searchData.length ? (
									'No results'
								) : (
									searchData.map(({ id, slug, name, background_image }) => {
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
									})
								)
							) : (
								<div className={'loader'}></div>
							)}
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
export default memo(Header);
