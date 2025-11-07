'use client'

import { topics } from '../data/topics'

interface TopicSelectorProps {
  onTopicSelect: (level: 'alevel' | 'further', topic: string) => void
  progress: Record<string, number>
}

export default function TopicSelector({ onTopicSelect, progress }: TopicSelectorProps) {
  return (
    <div className="space-y-8">
      {/* A-Level Topics */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-indigo-900 mb-6">
          A-Level Mathematics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {topics.alevel.map((topic) => {
            const topicId = `alevel-${topic.id}`
            const score = progress[topicId] || 0
            return (
              <button
                key={topic.id}
                onClick={() => onTopicSelect('alevel', topic.id)}
                className="text-left p-6 rounded-lg border-2 border-indigo-200 hover:border-indigo-500 hover:shadow-md transition-all group"
              >
                <h3 className="text-xl font-semibold text-indigo-800 group-hover:text-indigo-600 mb-2">
                  {topic.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3">{topic.description}</p>
                {score > 0 && (
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${score}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-green-600">{score}%</span>
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Further Maths Topics */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-purple-900 mb-6">
          Further Mathematics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {topics.further.map((topic) => {
            const topicId = `further-${topic.id}`
            const score = progress[topicId] || 0
            return (
              <button
                key={topic.id}
                onClick={() => onTopicSelect('further', topic.id)}
                className="text-left p-6 rounded-lg border-2 border-purple-200 hover:border-purple-500 hover:shadow-md transition-all group"
              >
                <h3 className="text-xl font-semibold text-purple-800 group-hover:text-purple-600 mb-2">
                  {topic.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3">{topic.description}</p>
                {score > 0 && (
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${score}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-green-600">{score}%</span>
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
