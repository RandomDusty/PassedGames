import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import gamesService from '../../API/gamesService';

// export const createUser = createAsyncThunk(
// 	'games/getGames',
// 	async (_, thunkAPI) => {
// 		try {
// 			const response = await gamesService.getGames(30);
// 			return response.results;
// 		} catch (err) {
// 			console.log(err);
// 			return thunkAPI.rejectWithValue(err);
// 		}
// 	}
// );

const userSlice = createSlice({
	name: 'user',
	initialState: {
		currentUser: [],
		library: [],
		wishlist: [],
		isLoading: false,
	},
	reducers: {
		addGameToLibrary: (state, { payload }) => {
			let newLibrary = [...state.library];
			const isInLibrary = state.library.find(({ id }) => id === payload.id);

			if (isInLibrary) {
				newLibrary = state.library.filter(({ id }) => id !== payload.id);
			} else {
				newLibrary.push(payload);
			}

			state.library = newLibrary;
		},

		addGameToWishlist: (state, { payload }) => {
			let newWishlist = [...state.wishlist];
			const isInWishlist = state.wishlist.find(({ id }) => id === payload.id);

			if (isInWishlist) {
				newWishlist = state.wishlist.filter(({ id }) => id !== payload.id);
			} else {
				newWishlist.push(payload);
			}

			state.wishlist = newWishlist;
		},
	},

	extraReducers: builder => {
		// builder.addCase(getGames.pending, state => {
		// 	state.isLoading = true;
		// });
		// builder.addCase(getGames.fulfilled, (state, { payload }) => {
		// 	state.list = payload;
		// 	state.isLoading = false;
		// });
		// builder.addCase(getGames.rejected, state => {
		// 	state.isLoading = false;
		// 	console.log('getGames throw error');
		// });
	},
});

export const { addGameToLibrary, addGameToWishlist } = userSlice.actions;

export default userSlice.reducer;
