import React from 'react'
import Container from '@mui/material/Container'
import AppHeader from '../components/header'

interface LayoutProps {
  children: React.ReactNode
}

const AdminLayout = ({ children }: LayoutProps) => (
  <>
    <AppHeader />
    <Container maxWidth={false} sx={{ paddingTop: '20px' }}>
      {children}
    </Container>
  </>
)

export default AdminLayout
