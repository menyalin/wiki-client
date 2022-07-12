import styled from 'styled-components'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import AppMainNav from '../components/mainNav'
import AppHeader from '../components/header'

interface LayoutProps {
  children: React.ReactNode
}

const StyledContainer = styled(Container)`
  background-color: blanchedalmond;
`

const MainLayout = ({ children }: LayoutProps) => (
  <>
    <AppHeader />
    <StyledContainer>
      <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 3fr' }}>
        <AppMainNav />
        {children}
      </Box>
    </StyledContainer>
  </>
)

export { MainLayout }
