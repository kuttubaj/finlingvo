function ResultPage({ language, nextActionLabel, progress, result, t, onContinue, onBackToModule }) {
  if (!result?.mission) {
    return (
      <section className="page page-narrow result-page">
        <article className="result-card">
          <h1>Натыйжа жок</h1>
          <button className="primary-button" onClick={onBackToModule} type="button">
            {t.backToModule}
          </button>
        </article>
      </section>
    )
  }

  const { mission, rewardCapital, rewardReputation } = result

  return (
    <section className="page page-narrow result-page">
      <article className="result-card success">
        <span className="result-mark">✓</span>
        <span className="section-kicker">{mission.title[language]}</span>
        <h1>{t.correct}</h1>

        <div className="formula-card">
          <span>{t.explanation}</span>
          <p>{mission.explanation[language]}</p>
        </div>

        <div className="reward-grid">
          <div>
            <span>{t.capital}</span>
            <strong>+{rewardCapital} сом</strong>
            <small>{t.currentCapital}: {progress.capital.toLocaleString('ru-RU')} сом</small>
          </div>
          <div>
            <span>{t.reputation}</span>
            <strong>+{rewardReputation}%</strong>
            <small>{t.currentReputation}: {progress.reputation}%</small>
          </div>
        </div>

        <div className="result-actions">
          <button className="primary-button" onClick={onContinue} type="button">
            {nextActionLabel}
          </button>
          <button className="secondary-button" onClick={onBackToModule} type="button">
            {t.backToModule}
          </button>
        </div>
      </article>
    </section>
  )
}

export default ResultPage
