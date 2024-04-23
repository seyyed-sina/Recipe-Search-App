import { FC, memo } from 'react';

import { Paper, Typography } from '@mui/material';

import RecipeList from '../components/recipe-list/recipe-list';

const Home: FC = memo(() => {
	return (
		<Paper elevation={5} sx={{ m: 5, p: 5 }}>
			<Typography variant="h2" sx={{ pb: 2 }}>
				Hyphen Candidate Project
			</Typography>
			<RecipeList />
		</Paper>
	);
});

Home.displayName = 'Home';
export default Home;
