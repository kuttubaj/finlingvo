function MissionCard({ mission, index, language, t, onClick }) {
  const isLocked = mission.status === 'locked'
  const isCompleted = mission.status === 'completed'
  const isActive = mission.status === 'active'

  const statusText = {
    completed: t.completed,
    active: t.active,
    locked: t.lockedMission,
  }[mission.status]

  return (
    <button
      className={`mission-card ${mission.status}`}
      disabled={isLocked || isCompleted}
      onClick={onClick}
      type="button"
    >
      <div className="mission-index">{isCompleted ? '✓' : index + 1}</div>
      <div className="mission-copy">
        <h3>{mission.title[language]}</h3>
        <p>{statusText}</p>
      </div>
      <div className="mission-side">
        <strong>+{mission.rewardCapital} сом</strong>
        <span>{isActive ? t.start : isCompleted ? '✓' : t.locked}</span>
      </div>
    </button>
  )
}

export default MissionCard
