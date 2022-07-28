import React from 'react'
import Head from 'next/head'
import Groups from '../../components/admin-groups'
import styled from 'styled-components'
import Articles from '../../components/admin-articles'
import AdminLayout from '../../layouts/admin.layout'

const Wrapper = styled.main({
  display: 'grid',
  gridTemplateColumns: '1fr 2fr',
  margin: '30px',
  gap: '30px',
})

const Admin = () => (
  <Wrapper>
    <Groups />
    <Articles />
  </Wrapper>
)

Admin.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <>
      <Head>
        <title>Админка</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AdminLayout>{page}</AdminLayout>
    </>
  )
}

export default Admin
