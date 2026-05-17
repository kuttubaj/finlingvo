import { useState } from 'react'

const missionCopy = {
  missionCount: {
    ky: (current, total) => `Миссия ${current} из ${total}`,
    ru: (current, total) => `Миссия ${current} из ${total}`,
    en: (current, total) => `Mission ${current} of ${total}`,
  },
  situation: { ky: 'Ситуация', ru: 'Ситуация', en: 'Situation' },
  expenses: { ky: 'Чыгашалар:', ru: 'Расходы:', en: 'Expenses:' },
}

function formatScenario(text) {
  if (!text) return { intro: '', expenses: [] }

  const expenseMarkers = ['Расходы:', 'Чыгашалар:', 'Expenses:']
  const marker = expenseMarkers.find((item) => text.includes(item))
  if (!marker) return { intro: text, expenses: [] }

  const [intro, expenseText] = text.split(marker)
  const expenses = expenseText
    .split(',')
    .map((item) => item.trim().replace(/\.$/, ''))
    .filter(Boolean)

  return { intro: intro.trim(), expenses }
}

function MissionPage({
  language,
  mission,
  missionIndex = 1,
  totalMissions = 1,
  t,
  onBack,
  onSubmit,
  onWrongAnswer,
}) {
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [feedback, setFeedback] = useState('')
  const [checkedAnswer, setCheckedAnswer] = useState('')
  const missionProgress = Math.min(100, Math.round((missionIndex / totalMissions) * 100))
  const scenario = formatScenario(mission.scenario?.[language] || mission.description[language])

  const handleSelectAnswer = (answer) => {
    setSelectedAnswer(answer)
    setCheckedAnswer('')
    setFeedback('')
  }

  const handleSubmit = () => {
    setCheckedAnswer(selectedAnswer)

    if (selectedAnswer !== mission.correctOptionId) {
      setFeedback(`${t.wrong} ${t.reputation} -1%`)
      onWrongAnswer()
      return
    }

    onSubmit(mission)
  }

  const getAnswerClass = (optionId) => {
    if (checkedAnswer && optionId === mission.correctOptionId) return 'answer-option correct'
    if (checkedAnswer === optionId && optionId !== mission.correctOptionId) return 'answer-option wrong'
    if (selectedAnswer === optionId) return 'answer-option selected'
    return 'answer-option'
  }

  return (
    <section className="mission-app-screen">
      <header className="mission-screen-top">
        <div>
          <span>{missionCopy.missionCount[language](missionIndex, totalMissions)}</span>
        </div>
        <button className="mission-close-button" onClick={onBack} type="button" aria-label={t.back}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </header>

      <div className="mission-screen-progress" aria-hidden="true">
        <span style={{ width: `${missionProgress}%` }} />
      </div>

      <article className="mission-screen-content">
        <h1>{mission.title[language]}</h1>

        <section className="mission-situation-card">
          <span>{missionCopy.situation[language]}</span>
          {scenario.intro && <p>{scenario.intro}</p>}
          {scenario.expenses.length > 0 && (
            <div className="mission-expenses">
              <strong>{missionCopy.expenses[language]}</strong>
              <ul>
                {scenario.expenses.map((expense) => (
                  <li key={expense}>{expense}</li>
                ))}
              </ul>
            </div>
          )}
        </section>

        <section className="mission-question-block">
          <h2>{mission.question[language]}</h2>

          <div className="mission-answer-list">
            {mission.options.map((option, index) => (
              <button
                key={option.id}
                className={getAnswerClass(option.id)}
                onClick={() => handleSelectAnswer(option.id)}
                type="button"
              >
                <span>{String.fromCharCode(65 + index)}) {option.text[language]}</span>
              </button>
            ))}
          </div>
        </section>

        {feedback && <div className="answer-feedback">{feedback}</div>}

        <button
          className="mission-submit-button"
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
