function BuildingCard({ module, language, t, onClick }) {
  const isDisabled = module.status === 'locked'
  const statusText = {
    active: t.active,
    completed: t.completed,
    locked: t.locked,
  }[module.status]

  return (
    <article className={`module-card module-${module.id} ${isDisabled ? 'disabled' : ''}`}>
      <div className="building-stage" aria-hidden="true">
        <span className="stage-background" />
        <span className="ground-shadow" />
        <img className="building-image" src={module.image} alt="" loading="lazy" />
      </div>

      <div className="building-content">
        <div className="building-header">
          <div>
            <h3>{module.title[language]}</h3>
            <p>{module.description[language]}</p>
          </div>
          <span className={`status-pill ${module.status}`}>{statusText}</span>
        </div>

        <div className="module-progress">
          <div>
            <span>{t.progress}</span>
            <strong>{module.progressPercent}%</strong>
          </div>
          <div className="progress-track" aria-hidden="true">
            <span style={{ width: `${module.progressPercent}%` }} />
          </div>
          <small>
            {module.completedCount} / {module.totalCount} {t.missions}
          </small>
        </div>

        <button
          className={isDisabled ? 'secondary-button wide' : 'primary-button wide'}
          disabled={isDisabled}
          onClick={onClick}
          type="button"
        >
          {isDisabled ? t.locked : module.status === 'completed' ? t.completed : t.openModule}
        </button>
      </div>
    </article>
  )
}

export default BuildingCard
