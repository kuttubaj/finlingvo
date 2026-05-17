function MissionCard({ mission, index, language, onClick }) {
  const isLocked = mission.status === 'locked'
  const isCompleted = mission.status === 'completed'
  const isActive = mission.status === 'active'

  const lockedText = {
    ky: `Ачылат: Миссия ${index} бүткөндө`,
    ru: `Откроется после миссии ${index}`,
    en: `Unlocks after mission ${index}`,
  }[language]

  const rewardText = {
    ky: `+${mission.rewardCapital} сом`,
    ru: `+${mission.rewardCapital} сом`,
    en: `+${mission.rewardCapital} som`,
  }[language]

  return (
    <button
      className={`mission-card ${mission.status}`}
      disabled={isLocked || isCompleted}
      onClick={onClick}
      type="button"
    >
      <div className="mission-index" aria-hidden="true">
        {isCompleted && (
          <svg viewBox="0 0 24 24">
            <path d="m6 12 4 4 8-9" />
          </svg>
        )}
        {isActive && (
          <svg viewBox="0 0 24 24">
            <path d="M4 19h16" />
            <path d="M6 19V9l6-4 6 4v10" />
            <path d="M9 19v-6h6v6" />
          </svg>
        )}
        {isLocked && (
          <svg viewBox="0 0 24 24">
            <rect x="5" y="11" width="14" height="10" rx="2" />
            <path d="M8 11V8a4 4 0 0 1 8 0v3" />
          </svg>
        )}
      </div>

      <div className="mission-copy">
        <h3>{mission.title[language]}</h3>
        <p>{isLocked ? lockedText : mission.description[language]}</p>
        {!isLocked && <strong>{rewardText}</strong>}
      </div>

      <div className="mission-side">
        {isActive && (
          <span className="mission-play">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m9 7 8 5-8 5V7Z" />
            </svg>
          </span>
        )}
        {isCompleted && (
          <svg className="mission-chevron" viewBox="0 0 24 24" aria-hidden="true">
            <path d="m9 18 6-6-6-6" />
          </svg>
        )}
      </div>
    </button>
  )
}

export default MissionCard
