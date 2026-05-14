import { useState } from 'react'

function MissionPage({ language, mission, t, onBack, onSubmit, onWrongAnswer }) {
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [feedback, setFeedback] = useState('')
  const missionNumber = Number(mission.id.split('-').at(-1)) || 1
  const missionProgress = Math.min(100, Math.round((missionNumber / 4) * 100))

  const handleSelectAnswer = (answer) => {
    setSelectedAnswer(answer)
    setFeedback('')
  }

  const handleSubmit = () => {
    if (selectedAnswer !== mission.correctOptionId) {
      setFeedback(`${t.wrong} ${t.reputation} -1%`)
      onWrongAnswer()
      return
    }

    onSubmit(mission)
  }

  return (
    <section className="page page-narrow">
      <button className="back-button" onClick={onBack} type="button">
        ← {t.backToModule}
      </button>

      <article className="mission-detail">
        <div className="mission-topline">
          <span>{t.missions}</span>
          <div className="progress-track" aria-hidden="true">
            <span style={{ width: `${missionProgress}%` }} />
          </div>
        </div>

        <div className="case-header">
          <span className="section-kicker">{mission.description[language]}</span>
          <h1>{mission.title[language]}</h1>
          <p>{mission.scenario?.[language] || mission.description[language]}</p>
        </div>

        <div className="question-block">
          <span>{t.question}</span>
          <h2>{mission.question[language]}</h2>
        </div>

        <div className="answer-grid">
          {mission.options.map((option, index) => (
            <button
              key={option.id}
              className={selectedAnswer === option.id ? 'answer-option selected' : 'answer-option'}
              onClick={() => handleSelectAnswer(option.id)}
              type="button"
            >
              <strong>{String.fromCharCode(65 + index)}</strong>
              <span>{option.text[language]}</span>
            </button>
          ))}
        </div>

        {feedback && <div className="answer-feedback">{feedback}</div>}

        <button
          className="primary-button wide"
          disabled={!selectedAnswer}
          onClick={handleSubmit}
          type="button"
        >
          {t.continue}
        </button>
      </article>
    </section>
  )
}

export default MissionPage
