import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, PROXY } from '../../utils/constants';

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({ baseUrl: PROXY + BASE_URL }),
	endpoints: builder => ({
		getGames: builder.query({
			query: args => {
				const {
					key,
					page,
					page_size,
					dates,
					ordering,
					parent_platforms,
					platforms,
				} = args;
				return {
					url: `games`,
					params: {
						key,
						page,
						page_size,
						dates,
						ordering,
						parent_platforms,
						platforms,
					},
				};
			},
		}),
		getSingleGameBySlug: builder.query({
			query: args => {
				const { key, slug } = args;
				console.log('asd');
				return { url: `games/${slug}`, params: { key } };
			},
		}),
	}),
});

export const { useGetSingleGameBySlugQuery, useGetGamesQuery } = apiSlice;
