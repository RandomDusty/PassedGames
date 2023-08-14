import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import gamesService from '../../API/gamesService';

export const getRelatedGames = createAsyncThunk(
	'games/getRelatedGames',
	async (slug, thunkAPI) => {
		try {
			const gamesInSeriesResponse = await gamesService.getGamesInSeries(slug);
			const dlcGamesResponse = await gamesService.getDlcGames(slug);
			const parentGamesResponse = await gamesService.getParentGames(slug);
			return { gamesInSeriesResponse, dlcGamesResponse, parentGamesResponse };
		} catch (err) {
			console.log(err);
			return thunkAPI.rejectWithValue(err);
		}
	}
);

const relatedGamesSlice = createSlice({
	name: 'relatedGames',
	initialState: {
		dlcList: [],
		gamesInSeriesList: [],
		parentGamesList: [],
		isLoading: false,
	},
	extraReducers: builder => {
		builder.addCase(getRelatedGames.pending, state => {
			state.isLoading = true;
		});
		builder.addCase(getRelatedGames.fulfilled, (state, { payload }) => {
			state.gamesInSeriesList = payload.gamesInSeriesResponse.results;
			state.dlcList = payload.dlcGamesResponse.results;
			state.parentGamesList = payload.parentGamesResponse.results;
			state.isLoading = false;
		});
		builder.addCase(getRelatedGames.rejected, state => {
			state.isLoading = false;
			console.log('getRelatedGames throw error');
		});
	},
});

export default relatedGamesSlice.reducer;
