'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { problems } from '../data/problems'

const BlockMath = dynamic(() => import('react-katex').then(mod => mod.BlockMath), { ssr: false })
const InlineMath = dynamic(() => import('react-katex').then(mod => mod.InlineMath), { ssr: false })

interface ProblemSetProps {
  level: 'alevel' | 'further'
  topic: string
  onComplete: (topicId: string, score: number) => void
}

export default function ProblemSet({ level, topic, onComplete }: ProblemSetProps) {
  const [currentProblem, setCurrentProblem] = useState(0)
  const [userAnswer, setUserAnswer] = useState('')
  const [showSolution, setShowSolution] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [score, setScore] = useState(0)
  const [attempted, setAttempted] = useState(0)

  const topicProblems = problems[level][topic] || []

  useEffect(() => {
    setCurrentProblem(0)
    setUserAnswer('')
    setShowSolution(false)
    setIsCorrect(null)
    setScore(0)
    setAttempted(0)
  }, [level, topic])

  const handleSubmit = () => {
    const problem = topicProblems[currentProblem]
    const correct = userAnswer.trim().toLowerCase() === problem.answer.toLowerCase()
    setIsCorrect(correct)
    setShowSolution(true)
    setAttempted(prev => prev + 1)
    if (correct) {
      setScore(prev => prev + 1)
    }
  }

  const handleNext = () => {
    if (currentProblem < topicProblems.length - 1) {
      setCurrentProblem(prev => prev + 1)
      setUserAnswer('')
      setShowSolution(false)
      setIsCorrect(null)
    } else {
      const finalScore = Math.round((score / topicProblems.length) * 100)
      onComplete(`${level}-${topic}`, finalScore)
      alert(`Quiz complete! You scored ${score}/${topicProblems.length} (${finalScore}%)`)
    }
  }

  if (topicProblems.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Coming Soon</h2>
        <p className="text-gray-600">Problems for this topic are being prepared.</p>
      </div>
    )
  }

  const problem = topicProblems[currentProblem]

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-indigo-900">
          Question {currentProblem + 1} of {topicProblems.length}
        </h2>
        <div className="text-lg font-semibold text-indigo-600">
          Score: {score}/{attempted}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">{problem.question}</h3>
        {problem.latex && (
          <div className="my-6 p-4 bg-gray-50 rounded-lg overflow-x-auto">
            <BlockMath math={problem.latex} />
          </div>
        )}
        {problem.hint && (
          <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 text-blue-800">
            <p className="font-semibold">Hint:</p>
            <p>{problem.hint}</p>
          </div>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">Your Answer:</label>
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          disabled={showSolution}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 disabled:bg-gray-100"
          placeholder="Enter your answer..."
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !showSolution && userAnswer.trim()) {
              handleSubmit()
            }
          }}
        />
      </div>

      {!showSolution ? (
        <button
          onClick={handleSubmit}
          disabled={!userAnswer.trim()}
          className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          Submit Answer
        </button>
      ) : (
        <div>
          <div className={`p-6 rounded-lg mb-6 ${isCorrect ? 'bg-green-50 border-2 border-green-500' : 'bg-red-50 border-2 border-red-500'}`}>
            <p className={`text-xl font-bold mb-2 ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
              {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
            </p>
            <p className="text-gray-800">
              <span className="font-semibold">Correct Answer:</span> {problem.answer}
            </p>
          </div>

          <div className="p-6 bg-indigo-50 rounded-lg mb-6">
            <h4 className="text-lg font-bold text-indigo-900 mb-3">Solution:</h4>
            {problem.solution.map((step, index) => (
              <div key={index} className="mb-3">
                <p className="text-gray-800">{step}</p>
              </div>
            ))}
          </div>

          <button
            onClick={handleNext}
            className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
          >
            {currentProblem < topicProblems.length - 1 ? 'Next Question' : 'Complete Quiz'}
          </button>
        </div>
      )}
    </div>
  )
}
