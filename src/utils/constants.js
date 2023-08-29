export const sidebarList = [
	[
		{ title: 'Top' },
		{
			title: 'Best of the year',
			paramsForApi: {
				dates: `${new Date().getFullYear()}-01-01,${new Date().getFullYear()}-12-31`,
			},
			icon: 'svg-Best_Of_The_Year',
		},
		{
			title: 'Popular in 2022',
			paramsForApi: {
				dates: `2022-01-01,2022-12-31`,
			},
			icon: 'svg-Popular',
		},
	],
	[
		{ title: 'Platform' },
		{
			title: 'PC',
			paramsForApi: { parent_platforms: '1' },
			icon: 'svg-windows',
		},
		{ title: 'PS', paramsForApi: { parent_platforms: '2' }, icon: 'svg-ps' },
		{
			title: 'Xbox',
			paramsForApi: { parent_platforms: '3' },
			icon: 'svg-xbox',
		},
		{
			title: 'Nintendo Switch',
			paramsForApi: { platforms: '7' },
			icon: 'svg-nintendo',
		},
		{ title: 'iOS', paramsForApi: { parent_platforms: '4' }, icon: 'svg-ios' },
		{
			title: 'Android',
			paramsForApi: { parent_platforms: '8' },
			icon: 'svg-android',
		},
	],
	[
		{ title: 'Browse' },
		{
			title: 'Genres',
			urlPath: 'genres',
			paramsForApi: {},
			icon: 'svg-genres',
		},
		{
			title: 'Tags',
			urlPath: 'tags',
			paramsForApi: {},
			icon: 'svg-tags',
		},
		{
			title: 'Publishers',
			urlPath: 'publishers',
			paramsForApi: {},
			icon: 'svg-publishers',
		},
		{
			title: 'Platforms',
			urlPath: 'platforms',
			paramsForApi: {},
			icon: 'svg-platforms',
		},
		{
			title: 'Stores',
			urlPath: 'stores',
			paramsForApi: { parent_platforms: '4' },
			icon: 'svg-stores',
		},
		{
			title: 'Creators',
			urlPath: 'creators',
			paramsForApi: { parent_platforms: '8' },
			icon: 'svg-creators',
		},
		{
			title: 'Developers',
			urlPath: 'developers',
			paramsForApi: { parent_platforms: '8' },
			icon: 'svg-developers',
		},
	],
];

export const orderDropdownList = [
	{ title: 'Popularity', params: { ordering: '' } },
	{ title: 'Release date', params: { ordering: '-released' } },
	{ title: 'Metacritic', params: { ordering: '-metacritic' } },
];

// export const PROXY = 'https://cors-ksi6.onrender.com/';

export const PROXY = '';

export const BASE_URL = 'https://api.rawg.io/api/';

export const API_KEY = 'e187d2fb04cf4628862e12b299529d40';
