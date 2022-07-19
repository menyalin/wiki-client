import React from 'react'
import Box from '@mui/material/Box'

import Menu from './menu'
import SearchIcon from '@mui/icons-material/Search'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'

const MainNav = () => {
  return (
    <Box marginTop={5}>
      <FormControl fullWidth sx={{ m: 1 }}>
        <InputLabel htmlFor="search-input">Поиск</InputLabel>
        <OutlinedInput
          size="small"
          id="search-input"
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          label="Поиск"
        />
      </FormControl>
      <Menu />
    </Box>
  )
}

export default MainNav
