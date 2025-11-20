import React from 'react'
import Hero from './Hero'
import ParallaxShowcase from './ParallaxShowcase'
import Categories from './Categories'
import NewListings from './NewListings'
import SearchFilters from './SearchFilters'
import CTA from './CTA'

export default function Home() {
  return (
    <>
      <Hero />
      <SearchFilters />
      <NewListings />
      <Categories />
      <ParallaxShowcase />
      <CTA />
    </>
  )
}
