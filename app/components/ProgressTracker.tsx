'use client'

import { topics } from '../data/topics'

interface ProgressTrackerProps {
  progress: Record<string, number>
}

export default function ProgressTracker({ progress }: ProgressTrackerProps) {
  const allTopics = [
    ...topics.alevel.map(t => ({ ...t, level: 'alevel' as const })),
    ...topics.further.map(t => ({ ...t, level: 'further' as const }))
  ]

  const completedTopics = Object.values(progress).filter(score => score >= 70).length
  const totalScore = Object.values(progress).reduce((sum, score) => sum + score, 0)
  const averageScore = Object.keys(progress).length > 0
    ? Math.round(totalScore / Object.keys(progress).length)
    : 0

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-indigo-900 mb-6">Your Progress</h2>

      <div className="space-y-6">
        <div className="p-4 bg-indigo-50 rounded-lg">
          <p className="text-sm text-indigo-700 font-medium">Topics Mastered</p>
          <p className="text-3xl font-bold text-indigo-900">
            {completedTopics} <span className="text-lg font-normal text-indigo-600">/ {allTopics.length}</span>
          </p>
        </div>

        <div className="p-4 bg-green-50 rounded-lg">
          <p className="text-sm text-green-700 font-medium">Average Score</p>
          <p className="text-3xl font-bold text-green-900">
            {averageScore}%
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-800 mb-3">Recent Activity</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {Object.entries(progress).length === 0 ? (
              <p className="text-gray-500 text-sm">No activity yet. Start practicing!</p>
            ) : (
              Object.entries(progress)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 10)
                .map(([topicId, score]) => {
                  const [level, id] = topicId.split('-')
                  const topic = topics[level as 'alevel' | 'further']?.find(t => t.id === id)
                  return (
                    <div key={topicId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-700 font-medium truncate flex-1">
                        {topic?.name || topicId}
                      </span>
                      <span className={`text-sm font-bold ml-2 ${score >= 70 ? 'text-green-600' : 'text-yellow-600'}`}>
                        {score}%
                      </span>
                    </div>
                  )
                })
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
