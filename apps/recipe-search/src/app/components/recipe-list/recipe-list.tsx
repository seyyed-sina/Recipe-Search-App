import { useState } from 'react';

import { ChevronRight } from '@mui/icons-material';
import { Button, Grid, Typography } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

import useEdamamSearch from '../../hooks/useEdamamSearch';
import { Option } from '../../types/models';
import RecipeItem from '../recipe-item/recipe-item';
import RecipeSearch from '../recipe-search/recipe-search';
interface QueryParam {
	query: string;
	[key: string]: string[] | string;
}
export function RecipeList() {
	const [searchParams, setSearchParams] = useSearchParams();
	const [selectedOption, setSelectedOption] = useState<QueryParam>({
		query: searchParams.get('query') || '',
	});

	const { count, from, to, recipes, isLoading, _links, goToNextPage } =
		useEdamamSearch(selectedOption);

	/**
	 * Handle the change event of the AutoComplete component
	 * @param value The new value of the AutoComplete component
	 * @returns void
	 */
	const handleAutoCompleteChange = (value: (string | Option)[]): void => {
		/**
		 * Reduce the array to a single object
		 * The initial value of the reduce function is an empty QueryParam
		 * This is because the user may type a single word or multiple words
		 * and we need a single object to hold the values
		 */
		const queryParam: QueryParam = value.reduce(
			/**
			 * The function takes two arguments:
			 * 1. acc: This is the QueryParam that will be returned
			 *    at the end of the reduce function. For the first iteration,
			 *    the value of acc is the initial value we passed into reduce
			 *    ({ query: '' })
			 * 2. item: This is the current element being processed in the array
			 *    (either a string or an Option)
			 */
			(acc: QueryParam, item: string | Option): QueryParam => {
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
			 * This is an empty QueryParam
			 */
			{} as QueryParam,
		);
		setSelectedOption(queryParam);
		setSearchParams(queryParam);
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
			{!isLoading && recipes && recipes?.length > 0 && (
				<Grid container spacing={4}>
					{recipes?.map((r) => (
						<Grid item sm={3} key={r.uri}>
							<RecipeItem recipe={r} />
						</Grid>
					))}
				</Grid>
			)}
			{!isLoading && recipes?.length === 0 && (
				<Typography variant="subtitle1" component={'p'}>
					No recipes found
				</Typography>
			)}
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: 16,
					marginTop: 32,
				}}>
				{count > 0 && (
					<Typography
						color="GrayText"
						component={'div'}
						sx={{
							display: 'flex',
							alignItems: 'center',
							gap: 0.5,
							flexGrow: 1,
						}}>
						Showing
						<Typography variant="subtitle2">
							{from ?? '---'}
						</Typography>
						to
						<Typography variant="subtitle2">
							{to ?? '---'}
						</Typography>
						of <Typography variant="subtitle2">{count}</Typography>
						food results
					</Typography>
				)}
				{!isLoading && _links?.next && (
					<Button
						variant="contained"
						onClick={goToNextPage}
						endIcon={<ChevronRight />}>
						Next Page
					</Button>
				)}
			</div>
		</div>
	);
}

export default RecipeList;
