'use client'

import { useState } from 'react'
import TopicSelector from './components/TopicSelector'
import ProblemSet from './components/ProblemSet'
import ProgressTracker from './components/ProgressTracker'

export default function Home() {
  const [selectedLevel, setSelectedLevel] = useState<'alevel' | 'further' | null>(null)
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)
  const [progress, setProgress] = useState<Record<string, number>>({})

  const handleTopicSelect = (level: 'alevel' | 'further', topic: string) => {
    setSelectedLevel(level)
    setSelectedTopic(topic)
  }

  const handleComplete = (topicId: string, score: number) => {
    setProgress(prev => ({
      ...prev,
      [topicId]: Math.max(prev[topicId] || 0, score)
    }))
  }

  const handleBack = () => {
    setSelectedTopic(null)
    setSelectedLevel(null)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-indigo-900 mb-4">
            A-Level Maths Mastery
          </h1>
          <p className="text-xl text-indigo-700">
            Interactive learning for A-Level and Further Mathematics
          </p>
        </header>

        {!selectedTopic ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <TopicSelector
                onTopicSelect={handleTopicSelect}
                progress={progress}
              />
            </div>
            <div>
              <ProgressTracker progress={progress} />
            </div>
          </div>
        ) : (
          <div>
            <button
              onClick={handleBack}
              className="mb-6 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              ← Back to Topics
            </button>
            <ProblemSet
              level={selectedLevel!}
              topic={selectedTopic}
              onComplete={handleComplete}
            />
          </div>
        )}
      </div>
    </main>
  )
}
