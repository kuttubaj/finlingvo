function ProfilePage({
  completedModules,
  progress,
  streak,
  t,
  totalCompletedMissions,
  userName,
  onLogout,
  onResetProgress,
  onRestoreReputation,
}) {
  return (
    <section className="page page-narrow">
      <header className="page-header">
        <div className="page-icon" aria-hidden="true">
          👤
        </div>
        <div>
          <span className="section-kicker">{t.profile}</span>
          <h1>{userName}</h1>
          <p>{t.profileSubtitle}</p>
        </div>
      </header>

      <div className="stats-grid">
        <article className="stat-card">
          <span className="stat-label">{t.capital}</span>
          <strong>{progress.capital.toLocaleString('ru-RU')} сом</strong>
        </article>
        <article className="stat-card">
          <span className="stat-label">{t.reputation}</span>
          <strong>{progress.reputation}%</strong>
        </article>
        <article className="stat-card">
          <span className="stat-label">{t.level}</span>
          <strong>{progress.level}</strong>
        </article>
      </div>

      <section className="section-block">
        <div className="profile-grid">
          <div>
            <span className="stat-label">{t.completedMissions}</span>
            <strong>{totalCompletedMissions}</strong>
          </div>
          <div>
            <span className="stat-label">{t.completedModules}</span>
            <strong>{completedModules}</strong>
          </div>
        </div>
      </section>

      <section className="section-block">
        <h2>{t.reputationHelpTitle}</h2>
        <ul className="help-list">
          <li>{t.reputationHelp1}</li>
          <li>{t.reputationHelp2}</li>
          <li>{t.reputationHelp3}</li>
          <li>{t.reputationHelp4}</li>
        </ul>
        <button
          className="primary-button"
          disabled={progress.reputation >= 100}
          onClick={onRestoreReputation}
          type="button"
        >
          {t.restoreReputation}
        </button>
      </section>

      <section className="section-block">
        <div className="streak-profile-card">
          <div>
            <span className="section-kicker">{t.learningStreak}</span>
            <h2>🔥 {streak.streakCount}</h2>
            <p>{t.streakDescription}</p>
          </div>
          <div className={streak.studiedToday ? 'status-pill completed' : 'status-pill'}>
            {streak.studiedToday
              ? t.studiedToday
              : streak.streakCount > 0
                ? t.notStudiedToday
                : t.streakNotStarted}
          </div>
        </div>
        {streak.lastStudyDate && (
          <p className="streak-date">
            {t.lastStudyDate}: {streak.lastStudyDate}
          </p>
        )}
      </section>

      <section className="section-block">
        <div className="profile-actions">
          <button className="secondary-button" onClick={onLogout} type="button">
            {t.logout}
          </button>
          <button className="secondary-button danger-button" onClick={onResetProgress} type="button">
            {t.resetProgress}
          </button>
        </div>
      </section>
    </section>
  )
}

export default ProfilePage
