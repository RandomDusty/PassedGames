import React, { StrictMode, useEffect } from 'react';
import Games from '../Games/Games';
import { useSelector } from 'react-redux';
import { API_KEY } from '../../utils/constants';
import { useGetGamesQuery } from '../../features/api/apiSlice';

const Home = () => {
	// const { list } = useSelector(({ games }) => games);
	const key = API_KEY;
	const page = 1;
	const page_size = 30;
	const search = '';

	const { data, isLoading, isFetching, isSuccess, isError } = useGetGamesQuery({
		key,
		page,
		page_size,
		search,
	});

	return isLoading ? (
		<section className='preloader'>Loading...</section>
	) : !isError ? (
		<>
			<Games games={data.results} title={'All Games'} />
		</>
	) : (
		<div className='preloader'>
			There are some problems with the server, try to come back later!
		</div>
	);
};
export default Home;
