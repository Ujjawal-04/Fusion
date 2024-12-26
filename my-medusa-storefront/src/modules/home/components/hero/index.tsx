'use client'

import { useState, useEffect } from 'react'
import { Button, Heading } from "@medusajs/ui"
import { ArrowRight } from "lucide-react"
import AboutUs from "@modules/products/components/about-us"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const heroContent = [
  {
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=2012&ixlib=rb-4.0.3",
    title: "Step into Style",
    subtitle: "Elevate your look with our latest collection",
  },
  {
    image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&q=80&w=2071&ixlib=rb-4.0.3",
    title: "Walk with Confidence",
    subtitle: "Discover comfort in every step",
  },
  {
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3",
    title: "Comfort Meets Style",
    subtitle: "Experience the perfect blend of fashion and function",
  },
  {
    image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&q=80&w=2012&ixlib=rb-4.0.3",
    title: "Adventure Awaits",
    subtitle: "Find the perfect pair for your next journey",
  },
]

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % heroContent.length)
        setIsTransitioning(false)
      }, 500) // Half of the transition duration
    }, 5000) // Change image every 5 seconds

    return () => clearInterval(intervalId)
  }, [])

  const currentContent = heroContent[currentIndex]

  return (
    <>
    <div className="relative h-screen w-full overflow-hidden">
      {heroContent.map((content, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url('${content.image}')`,
          }}
          role="img"
          aria-label={`${content.title} background`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
      <div className="absolute inset-0 z-10 flex flex-col justify-center p-8 md:p-16">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-white space-y-6">
            <Heading
              level="h1"
              className="text-4xl sm:text-5xl md:text-7xl font-extrabold  text-transparent bg-clip-text bg-gradient-to-r from-pink-800 via-purple-700 to-indigo-700 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-800 uppercase transition-all duration-300"
              >
              Fusion
            </Heading>
            <Heading
              level="h2"
              className="text-3xl sm:text-4xl md:text-5xl font-light"
              style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.75)' }}
            >
              Your Shoe Store
            </Heading>
            <LocalizedClientLink
              href="/store"
              data-testid="nav-store-link"
            >
            <Button 
              variant="secondary" 
              size="large"
              className="text-2xl py-3 px-8 bg-white text-black hover:bg-gray-200 transition-colors duration-300 mt-8 flex items-center ease-in-out transform hover:scale-105"
            >
            
              Shop Now<ArrowRight className="ml-2 h-6 w-6" />
            </Button>
            </LocalizedClientLink> 
          </div>
          <div className={`text-white space-y-6 transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
            <div className="bg-black bg-opacity-50 p-6 rounded-lg">
              <Heading
                level="h3"
                className="text-3xl sm:text-4xl md:text-5xl font-bold"
                style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.75)' }}
              >
                {currentContent.title}
              </Heading>
              <p className="text-xl sm:text-2xl mt-4 font-light">
                {currentContent.subtitle}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <AboutUs/>
    </>
  )
}