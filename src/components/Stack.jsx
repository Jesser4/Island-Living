import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import './Stack.css'

const Stack = ({ cards = [], onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isInitialMount, setIsInitialMount] = useState(true)

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setIsInitialMount(false)
      setDirection(1)
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setIsInitialMount(false)
      setDirection(-1)
      setCurrentIndex(currentIndex - 1)
    }
  }

  const isLastCard = currentIndex === cards.length - 1
  const visibleCards = cards.slice(currentIndex, currentIndex + 3)

  return (
    <div className="stack-container">
      <div className="stack-wrapper">
        <AnimatePresence initial={true} custom={direction}>
          {visibleCards.map((card, index) => {
            const actualIndex = currentIndex + index
            const zIndex = visibleCards.length - index
            const scale = 1 - index * 0.05
            const yOffset = index * 20
            const opacity = 1 - index * 0.3

            // Determine entrance direction based on card index
            const getInitialPosition = () => {
              const direction = actualIndex % 4
              const distance = 1000
              switch (direction) {
                case 0: // From left
                  return { x: -distance, y: yOffset, rotate: -15 }
                case 1: // From right
                  return { x: distance, y: yOffset, rotate: 15 }
                case 2: // From top
                  return { x: 0, y: yOffset - distance, rotate: -10 }
                case 3: // From bottom
                  return { x: 0, y: yOffset + distance, rotate: 10 }
                default:
                  return { x: 0, y: yOffset - 50, rotate: 0 }
              }
            }

            return (
              <motion.div
                key={actualIndex}
                className="stack-card"
                style={{
                  zIndex,
                }}
                initial={
                  isInitialMount
                    ? {
                        ...getInitialPosition(),
                        scale: scale - 0.1,
                        opacity: 0,
                      }
                    : {
                        x: 0,
                        y: yOffset,
                        rotate: 0,
                        scale,
                        opacity,
                      }
                }
                animate={{
                  x: 0,
                  y: yOffset,
                  rotate: 0,
                  scale,
                  opacity,
                }}
                exit={{
                  scale: scale + 0.1,
                  y: yOffset + 50,
                  opacity: 0,
                }}
                transition={
                  isInitialMount
                    ? {
                        duration: 0.8,
                        delay: 0.5 + (index * 0.15), // Base delay of 0.5s plus stagger
                        ease: [0.34, 1.56, 0.64, 1],
                      }
                    : {
                        duration: 0.3,
                        ease: 'easeInOut',
                      }
                }
              >
                <div className="card-content">
                  {card.content}
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {!isLastCard ? (
        <div className="stack-controls">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="stack-button"
          >
            ←
          </button>
          <div className="stack-indicator">
            {currentIndex + 1} / {cards.length}
          </div>
          <button
            onClick={handleNext}
            disabled={currentIndex === cards.length - 1}
            className="stack-button"
          >
            →
          </button>
        </div>
      ) : (
        <div className="stack-controls">
          <button
            onClick={handlePrevious}
            className="stack-button"
          >
            ←
          </button>
          <button
            onClick={onComplete}
            className="continue-button"
          >
            Continue
          </button>
        </div>
      )}
    </div>
  )
}

export default Stack
