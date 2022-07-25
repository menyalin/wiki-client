import React from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import AppMainNav from '../components/mainNav'
import AppHeader from '../components/header'

interface LayoutProps {
  children: React.ReactNode
}

const MainLayout = ({ children }: LayoutProps) => (
  <>
    <AppHeader />
    <Container>
      <Box
        display="grid"
        gridTemplateColumns={{ xs: '1fr', md: '1fr 3fr' }}
        gap={2}
      >
        <AppMainNav />
        {children}
      </Box>
    </Container>
  </>
)

export { MainLayout }
