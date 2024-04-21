import { useState } from 'react';

import { Grid } from '@mui/material';

import useDebounce from '../../hooks/useDebounce';
import useEdamamFilter from '../../hooks/useEdamamFilter';
import RecipeItem from '../recipe-item/recipe-item';
import RecipeSearch from '../recipe-search/recipe-search';

export function RecipeList() {
	// const [recipes, setRecipes] = useState<Recipe[]>([]);
	const [searchTerm, setSearchTerm] = useState<string>('kale salad');
	const debouncedSearchTerm = useDebounce(searchTerm, 1000);
	const { count, recipes, isLoading, currentPage, totalPages } =
		useEdamamFilter(debouncedSearchTerm);
	// const [isLoading, setIsLoading] = useState(false);
	// const [page, setPage] = useState(1);
	// const appId = '41ae5808';
	// const appKey = '8ce6a2480d8d3cf5a0f4f86addfb06f6';
	// const apiUrl = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${appId}&app_key=${appKey}&q=${debouncedSearchTerm}`;

	// const getApiResponse = useCallback(async <T,>(): Promise<T> => {
	// 	setIsLoading(true);
	// 	try {
	// 		const response = await fetch(apiUrl);
	// 		if (!response.ok) {
	// 			throw new Error(response.statusText);
	// 		}
	// 		return (await response.json()) as T;
	// 	} catch (error) {
	// 		throw error;
	// 	} finally {
	// 		setIsLoading(false);
	// 	}
	// }, [apiUrl]);

	// const fetchRecipes = useCallback(async () => {
	// 	const response = await getApiResponse<Hits>();
	// 	const recipe = response.hits.map((h) => h.recipe);
	// 	setRecipes(recipe);
	// }, [getApiResponse]);

	/**
	 * Handle change event on the search input
	 * @param event the event that triggered this function, with the new value in event.target.value
	 */
	const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setSearchTerm(value || 'kale salad');
	};

	/**
	 * Handle page change event from material-ui pagination component
	 * @param event the event that triggered this function, with the new page number in event.target.value
	 * @param page the new page number
	 * @returns void
	 */
	const handlePageChange = (pageNumber: number) => {
		// goToPage(pageNumber);
	};

	const renderPageNumbers = (): React.ReactElement[] => {
		const pageNumbers: React.ReactElement[] = [];
		for (let i = 1; i <= totalPages; i++) {
			pageNumbers.push(
				<button
					key={i}
					onClick={() => handlePageChange(i)}
					className={i === currentPage ? 'active' : ''}>
					{i}
				</button>,
			);
		}
		return pageNumbers;
	};

	return (
		<div>
			<RecipeSearch onChange={handleQueryChange} />
			{isLoading && <div>Loading…</div>}
			{!isLoading && recipes && recipes.length > 0 && (
				<Grid container spacing={4}>
					{recipes?.map((r) => (
						<Grid item sm={3} key={r.uri}>
							<RecipeItem recipe={r} />
						</Grid>
					))}
				</Grid>
			)}
			{recipes.length === 0 && <div>No Recipe Found</div>}
			{!isLoading && recipes && recipes.length > 0 && (
				<>
					{/* Display your recipes */}
					<button
						onClick={() => handlePageChange(currentPage - 1)}
						disabled={currentPage === 1}>
						Previous
					</button>
					{renderPageNumbers()}
					<button
						onClick={() => handlePageChange(currentPage + 1)}
						disabled={currentPage === totalPages}>
						Next
					</button>
				</>
			)}
		</div>
	);
}

export default RecipeList;
