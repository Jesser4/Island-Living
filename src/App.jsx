import React, { useState, useEffect } from 'react'
import BlurText from './components/BlurText'
import LightRays from './components/LightRays'
import SecondPage from './pages/SecondPage'
import { affirmations } from './data/affirmations'

function App() {
  const [affirmation, setAffirmation] = useState('')
  const [animationComplete, setAnimationComplete] = useState(false)
  const [panUp, setPanUp] = useState(false)
  const [showFlash, setShowFlash] = useState(false)
  const [showBlankPage, setShowBlankPage] = useState(false)

  useEffect(() => {
    const randomAffirmation = affirmations[Math.floor(Math.random() * affirmations.length)]
    setAffirmation(randomAffirmation)
  }, [])

  useEffect(() => {
    if (animationComplete) {
      const timer = setTimeout(() => {
        setPanUp(true)
        // Flash appears midway through pan animation
        setTimeout(() => {
          setShowFlash(true)
        }, 1000)
        // Show blank page after pan and flash complete
        setTimeout(() => {
          setShowBlankPage(true)
        }, 2500)
      }, 2500)

      return () => clearTimeout(timer)
    }
  }, [animationComplete])

  const handleAnimationComplete = () => {
    setAnimationComplete(true)
  }

  if (showBlankPage) {
    return <SecondPage />
  }

  return (
    <div className={`app ${panUp ? 'pan-up' : ''}`}>
      <div className="light-rays-background">
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffd970"
          raysSpeed={0.7}
          lightSpread={1.8}
          rayLength={1.2}
          pulsating={false}
          fadeDistance={1.5}
          saturation={0.6}
          followMouse
          mouseInfluence={0.05}
          noiseAmount={0}
          distortion={0}
        />
      </div>

      <div className="content">
        <BlurText
          text={affirmation}
          animateBy="letters"
          delay={100}
          className="blur-text"
          onAnimationComplete={handleAnimationComplete}
        />
      </div>

      {showFlash && <div className="flash-overlay"></div>}
    </div>
  )
}

export default App
