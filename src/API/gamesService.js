import axios from 'axios';
import { API_KEY, BASE_URL, PROXY } from '../utils/constants';

export default class gamesService {
	static async getSearchedGames(search, page_size) {
		try {
			console.log('api');
			const response = await axios.get(PROXY + BASE_URL + `games`, {
				params: {
					key: API_KEY,
					search: search,
					page_size: page_size,
				},
			});

			return response.data;
		} catch (e) {
			console.log(e);
		}
	}

	static async getGames(args) {
		try {
			const { page, page_size, dates, ordering, parent_platforms, platforms } =
				args;
			console.log(args);
			const response = await axios.get(PROXY + BASE_URL + `games`, {
				params: {
					key: API_KEY,
					page: page,
					page_size: page_size,
					dates: dates,
					ordering: ordering,
					parent_platforms: parent_platforms,
					platforms: platforms,
				},
			});

			return response.data;
		} catch (e) {
			console.log(e);
		}
	}

	static async getDlcGames(slug) {
		try {
			const response = await axios.get(
				PROXY + BASE_URL + `games/${slug}/additions`,
				{
					params: {
						key: API_KEY,
					},
				}
			);

			return response.data;
		} catch (e) {
			console.log(e);
		}
	}

	static async getGamesInSeries(slug) {
		try {
			const response = await axios.get(
				PROXY + BASE_URL + `games/${slug}/game-series`,
				{
					params: {
						key: API_KEY,
					},
				}
			);

			return response.data;
		} catch (e) {
			console.log(e);
		}
	}

	static async getParentGames(slug) {
		try {
			const response = await axios.get(
				PROXY + BASE_URL + `games/${slug}/parent-games`,
				{
					params: {
						key: API_KEY,
					},
				}
			);

			return response.data;
		} catch (e) {
			console.log(e);
		}
	}
}
