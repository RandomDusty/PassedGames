// import { createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// import gamesService from '../../API/gamesService';
// import { CLIENT_ID, CLIENT_SECRET } from '../../utils/constants';

// export const getGames = createAsyncThunk(
// 	'games/getGames',
// 	async (_, thunkAPI) => {
// 		try {
// 			const response = await gamesService.getToken(CLIENT_ID, CLIENT_SECRET);
// 			response.access_token;
// 		} catch (err) {
// 			console.log(err);
// 			return thunkAPI.rejectWithValue(err);
// 		}
// 	}
// );
