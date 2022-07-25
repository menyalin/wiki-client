import React from 'react'
import Head from 'next/head'
import Groups from '../../components/admin-groups'
import styled from 'styled-components'

const Wrapper = styled.main({
  display: 'grid',
  gridTemplateColumns: '1fr 2fr',
  margin: '30px',
  gap: '15px',
})

const Admin = () => (
  <React.Fragment>
    <Head>
      <title>Админка</title>
    </Head>
    <Wrapper>
      <Groups />
    </Wrapper>
  </React.Fragment>
)

export default Admin
