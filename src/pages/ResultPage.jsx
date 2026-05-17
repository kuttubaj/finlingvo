function ResultPage({ language, nextActionLabel, progress, result, t, onContinue, onBackToModule }) {
  if (!result?.mission) {
    return (
      <section className="result-app-screen">
        <button className="result-close-button" onClick={onBackToModule} type="button" aria-label={t.back}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
        <div className="result-success-content">
          <h1>{t.noActiveMission}</h1>
          <button className="result-primary-button" onClick={onBackToModule} type="button">
            {t.backToModule}
          </button>
        </div>
      </section>
    )
  }

  const { mission, rewardCapital, rewardReputation } = result

  return (
    <section className="result-app-screen">
      <button className="result-close-button" onClick={onBackToModule} type="button" aria-label={t.back}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </button>

      <article className="result-success-content">
        <div className="result-check-mark" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="m6 12 4 4 8-9" />
          </svg>
        </div>
        <h1>{t.correct} 🎉</h1>

        <div className="result-explanation">
          <span>{t.explanation}</span>
          <p>{mission.explanation[language]}</p>
        </div>

        <div className="result-rewards-grid">
          <div className="result-reward-card">
            <span className="result-reward-icon coin" aria-hidden="true">$</span>
            <div>
              <strong>+{rewardCapital} сом</strong>
              <span>{t.capital}</span>
            </div>
          </div>
          <div className="result-reward-card">
            <span className="result-reward-icon shield" aria-hidden="true">◆</span>
            <div>
              <strong>+{rewardReputation}%</strong>
              <span>{t.reputation}</span>
            </div>
          </div>
        </div>

        <button className="result-primary-button" onClick={onContinue} type="button">
          {nextActionLabel}
        </button>
        <button className="result-text-button" onClick={onBackToModule} type="button">
          {t.backToModule}
        </button>

        <p className="result-current-stats">
          {t.currentCapital}: {progress.capital.toLocaleString('ru-RU')} сом · {t.currentReputation}: {progress.reputation}%
        </p>
      </article>
    </section>
  )
}

export default ResultPage
