import { Grid2 } from '@mui/material'
import React, { useState } from 'react'
import AdminSideBar from './AdminSideBar'

function Categories() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState([]);
  return (
    <Grid2 container>
      <AdminSideBar></AdminSideBar>
      <Grid2  size={{ xs: 4, md: 9, lg: 10 }}></Grid2>
    </Grid2>
  )
}

export default Categories