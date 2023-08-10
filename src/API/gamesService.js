import axios from 'axios';
import { API_KEY, BASE_URL, PROXY } from '../utils/constants';

export default class gamesService {
	static async getGames(count) {
		try {
			const response = await axios.get(PROXY + BASE_URL + 'games', {
				params: {
					key: API_KEY,
					page_size: count,
				},
			});

			return response.data;
		} catch (e) {
			console.log(e);
		}
	}
}
