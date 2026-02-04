import { useState, useEffect, useRef } from 'react'
import Stack from '../components/Stack'
import gifImage from '../data/c91baedce19a1294db806c6769232720.gif'
import awwImage from '../data/aww.jpg'
import '../assets/styles/SecondPage.css'

const SecondPage = () => {
  const [showGif, setShowGif] = useState(false)
  const [showHeartButton, setShowHeartButton] = useState(false)
  const [showLetter, setShowLetter] = useState(false)
  const [fadeOutGif, setFadeOutGif] = useState(false)
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 })
  const [showAwwPicture, setShowAwwPicture] = useState(false)
  const [showFinalText, setShowFinalText] = useState(false)
  const [noButtonCanMove, setNoButtonCanMove] = useState(false)
  const [noButtonMoveCount, setNoButtonMoveCount] = useState(0)
  const [showStopMessage, setShowStopMessage] = useState(false)
  const lastMoveTime = useRef(0)

  const handleRestart = () => {
    window.location.reload()
  }

  // Enable No button movement after 1 second
  useEffect(() => {
    if (showLetter) {
      const timer = setTimeout(() => {
        setNoButtonCanMove(true)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [showLetter])

  const cards = [
    {
      content: 'Welcome to your journey'
    },
    {
      content: 'Discover inner peace'
    },
    {
      content: 'Embrace the present moment'
    },
    {
      content: 'Find your balance'
    },
    {
      content: 'Trust the process'
    },
    {
      content: 'You are exactly where you need to be'
    }
  ]

  const handleComplete = () => {
    setShowGif(true)
  }

  useEffect(() => {
    if (showGif) {
      const timer = setTimeout(() => {
        setShowHeartButton(true)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [showGif])

  const handleHeartClick = () => {
    setFadeOutGif(true)
    setTimeout(() => {
      setShowLetter(true)
    }, 800)
  }

  const handleYes = () => {
    console.log('They said YES! 💕')
    setShowAwwPicture(true)
    // After 3 seconds, transition to final text
    setTimeout(() => {
      setShowFinalText(true)
    }, 2500)
  }

  const handleNo = () => {
    console.log('They said no 💔')
    // This should never actually fire because the button moves away!
  }

  const handleNoButtonMouseMove = (e) => {
    // Don't move the button until 1 second has passed
    if (!noButtonCanMove) return

    const button = e.currentTarget
    const rect = button.getBoundingClientRect()
    const buttonCenterX = rect.left + rect.width / 2
    const buttonCenterY = rect.top + rect.height / 2

    const distance = Math.sqrt(
      Math.pow(e.clientX - buttonCenterX, 2) +
      Math.pow(e.clientY - buttonCenterY, 2)
    )

    // If mouse is within 100px of button center, move it
    if (distance < 100) {
      // Only count once per move (cooldown of 500ms)
      const now = Date.now()
      if (now - lastMoveTime.current < 500) {
        return
      }
      lastMoveTime.current = now

      const newCount = noButtonMoveCount + 1

      // Check if they've tried 7 times
      if (newCount >= 7) {
        setShowStopMessage(true)
        setNoButtonMoveCount(0) // Reset counter
        setTimeout(() => {
          setShowStopMessage(false)
          setNoButtonPosition({ x: 0, y: 0 }) // Reset button position
        }, 3000)
        return
      }

      setNoButtonMoveCount(newCount)

      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight
      const buttonWidth = rect.width
      const buttonHeight = rect.height

      // Generate random position ensuring button stays in viewport
      const newX = Math.random() * (viewportWidth - buttonWidth - 100) + 50
      const newY = Math.random() * (viewportHeight - buttonHeight - 100) + 50

      setNoButtonPosition({ x: newX, y: newY })
    }
  }

  if (showFinalText) {
    return (
      <div className="final-text-container">
        <button className="restart-button" onClick={handleRestart}>
          <span className="restart-arrow">←</span>
          <span className="restart-text">Restart</span>
        </button>
        <div className="final-message">
          <h1 className="final-text">
            I knew you'd say yes! ❤️
          </h1>
          <p className="final-subtext">
            You've made me the happiest person in the world
          </p>
        </div>
      </div>
    )
  }

  if (showAwwPicture) {
    return (
      <div className="aww-container">
        <button className="restart-button" onClick={handleRestart}>
          <span className="restart-arrow">←</span>
          <span className="restart-text">Restart</span>
        </button>
        <div className="letter-background">
          <div className="letter">
            <div className="letter-header">
              <div className="heart-decoration">❤</div>
            </div>
            <div className="letter-content">
              <h1 className="valentine-question">Will You Be My Valentine?</h1>
            </div>
          </div>
        </div>
        <div className="aww-picture-wrapper">
          <img src={awwImage} alt="Aww" className="aww-picture" />
        </div>
      </div>
    )
  }

  if (showStopMessage) {
    return (
      <div className="stop-message-container">
        <h1 className="stop-message-text">Stop trying to click no</h1>
      </div>
    )
  }

  if (showLetter) {
    return (
      <div className="letter-container">
        <div className="letter">
          <div className="letter-header">
            <div className="heart-decoration">❤</div>
          </div>
          <div className="letter-content">
            <h1 className="valentine-question">Will You Be My Valentine?</h1>
          </div>
          <div className="letter-buttons">
            <button className="answer-button yes-button" onClick={handleYes}>
              Yes
            </button>
            <button
              className="answer-button no-button"
              onClick={handleNo}
              onMouseMove={handleNoButtonMouseMove}
              style={{
                position: noButtonPosition.x !== 0 ? 'fixed' : 'relative',
                left: noButtonPosition.x !== 0 ? `${noButtonPosition.x}px` : 'auto',
                top: noButtonPosition.y !== 0 ? `${noButtonPosition.y}px` : 'auto',
                transition: 'all 0.3s ease-out'
              }}
            >
              No
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (showGif) {
    return (
      <div className="gif-container">
        <img
          src={gifImage}
          alt="Animation"
          className={`gif-image ${fadeOutGif ? 'fade-out' : ''}`}
        />
        {showHeartButton && !fadeOutGif && (
          <button className="heart-button" onClick={handleHeartClick}>
            <span className="heart-text">OPEN</span>
          </button>
        )}
      </div>
    )
  }

  return <Stack cards={cards} onComplete={handleComplete} />
}

export default SecondPage
