import React from 'react'
import Box from '@mui/material/Box'

import Menu from './menu'
import SearchIcon from '@mui/icons-material/Search'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

interface IMenuProps {
  children: JSX.Element | JSX.Element[]
}

const MainNav = () => {
  const theme = useTheme()
  const isSmall: boolean = useMediaQuery(theme.breakpoints.down('md'))

  const MenuWrapper = ({ children }: IMenuProps): JSX.Element => {
    return (
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Меню</Typography>
        </AccordionSummary>
        <AccordionDetails>{children}</AccordionDetails>
      </Accordion>
    )
  }

  return (
    <Box marginTop={5}>
      <FormControl fullWidth sx={{ mb: 1 }}>
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
      {isSmall && (
        <MenuWrapper>
          <Menu />
        </MenuWrapper>
      )}
      {!isSmall && <Menu />}
    </Box>
  )
}

export default MainNav
