function StatsBar({ progress, t, totalMissions }) {
  const stats = [
    { label: t.capital, value: `${progress.capital.toLocaleString('ru-RU')} ${t.currency}` },
    { label: t.reputation, value: `${progress.reputation}%` },
    { label: t.level, value: progress.level },
    { label: t.missionsShort, value: `${progress.completedMissionIds.length}/${totalMissions}` },
  ]

  return (
    <div className="stats-bar" aria-label={t.userStats}>
      {stats.map((stat) => (
        <div className="stats-pill" key={stat.label}>
          <span>{stat.label}</span>
          <strong>{stat.value}</strong>
        </div>
      ))}
    </div>
  )
}

export default StatsBar
