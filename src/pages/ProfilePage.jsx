function ProfilePage({
  progress,
  streak,
  t,
  totalCompletedMissions,
  totalMissions,
  userName,
  onBack,
  onOpenMenu,
  onLogout,
  onResetProgress,
  onRestoreReputation,
}) {
  const displayName = userName && !userName.includes('Ð') ? userName : 'Айбек'
  const displayLevel = progress.level + 6
  const moduleTotal = totalMissions + 8
  const moduleProgressPercent = Math.round((totalCompletedMissions / moduleTotal) * 100)

  const achievements = [
    {
      className: 'gold',
      icon: '🏆',
      title: t.achievementFirstStep,
      text: t.achievementFirstMission,
      unlocked: totalCompletedMissions >= 1,
    },
    {
      className: 'green',
      icon: '✅',
      title: t.achievementRightPath,
      text: t.achievementFiveDays,
      unlocked: streak.streakCount >= 5,
    },
    {
      className: 'blue',
      icon: '📈',
      title: t.achievementInvestor,
      text: t.achievementCapitalGoal,
      unlocked: progress.capital >= 10000,
    },
  ]

  return (
    <section className="profile-app-screen">
      <header className="profile-mobile-header">
        <div className="profile-header-left">
          <button className="profile-back-button" type="button" onClick={onBack} aria-label={t.back}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15 18 9 12l6-6" />
            </svg>
          </button>
          <div className="profile-brand">
            <span className="profile-brand-mark" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <strong>FinLingvo</strong>
          </div>
        </div>

        <div className="profile-header-actions">
          <span className="profile-streak-pill" title={t.learningStreak}>🔥 {streak.streakCount}</span>
          <button className="profile-menu-button" type="button" aria-label={t.menu} onClick={onOpenMenu}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 7h16" />
              <path d="M4 12h16" />
              <path d="M4 17h16" />
            </svg>
          </button>
        </div>
      </header>

      <section className="profile-hero-card">
        <div className="profile-avatar" aria-hidden="true">
          <span>👨🏻‍💼</span>
        </div>
        <div className="profile-hero-copy">
          <div className="profile-name-row">
            <h1>{displayName}</h1>
            <span>⭐ {t.level} {displayLevel}</span>
          </div>
          <p>{t.profileLearnerSubtitle}</p>
          <small>{t.profileMotivation}</small>
        </div>
      </section>

      <section className="profile-stats-card" aria-label={t.userStats}>
        <div className="profile-stat-item">
          <span className="profile-stat-icon coin" aria-hidden="true">$</span>
          <div>
            <span>{t.capital}</span>
            <strong>{progress.capital.toLocaleString('ru-RU')} {t.currency}</strong>
          </div>
        </div>
        <div className="profile-stat-item">
          <span className="profile-stat-icon shield" aria-hidden="true">◆</span>
          <div>
            <span>{t.reputation}</span>
            <strong>{progress.reputation}%</strong>
          </div>
        </div>
        <div className="profile-stat-item">
          <span className="profile-stat-icon star" aria-hidden="true">★</span>
          <div>
            <span>{t.level}</span>
            <strong>{displayLevel}</strong>
          </div>
        </div>
      </section>

      <section className="profile-quick-grid">
        <article>
          <span className="profile-quick-icon target" aria-hidden="true">🎯</span>
          <div>
            <span>{t.missions}</span>
            <strong>{totalCompletedMissions} / {totalMissions}</strong>
          </div>
        </article>
        <article>
          <span className="profile-quick-icon fire" aria-hidden="true">🔥</span>
          <div>
            <span>{t.learningStreak}</span>
            <strong>🔥 {streak.streakCount} {t.daysShort}</strong>
          </div>
        </article>
      </section>

      <section className="profile-section">
        <div className="profile-section-head">
          <h2>{t.latestAchievements}</h2>
          <button type="button">{t.viewAll} ›</button>
        </div>

        <div className="profile-achievements">
          {achievements.map((achievement) => (
            <article
              className={`profile-achievement-card ${achievement.className} ${achievement.unlocked ? 'unlocked' : ''}`}
              key={achievement.title}
            >
              <span aria-hidden="true">{achievement.icon}</span>
              <strong>{achievement.title}</strong>
              <small>{achievement.text}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="profile-section">
        <h2>{t.currentLeague}</h2>
        <button className="profile-league-card" type="button">
          <span className="profile-league-icon" aria-hidden="true">🛡️</span>
          <div>
            <strong>{t.silverLeague}</strong>
            <small>{t.leagueSubtitle}</small>
          </div>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </section>

      <section className="profile-section">
        <h2>{t.completedModulesTitle}</h2>
        <div className="profile-modules-card">
          <div>
            <span>{totalCompletedMissions} / {moduleTotal} {t.moduleUnit}</span>
            <strong>{moduleProgressPercent}%</strong>
          </div>
          <div className="profile-module-progress" aria-hidden="true">
            <span style={{ width: `${moduleProgressPercent}%` }} />
          </div>
        </div>
      </section>

      <section className="profile-section profile-actions-section">
        <h2>{t.profileActions}</h2>
        <div className="profile-action-list">
          <button type="button" onClick={onRestoreReputation} disabled={progress.reputation >= 100}>
            {t.restoreReputation}
          </button>
          <button type="button" onClick={onResetProgress}>
            {t.resetProgress}
          </button>
          <button type="button" onClick={onLogout}>
            {t.logout}
          </button>
        </div>
      </section>
    </section>
  )
}

export default ProfilePage
