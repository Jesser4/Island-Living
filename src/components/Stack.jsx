import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import './Stack.css'

const Stack = ({ cards = [], onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setDirection(1)
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setDirection(-1)
      setCurrentIndex(currentIndex - 1)
    }
  }

  const isLastCard = currentIndex === cards.length - 1
  const visibleCards = cards.slice(currentIndex, currentIndex + 3)

  return (
    <div className="stack-container">
      <div className="stack-wrapper">
        <AnimatePresence initial={false} custom={direction}>
          {visibleCards.map((card, index) => {
            const actualIndex = currentIndex + index
            const zIndex = visibleCards.length - index
            const scale = 1 - index * 0.05
            const yOffset = index * 20
            const opacity = 1 - index * 0.3

            return (
              <motion.div
                key={actualIndex}
                className="stack-card"
                style={{
                  zIndex,
                }}
                initial={{
                  scale: scale - 0.1,
                  y: yOffset - 50,
                  opacity: 0,
                }}
                animate={{
                  scale,
                  y: yOffset,
                  opacity,
                }}
                exit={{
                  scale: scale + 0.1,
                  y: yOffset + 50,
                  opacity: 0,
                }}
                transition={{
                  duration: 0.4,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
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
