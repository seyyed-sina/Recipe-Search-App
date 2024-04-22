import querystring from 'querystring';

import { useEffect, useState } from 'react';

import { Hits, Recipe } from '../types/models';
import useFetch from './useFetch';

function useEdamamFilter(
	filter: {
		query: string;
		diet?: string[];
		health?: string[];
		dishType?: string[];
		cuisineType?: string[];
		mealType?: string[];
	},
	pageSize = 10,
) {
	const [recipes, setRecipes] = useState<Recipe[]>([]);
	const BASE_URL = process.env.NX_BASE_URL;
	const APP_ID = process.env.NX_EDAMAM_APP_ID;
	const APP_KEY = process.env.NX_EDAMAM_APP_KEY;
	const queryParamsObj = {
		app_id: APP_ID,
		app_key: APP_KEY,
		type: 'public',
		q: filter?.query,
		...(filter?.diet && { diet: filter.diet }),
		...(filter?.health && { health: filter.health }),
		...(filter?.dishType && { dishType: filter.dishType }),
		...(filter?.cuisineType && { cuisineType: filter.cuisineType }),
		...(filter?.mealType && { mealType: filter.mealType }),
	};
	const API_URL = `${BASE_URL}?${
		querystring.stringify(queryParamsObj) as string
	}`;

	const { data, isLoading, error } = useFetch<Hits>(API_URL);

	useEffect(() => {
		if (data) {
			setRecipes(data.hits.map((h) => h.recipe));
		}
	}, [data, pageSize]);

	return {
		...data,
		recipes,
		isLoading,
		error,
	};
}

export default useEdamamFilter;
