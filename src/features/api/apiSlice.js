import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, PROXY } from '../../utils/constants';

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({ baseUrl: PROXY + BASE_URL }),
	endpoints: builder => ({
		getSingleGameBySlug: builder.query({
			query: ({ key, slug }) => `games/${slug}?key=${key}`,
		}),
	}),
});

export const { useGetSingleGameBySlugQuery } = apiSlice;
