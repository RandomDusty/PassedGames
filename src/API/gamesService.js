import axios from 'axios';
import { API_KEY, BASE_URL, PROXY } from '../utils/constants';

export default class gamesService {
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
