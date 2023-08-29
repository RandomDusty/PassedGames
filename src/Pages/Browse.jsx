import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { memo, useEffect, useMemo, useState } from 'react';
import gamesService from '../API/gamesService';
import { useFetching } from '../hooks/useFetching';
import BrowseList from '../components/BrowseList';
import { ROUTES } from '../utils/routes';

const Browse = () => {
	const page = 1;
	const page_size = 28;
	const location = useLocation();
	const navigate = useNavigate();

	if (location.state === null) {
		navigate(ROUTES.HOME);
	}

	const { title, paramsForApi, urlPath } = location.state;
	const [browseItems, setBrowseItems] = useState([]);
	const [totalPages, setTotalPages] = useState(0);

	const [fetchBrowseItems, isBrowseItemsLoading, browseItemsError] =
		useFetching(async (page, page_size, urlPath) => {
			const response = await gamesService.getBrowseItemList(
				urlPath,
				page,
				page_size
			);
			console.log(response);
			setBrowseItems(response.results);
			const pageCount = Math.ceil(response.count / page_size);
			setTotalPages(pageCount);
		});

	useEffect(() => {
		fetchBrowseItems(page, page_size, urlPath);
	}, [title]);

	return isBrowseItemsLoading ? (
		<section className='preloader'>
			<div className='loader'></div>
		</section>
	) : !browseItemsError ? (
		<>
			<BrowseList
				title={title}
				browseItems={browseItems}
				urlPath={urlPath}
				setBrowseItems={setBrowseItems}
				totalPageCount={totalPages}
			/>
		</>
	) : (
		<div className='preloader'>
			There are some problems with the server, try to come back later!
		</div>
	);
};
export default Browse;
