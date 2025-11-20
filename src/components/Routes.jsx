import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Home'
import NewListing from './NewListing'
import Profile from './Profile'
import ImageSearch from './ImageSearch'
import Admin from './Admin'
import FeatureListing from './FeatureListing'
import ListingDetail from './ListingDetail'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/new" element={<NewListing />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/image-search" element={<ImageSearch />} />
      <Route path="/feature" element={<FeatureListing />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/listing/:id" element={<ListingDetail />} />
    </Routes>
  )
}
