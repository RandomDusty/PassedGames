import { configureStore } from '@reduxjs/toolkit';
import gamesSlice from './games/gamesSlice';
import { apiSlice } from './api/apiSlice';

export const store = configureStore({
	reducer: {
		games: gamesSlice,
		[apiSlice.reducerPath]: apiSlice.reducer,
	},
	middleware: (getMiddleware) => getMiddleware().concat(apiSlice.middleware),
	devTools: true,
});
