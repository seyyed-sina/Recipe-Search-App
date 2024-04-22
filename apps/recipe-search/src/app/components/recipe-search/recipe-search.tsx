import { FC, SyntheticEvent, memo, useMemo } from 'react';

import { Restaurant, Search } from '@mui/icons-material';
import {
	Autocomplete,
	AutocompleteRenderGetTagProps,
	Chip,
	TextField,
} from '@mui/material';

import { cuisineType, diet, dishType, health, mealType } from '../../data';
import { Option } from '../../types/models';

interface Props {
	onChange: (value: (string | Option)[]) => void;
}

const RecipeSearch: FC<Props> = memo(({ onChange }) => {
	const defaultOptions = useMemo(() => {
		return [
			{ name: 'Cuisine Type', group: 'cuisineType', list: cuisineType },
			{ name: 'Diets Type', group: 'diet', list: diet },
			{ name: 'Dish Type', group: 'dishType', list: dishType },
			{ name: 'Health Type', group: 'health', list: health },
			{ name: 'Meal Type', group: 'mealType', list: mealType },
		]
			.map((option) => {
				const allList = option.list.map((item) => {
					const title = item
						.replace(/-/g, ' ')
						.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase());
					return {
						title,
						name: item,
						groupBy: option.group,
						groupTitle: option.name,
					} as Option;
				});
				return allList.sort((a, b) => a.title.localeCompare(b.title));
			})
			.flatMap((i) => i);
	}, []);

	const renderTag = (
		option: string | Option,
		getTagProps: AutocompleteRenderGetTagProps,
		index: number,
	) => {
		if (typeof option === 'string') {
			return (
				<Chip
					{...getTagProps({ index })}
					icon={<Search />}
					label={option}
				/>
			);
		}
		return (
			<Chip
				{...getTagProps({ index })}
				key={index}
				icon={<Restaurant />}
				label={option?.title
					.replace(/-/g, ' ')
					.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())}
			/>
		);
	};

	const handleChange = (
		_: SyntheticEvent<Element, Event>,
		value: (string | Option)[],
	) => {
		onChange?.(value);
	};

	return (
		<Autocomplete
			multiple
			options={defaultOptions}
			groupBy={(option) => option.groupTitle}
			isOptionEqualToValue={(option, value) => {
				return option.title === value.title;
			}}
			getOptionLabel={(option) => option.title}
			fullWidth
			filterSelectedOptions
			freeSolo
			sx={{
				mb: 2,
			}}
			onChange={handleChange}
			renderTags={(value, getTagProps) => {
				return value.map((option: string | Option, index) =>
					renderTag(option, getTagProps, index),
				);
			}}
			renderInput={(params) => (
				<TextField
					{...params}
					variant="filled"
					label="Search Recipes"
				/>
			)}
		/>
	);
});

RecipeSearch.displayName = 'RecipeSearch';
export default RecipeSearch;
