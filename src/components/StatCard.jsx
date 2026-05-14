function StatCard({ stat }) {
  return (
    <article className={`stat-card ${stat.tone}`}>
      <span className="stat-label">{stat.label}</span>
      <strong>{stat.value}</strong>
      <small>{stat.detail}</small>
    </article>
  )
}

export default StatCard
