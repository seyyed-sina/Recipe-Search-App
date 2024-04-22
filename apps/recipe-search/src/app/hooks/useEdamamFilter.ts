import { useEffect, useState } from 'react';

import querystring from 'querystring';

import { APP_ID, APP_KEY, BASE_URL } from '../constants/appConfig';
import { Hits, Recipe } from '../types/models';
import { scrollToElement } from '../util';
import useFetch from './useFetch';

interface EdamamFilter {
	query: string;
	diet?: string[];
	health?: string[];
	dishType?: string[];
	mealType?: string[];
	cuisineType?: string[];
}

function useEdamamFilter(filter: EdamamFilter) {
	const queryParamsObj = {
		app_id: APP_ID,
		app_key: APP_KEY,
		type: 'public',
		q: filter?.query || 'kale salad',
		...(filter?.diet && { diet: filter.diet }),
		...(filter?.health && { health: filter.health }),
		...(filter?.dishType && { dishType: filter.dishType }),
		...(filter?.cuisineType && {
			cuisineType: filter.cuisineType,
		}),
		...(filter?.mealType && { mealType: filter.mealType }),
	};
	let apiUrl = `${BASE_URL}?${
		querystring.stringify(queryParamsObj) as string
	} `;

	const [recipes, setRecipes] = useState<Recipe[]>([]);
	const { data, isLoading, error, refetch } = useFetch<Hits>(apiUrl);

	const goToNextPage = () => {
		if (!data?._links?.next?.href) return;
		apiUrl = data._links?.next?.href; // set the url to the next page;
		refetch(data._links?.next?.href);
		scrollToElement();
	};

	useEffect(() => {
		if (data) {
			setRecipes(data.hits.map((h) => h.recipe));
		}
	}, [data]);

	return {
		...data,
		recipes,
		isLoading,
		error,
		goToNextPage,
	};
}

export default useEdamamFilter;
