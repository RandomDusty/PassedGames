import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, PROXY } from '../../utils/constants';

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({ baseUrl: PROXY + BASE_URL }),
	endpoints: builder => ({
		getGames: builder.query({
			query: args => {
				const { key, page, page_size, search, dates } = args;
				return {
					url: `games`,
					params: { key, page, page_size, search, dates },
				};
			},
		}),
		getSingleGameBySlug: builder.query({
			query: args => {
				const { key, slug } = args;
				return { url: `games/${slug}`, params: { key } };
			},
		}),
	}),
});

export const { useGetSingleGameBySlugQuery, useGetGamesQuery } = apiSlice;
