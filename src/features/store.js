import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice';
import userSlice from './user/userSlice';
import relatedGamesSlice from './relatedGames/relatedGamesSlice';

export const store = configureStore({
	reducer: {
		relatedGames: relatedGamesSlice,
		user: userSlice,
		[apiSlice.reducerPath]: apiSlice.reducer,
	},
	middleware: getMiddleware => getMiddleware().concat(apiSlice.middleware),
	devTools: true,
});
