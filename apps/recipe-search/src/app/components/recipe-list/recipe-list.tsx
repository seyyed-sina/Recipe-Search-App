import { useCallback, useEffect, useState } from 'react'
import { Box, Grid, TextField } from '@mui/material'
import fetch from 'cross-fetch'
import { Hits, Recipe } from '../../types/models'
import RecipeItem from '../recipe-item/recipe-item'

export function RecipeList() {
  const [recipes, setRecipes] = useState<Recipe[]>()

  const getApiResponse = async <T,>(): Promise<T> => {
    const appId = '41ae5808'
    const appKey = '8ce6a2480d8d3cf5a0f4f86addfb06f6'
    const q = 'kale salad'

    const api_url = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${appId}&app_key=${appKey}&q=${q}`

    const response = await fetch(api_url)
    const data = (await response.json()) as Promise<T>

    return data
  }

  const fetchRecipes = useCallback(async () => {
    const response = await getApiResponse<Hits>()
    const recipe = response.hits.map((h) => h.recipe)
    setRecipes(recipe)
  }, [])

  useEffect(() => {
    fetchRecipes()
  }, [fetchRecipes])

  return (
    <div>
      <Box sx={{ display: 'flex', alignItems: 'center', pb: 3 }}>
        <TextField
          id="input-with-sx"
          label="Search..."
          variant="outlined"
          onChange={(e) => console.log(e.target.value)}
        />
      </Box>
      <Grid container spacing={4}>
        {recipes?.map((r) => (
          <Grid item sm={3} key={r.uri}>
            <RecipeItem recipe={r} />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default RecipeList
