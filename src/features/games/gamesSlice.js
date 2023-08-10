import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import gamesService from '../../API/gamesService';

export const getGames = createAsyncThunk(
	'games/getGames',
	async (_, thunkAPI) => {
		try {
			const response = await gamesService.getGames(30);
			return response.results;
		} catch (err) {
			console.log(err);
			return thunkAPI.rejectWithValue(err);
		}
	}
);

const gamesSlice = createSlice({
	name: 'games',
	initialState: {
		list: [],
		isLoading: false,
	},
	extraReducers: (builder) => {
		builder.addCase(getGames.pending, state => {
			state.isLoading = true;
		});
		builder.addCase(getGames.fulfilled, (state, { payload }) => {
			state.list = payload;
			state.isLoading = false;
		});
		builder.addCase(getGames.rejected, state => {
			state.isLoading = false;
			console.log('getGames throw error');
		});
	},
});

export default gamesSlice.reducer;
