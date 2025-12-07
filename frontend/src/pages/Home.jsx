import React from 'react'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import FeaturesSection from '../components/FeaturesSection'
import SupportedLanguages from '../components/SupportedLanguages'
import RevolutionizingSection from '../components/RevolutionizingSection'
import ContactSection from '../components/ContactSection'

const Home = () => {
  return (
    <Layout>
      <Hero/>
      <FeaturesSection/>
      <SupportedLanguages/>
      <RevolutionizingSection/>
      <ContactSection/>
    </Layout>
  )
}

export default Home
