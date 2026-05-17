import BuildingCard from '../components/BuildingCard.jsx'

function HomePage({
  language,
  modules,
  progress,
  streak,
  t,
  onOpenMenu,
  onOpenModule,
}) {
  return (
    <section className="home-app-screen">
      <header className="home-topbar" aria-label={t.home}>
        <div className="home-brand" aria-label={t.appTitle}>
          <span className="home-brand-mark" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <strong>{t.appTitle}</strong>
        </div>

        <div className="home-actions">
          <button
            className={`home-streak-indicator ${streak.studiedToday ? 'active' : ''}`}
            type="button"
            aria-label={t.learningStreak}
            onClick={onOpenMenu}
          >
            <span aria-hidden="true">🔥</span>
            <strong>{streak.streakCount}</strong>
          </button>
          <button className="home-icon-button" type="button" aria-label={t.menu} onClick={onOpenMenu}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 7h16" />
              <path d="M4 12h16" />
              <path d="M4 17h16" />
            </svg>
          </button>
        </div>
      </header>

      <section className="home-stats-panel" aria-label={t.userStats}>
        <div className="home-stat">
          <span className="home-stat-icon coin" aria-hidden="true">$</span>
          <span>{t.capital}</span>
          <strong>{progress.capital.toLocaleString('ru-RU')} {t.currency}</strong>
        </div>
        <div className="home-stat">
          <span className="home-stat-icon shield" aria-hidden="true">◆</span>
          <span>{t.reputation}</span>
          <strong>{progress.reputation}%</strong>
        </div>
        <div className="home-stat">
          <span className="home-stat-icon star" aria-hidden="true">★</span>
          <span>{t.level}</span>
          <strong>{progress.level + 6}</strong>
        </div>
      </section>

      <section className="business-city">
        <div className="city-heading">
          <h2>Твой бизнес-город</h2>
        </div>

        <div className="city-modules-path">
          <svg className="roadmap-path" viewBox="0 0 390 940" preserveAspectRatio="none" aria-hidden="true">
            <path
              className="roadmap-path-glow"
              d="M104 82 C104 176 286 176 286 270 C286 364 104 364 104 458 C104 552 286 552 286 646 C286 740 104 740 104 820"
            />
            <path
              className="roadmap-path-line"
              d="M104 82 C104 176 286 176 286 270 C286 364 104 364 104 458 C104 552 286 552 286 646 C286 740 104 740 104 820"
            />
          </svg>
          {modules.map((module, index) => (
            <div className={`path-step ${index % 2 === 0 ? 'left' : 'right'}`} key={module.id}>
              <BuildingCard
                language={language}
                module={module}
                t={t}
                onClick={() => onOpenModule(module)}
              />
            </div>
          ))}
          <div className="path-step left future-step">
            <div className="future-module-card" aria-disabled="true">
              <div className="future-building-stage" aria-hidden="true">
                <span className="future-ground-shadow" />
                <span className="future-building-silhouette">
                  <i />
                  <i />
                  <i />
                </span>
              </div>
              <div className="future-module-label">
                <strong>{t.soon}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}

export default HomePage
