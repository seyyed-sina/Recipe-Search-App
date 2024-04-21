import { FC, memo } from 'react'

import { Box, TextField } from '@mui/material'

interface Props {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const RecipeSearch: FC<Props> = memo(({ onChange }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', pb: 3 }}>
      <TextField label="Search..." variant="outlined" onChange={onChange} />
    </Box>
  )
})

RecipeSearch.displayName = 'RecipeSearch'
export default RecipeSearch
