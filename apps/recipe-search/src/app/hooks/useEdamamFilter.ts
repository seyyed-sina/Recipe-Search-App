import { useEffect, useState } from 'react';

import { Hits, Recipe } from '../types/models';
import useFetch from './useFetch';

function useEdamamFilter(query: string, pageSize = 10) {
	const [recipes, setRecipes] = useState<Recipe[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	// const [nextUrl, setNextUrl] = useState(null);
	const [totalPages, setTotalPages] = useState(0);
	const BASE_URL = process.env.NX_BASE_URL;
	const APP_ID = process.env.NX_EDAMAM_APP_ID;
	const APP_KEY = process.env.NX_EDAMAM_APP_KEY;
	const API_URL = `${BASE_URL}?type=public&app_id=${APP_ID}&app_key=${APP_KEY}&q=${query}&from=${
		(currentPage - 1) * pageSize
	}&to=${currentPage * pageSize}`;
	console.log('API_URL: ', API_URL);

	const { data, isLoading, error, refetch } = useFetch<Hits>(API_URL);

	// const goToPage = (pageNumber: number) => {
	// 	if (pageNumber > 0 && pageNumber <= totalPages) {
	// 		setCurrentPage(pageNumber);
	// 	}
	// };

	// const loadMore = () => {
	// 	if (nextUrl) {
	// 		refetch(nextUrl);
	// 	}
	// };

	useEffect(() => {
		if (data) {
			const recipe = data.hits.map((h) => h.recipe);
			setRecipes(recipe);
			// Handle potential absence of `totalHits`
			const nextPageUrl = data._links?.next?.href;
			// setNextUrl(nextPageUrl);
			setTotalPages(nextPageUrl ? Math.ceil(data.count / pageSize) : 1); // Use count if no totalHits and nextPage
		}
	}, [data, query, pageSize]);

	return {
		...data,
		recipes,
		isLoading,
		error,
		currentPage,
		totalPages,
		// goToPage,
	};
}

export default useEdamamFilter;
