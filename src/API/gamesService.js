import axios from 'axios';

export default class gamesService {
	static async getToken(clientId, clientSecret) {
		try {
			const response = await axios.post(
				`https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`
			);
			return response.data;
		} catch (err) {
			console.log(err);
		}
	}

	static async getGames(clientId, token) {
		try {
			const response = await axios.post('https://api.igdb.com/v4/games', {
				headers: {
					Accept: 'application/json',
					'Client-ID': clientId,
					Authorization: `Bearer ${token}`,
				},
				body: 'fields *;',
			});

			console.log(response);
			return response;
		} catch (err) {
			console.log(err);
		}
	}
}
