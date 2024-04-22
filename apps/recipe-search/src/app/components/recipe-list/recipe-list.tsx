import { useState } from 'react';

import { Grid, Typography } from '@mui/material';

import useEdamamFilter from '../../hooks/useEdamamFilter';
import { Option } from '../../types/models';
import RecipeItem from '../recipe-item/recipe-item';
import RecipeSearch from '../recipe-search/recipe-search';
interface SingleObj {
	query: string;
	[key: string]: string[] | string;
}
export function RecipeList() {
	// const [searchTerm, setSearchTerm] = useState<string>('kale salad');
	// const debouncedSearchTerm = useDebounce(searchTerm, 1000);
	const [page, setPage] = useState(1);
	const [selectedOption, setSelectedOption] = useState<SingleObj>({
		query: '',
	});
	const { recipes, isLoading } = useEdamamFilter(selectedOption);

	/**
	 * Handle the change event of the AutoComplete component
	 * @param value The new value of the AutoComplete component
	 * @returns void
	 */
	const handleAutoCompleteChange = (value: (string | Option)[]): void => {
		/**
		 * Reduce the array to a single object
		 * The initial value of the reduce function is an empty SingleObj
		 * This is because the user may type a single word or multiple words
		 * and we need a single object to hold the values
		 */
		const singleObj: SingleObj = value.reduce(
			/**
			 * The function takes two arguments:
			 * 1. acc: This is the SingleObj that will be returned
			 *    at the end of the reduce function. For the first iteration,
			 *    the value of acc is the initial value we passed into reduce
			 *    ({ query: '' })
			 * 2. item: This is the current element being processed in the array
			 *    (either a string or an Option)
			 */
			(acc: SingleObj, item: string | Option): SingleObj => {
				/**
				 * If the item is a string,
				 * set the "query" key in the acc object to the value of the string
				 */
				if (typeof item === 'string') {
					acc.query = item;
					/**
					 * If the item is an Option object,
					 * check if the key in the object (groupBy) exists in the acc object
					 * If it doesn't, create the key and set its value to an empty array
					 * Then, push the title from the Option object to the array
					 */
				} else {
					acc[item.groupBy] = acc[item.groupBy] || [];
					(acc[item.groupBy] as string[]).push(item.name);
				}
				/**
				 * Return the updated acc object
				 * This will be used as the initial value of acc in the next iteration
				 */
				return acc;
			},
			/**
			 * The initial value of the reduce function
			 * This is an empty SingleObj
			 */
			{} as SingleObj,
		);
		/**
		 * Set the selectedOption state to the reduced singleObj
		 * This is the object that will be used to filter the recipes
		 */
		setSelectedOption(singleObj);
	};

	const handlePageChange = (
		event: React.ChangeEvent<unknown>,
		value: number,
	) => {
		setPage(value);
	};

	return (
		<div>
			<RecipeSearch onChange={handleAutoCompleteChange} />
			{isLoading && (
				<Grid container spacing={4}>
					{Array.from({ length: 12 }, (_, index) => (
						<Grid item sm={3} key={index}>
							<RecipeItem loading={isLoading} />
						</Grid>
					))}
				</Grid>
			)}
			{!isLoading && recipes && recipes.length > 0 && (
				<Grid container spacing={4}>
					{recipes?.map((r) => (
						<Grid item sm={3} key={r.uri}>
							<RecipeItem recipe={r} />
						</Grid>
					))}
				</Grid>
			)}
			{selectedOption.query && recipes.length === 0 && (
				<Typography variant="subtitle1" component={'p'}>
					No recipes found
				</Typography>
			)}
			{!selectedOption.query && (
				<Typography variant="subtitle1" component={'p'}>
					Search for your favorite food
				</Typography>
			)}
			{/* {!isLoading && recipes && recipes.length > 0 && (
				<Pagination
					count={count}
					page={page}
					onChange={handlePageChange}
				/>
			)} */}
		</div>
	);
}

export default RecipeList;
