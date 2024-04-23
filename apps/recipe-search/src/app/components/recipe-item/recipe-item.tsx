import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import {
	Avatar,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	CardMedia,
	IconButton,
	Skeleton,
	Typography,
	lighten,
} from '@mui/material';
import { useSearchParams } from 'react-router-dom';

import { Recipe } from '../../types/models';
import { Highlighter } from '../ui/Highlighter';

export interface RecipeItemProps {
	recipe?: Recipe;
	loading?: boolean;
}

export function RecipeItem(props: RecipeItemProps) {
	const { recipe, loading } = props;
	const [searchParams] = useSearchParams();
	const queryParam = searchParams.get('query') || '';
	const cuisineParam = searchParams.get('cuisineType') || '';
	const dishParam = searchParams.get('dishType') || '';
	const mealParam = searchParams.get('mealType') || '';
	const healthParam = searchParams.get('healthType') || '';
	const dietParam = searchParams.get('dietType') || '';
	const highlighterSearch = `${queryParam} ${cuisineParam} ${dishParam} ${mealParam} ${healthParam} ${dietParam}`;

	return (
		<Card
			// TODO: Remove overflow, add height to make them all fit in size
			// sx={{ minHeight: 500, maxHeight: 500, overflow: 'auto' }}
			sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
			<CardHeader
				sx={{
					'.MuiCardHeader-content': {
						minWidth: '1px',
						display: 'flex',
						flexDirection: 'column',
					},
				}}
				avatar={
					loading ? (
						<Skeleton
							animation="wave"
							variant="circular"
							width={40}
							height={40}
						/>
					) : (
						<Avatar aria-label="recipe" sx={{ bgcolor: '#063B40' }}>
							{recipe?.label[0]}
						</Avatar>
					)
				}
				title={
					loading ? (
						<Skeleton
							animation="wave"
							height={10}
							width="80%"
							style={{ marginBottom: 6 }}
						/>
					) : (
						<Typography
							component={'h3'}
							variant="body2"
							title={recipe?.label}
							sx={{
								overflow: 'hidden',
								textOverflow: 'ellipsis',
								whiteSpace: 'nowrap',
							}}>
							<Highlighter
								text={recipe?.label}
								search={highlighterSearch}
							/>
						</Typography>
					)
				}
				subheader={
					loading ? (
						<Skeleton animation="wave" height={10} width="40%" />
					) : (
						recipe?.source
					)
				}
			/>
			{loading ? (
				<Skeleton
					sx={{ height: 190, pt: 25 }}
					animation="wave"
					variant="rectangular"
				/>
			) : (
				<CardMedia
					sx={{
						height: 0,
						pt: 25,
						backgroundColor: lighten('#00695c', 0.5),
					}}
					image={recipe?.image}
					title={recipe?.label}
				/>
			)}
			<CardContent
				// TODO: make this ellipsis
				// sx={{ minHeight: 150, maxHeight: 150, overflow: 'auto' }}
				sx={{ flexGrow: 1, minWidth: 1 }}>
				{loading ? (
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							gap: 6,
						}}>
						<Skeleton animation="wave" height={10} />
						<Skeleton animation="wave" height={10} width="80%" />
						<Skeleton animation="wave" height={10} width="30%" />
						<Skeleton animation="wave" height={10} width="80%" />
						<Skeleton animation="wave" height={10} width="30%" />
					</div>
				) : (
					<Typography
						variant="body2"
						color="textSecondary"
						sx={{
							whiteSpace: 'pre-wrap',
						}}
						component="p">
						<Highlighter
							text={recipe?.ingredientLines
								.map((igr) => `${igr};`)
								.join('\n')}
							search={highlighterSearch}
						/>
					</Typography>
				)}
			</CardContent>
			<CardActions disableSpacing>
				<IconButton aria-label="add to favorites">
					<FavoriteIcon />
				</IconButton>
				<IconButton aria-label="share">
					<ShareIcon />
				</IconButton>
			</CardActions>
		</Card>
	);
}

export default RecipeItem;
