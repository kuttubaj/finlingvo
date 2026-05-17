function BuildingCard({ module, language, t, onClick }) {
  const isDisabled = module.status === 'locked'
  const progressColor = {
    bank: 'green',
    shop: 'yellow',
    office: 'blue',
    investments: 'purple',
  }[module.id]

  return (
    <article className={`module-card module-${module.id} ${isDisabled ? 'disabled' : ''}`}>
      <button
        className="city-building-card"
        disabled={isDisabled}
        onClick={onClick}
        type="button"
        aria-label={isDisabled ? `${module.title[language]} ${t.locked}` : module.title[language]}
      >
        <div className="building-stage" aria-hidden="true">
          <span className="ground-shadow" />
          <img className="building-image" src={module.image} alt="" loading="lazy" />
        </div>

        <div className="building-glass-panel">
          <div className="building-title-row">
            <h3>{module.title[language]}</h3>
            {isDisabled ? (
              <span className="locked-label">
                {t.locked}
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="5" y="11" width="14" height="10" rx="2" />
                  <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                </svg>
              </span>
            ) : (
              <span className="building-progress-label">
                <strong>{module.progressPercent}%</strong>
              </span>
            )}
          </div>

          {!isDisabled && (
            <div className={`building-progress-track ${progressColor}`} aria-hidden="true">
              <span style={{ width: `${module.progressPercent}%` }} />
            </div>
          )}
        </div>
      </button>
    </article>
  )
}

export default BuildingCard
