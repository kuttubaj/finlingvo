const baseLeaderboard = [
  { rank: 1, name: 'Нурлан', capital: 28950, trend: 'up', avatar: '👨🏻‍💼' },
  { rank: 2, name: 'Асель', capital: 25300, trend: 'up', avatar: '👩🏻‍💼' },
  { rank: 3, name: 'Дамир', capital: 22180, trend: 'up', avatar: '👨🏻‍💻' },
  { rank: 4, name: 'Мадина', capital: 19650, trend: 'up', avatar: '👩🏻' },
  { rank: 5, name: 'Эржан', capital: 17980, trend: 'up', avatar: '👨🏻' },
  { rank: 6, name: 'Бакыт', capital: 14210, trend: 'neutral', avatar: '👨🏻‍🎓' },
  { rank: 8, name: 'Самира', capital: 12080, trend: 'neutral', avatar: '👩🏻‍🎓' },
  { rank: 9, name: 'Тимур', capital: 11450, trend: 'neutral', avatar: '👨🏻‍💼' },
  { rank: 10, name: 'Элина', capital: 10900, trend: 'neutral', avatar: '👩🏻‍💻' },
  { rank: 11, name: 'Назар', capital: 10240, trend: 'neutral', avatar: '👨🏻‍🎓' },
  { rank: 12, name: 'Айжан', capital: 9760, trend: 'neutral', avatar: '👩🏻‍💼' },
  { rank: 13, name: 'Марсель', capital: 8930, trend: 'neutral', avatar: '👨🏻' },
  { rank: 14, name: 'Алина', capital: 8120, trend: 'neutral', avatar: '👩🏻' },
  { rank: 15, name: 'Бекзат', capital: 7480, trend: 'neutral', avatar: '👨🏻‍💻' },
  { rank: 16, name: 'Руслан', capital: 6420, trend: 'down', avatar: '👨🏻' },
  { rank: 17, name: 'Айлана', capital: 5980, trend: 'down', avatar: '👩🏻' },
  { rank: 18, name: 'Адилет', capital: 5300, trend: 'down', avatar: '👨🏻‍🎓' },
  { rank: 19, name: 'Диана', capital: 4850, trend: 'down', avatar: '👩🏻‍💼' },
  { rank: 20, name: 'Максат', capital: 4100, trend: 'down', avatar: '👨🏻‍💼' },
]

const league = {
  weeklyEndsInDays: 5,
}

function formatCapital(value) {
  return value.toLocaleString('ru-RU')
}

function RatingPage({ progress, streak, t, userName, onOpenMenu }) {
  const currentName = userName && !userName.includes('Ð') ? userName : 'Айбек'
  const currentCapital = progress.capital || 13750
  const leaderboard = [
    ...baseLeaderboard.slice(0, 6),
    { rank: 7, name: currentName, capital: currentCapital, trend: 'neutral', avatar: '👨🏻‍💼', current: true },
    ...baseLeaderboard.slice(6),
  ]

  return (
    <section className="rating-app-screen">
      <header className="rating-mobile-header">
        <div className="rating-brand">
          <span className="rating-brand-mark" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <strong>FinLingvo</strong>
        </div>

        <div className="rating-header-actions">
          <span className="rating-streak-pill">🔥 {streak.streakCount}</span>
          <button className="rating-menu-button" type="button" aria-label={t.menu} onClick={onOpenMenu}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 7h16" />
              <path d="M4 12h16" />
              <path d="M4 17h16" />
            </svg>
          </button>
        </div>
      </header>

      <h1 className="rating-title">{t.rating}</h1>

      <section className="rating-league-hero">
        <div className="rating-shield" aria-hidden="true">🛡️</div>
        <div>
          <h2>{t.silverLeague}</h2>
          <p>{t.daysLeftThisWeek.replace('{days}', league.weeklyEndsInDays)}</p>
        </div>
        <span className="rating-hero-city" aria-hidden="true" />
      </section>

      <section className="leaderboard-card">
        <div className="leaderboard-head">
          <span>#</span>
          <span>{t.user}</span>
          <span>{t.capital}</span>
        </div>

        <div className="leaderboard-list">
          {leaderboard.map((row) => (
            <LeaderboardRow key={row.rank} row={row} t={t} />
          ))}
        </div>
      </section>

      <section className="rating-info-card">
        <span aria-hidden="true">i</span>
        <p>{t.weeklyCapitalResetInfo}</p>
      </section>

      <section className="rating-rules-grid">
        <article className="promote">
          <strong>{t.top5}</strong>
          <span>{t.promotedToHigherLeague}</span>
          <em>↑ ↑ ↑</em>
        </article>
        <article className="stay">
          <strong>{t.places6to15}</strong>
          <span>{t.staysInLeague}</span>
          <em>—</em>
        </article>
        <article className="demote">
          <strong>{t.last5}</strong>
          <span>{t.demotedToLowerLeague}</span>
          <em>↓ ↓ ↓</em>
        </article>
      </section>
    </section>
  )
}

function LeaderboardRow({ row, t }) {
  const medalClass = row.rank === 1 ? 'gold' : row.rank === 2 ? 'silver' : row.rank === 3 ? 'bronze' : ''
  const trend = {
    up: '↑',
    neutral: '—',
    down: '↓',
  }[row.trend]

  return (
    <div className={`leaderboard-row ${row.current ? 'current' : ''}`}>
      <span className={`leaderboard-rank ${medalClass}`}>{row.rank}</span>
      <span className="leaderboard-user">
        <span className="leaderboard-avatar" aria-hidden="true">{row.avatar}</span>
        <span>{row.current ? `${row.name} (${t.currentUser})` : row.name}</span>
      </span>
      <em className={`trend ${row.trend}`}>{trend}</em>
      <strong>{formatCapital(row.capital)} сом</strong>
    </div>
  )
}

export default RatingPage
