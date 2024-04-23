import { FC, SyntheticEvent, memo, useMemo } from 'react';

import styled from '@emotion/styled';
import { Restaurant, Search } from '@mui/icons-material';
import {
	Autocomplete,
	AutocompleteRenderGetTagProps,
	Chip,
	TextField,
	lighten,
} from '@mui/material';

import { cuisineType, diet, dishType, health, mealType } from '../../data';
import { Option } from '../../types/models';

const GroupHeader = styled('div')({
	position: 'sticky',
	display: 'flex',
	alignItems: 'center',
	// top: '-8px',
	padding: '8px 16px',
	color: '#1976d2',
	backgroundColor: lighten('#1976d2', 0.85),
});

const GroupItem = styled('ul')({
	paddingLeft: 16,
	marginBottom: 8,
});

interface Props {
	onChange: (value: (string | Option)[]) => void;
}

const RecipeSearch: FC<Props> = memo(({ onChange }) => {
	const defaultOptions = useMemo(() => {
		return [
			{ name: 'Cuisine Type', type: 'cuisineType', list: cuisineType },
			{ name: 'Diets Type', type: 'diet', list: diet },
			{ name: 'Dish Type', type: 'dishType', list: dishType },
			{ name: 'Health Type', type: 'health', list: health },
			{ name: 'Meal Type', type: 'mealType', list: mealType },
		]
			.map((option) => {
				const allList = option.list.map((item) => {
					const title = item
						.replace(/-/g, ' ')
						.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase());
					return {
						title,
						name: item,
						groupBy: option.type,
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
					icon={<Search fontSize="small" />}
					label={option}
				/>
			);
		}
		return (
			<Chip
				{...getTagProps({ index })}
				key={index}
				icon={<Restaurant fontSize="small" />}
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
			fullWidth
			freeSolo
			filterSelectedOptions
			sx={{
				mb: 2,
				'.MuiFilledInput-root': {
					pt: 3,
					pb: 0.5,
				},
			}}
			options={defaultOptions}
			groupBy={(option) => option.groupTitle}
			isOptionEqualToValue={(option, value) => {
				return option.title === value.title;
			}}
			getOptionLabel={(option) => option.title}
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
					placeholder="Type to search for your favorite food"
					InputLabelProps={{
						sx: {
							transform: 'translate(16px, 21px) scale(1)',
							'&.MuiInputLabel-shrink': {
								transform: 'translate(12px, 7px) scale(0.75)',
							},
						},
					}}
				/>
			)}
			renderGroup={(params) => (
				<li key={params.key}>
					<GroupHeader>
						<Restaurant fontSize="small" sx={{ mr: 1 }} />
						{params.group}
					</GroupHeader>
					<GroupItem>{params.children}</GroupItem>
				</li>
			)}
		/>
	);
});

RecipeSearch.displayName = 'RecipeSearch';
export default RecipeSearch;
