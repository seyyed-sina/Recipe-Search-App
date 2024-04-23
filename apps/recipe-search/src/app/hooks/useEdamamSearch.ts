import { useEffect, useState } from 'react';

import querystring from 'querystring';

import { APP_ID, APP_KEY, BASE_URL } from '../constants/appConfig';
import { Hits } from '../types/models';
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

function useEdamamSearch(filter: EdamamFilter) {
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
	const { data, isLoading, error, refetch } = useFetch<Hits>(apiUrl);
	const [count, setCount] = useState(0);

	const goToNextPage = () => {
		if (!data?._links?.next?.href) return;
		apiUrl = data._links?.next?.href; // set the url to the next page;
		refetch(apiUrl);
		scrollToElement();
	};

	useEffect(() => {
		if (data) setCount(data.count);
	}, [data]);

	return {
		...data,
		recipes: data?.hits.map((h) => h.recipe),
		count,
		isLoading,
		error,
		goToNextPage,
	};
}

export default useEdamamSearch;
