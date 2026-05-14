import MissionCard from '../components/MissionCard.jsx'

function BankPage({ language, missions, module, notice, t, onBack, onOpenMission }) {
  const completedCount = missions.filter((mission) => mission.status === 'completed').length
  const progressPercent = Math.round((completedCount / missions.length) * 100)

  return (
    <section className="page page-narrow">
      <button className="back-button" onClick={onBack} type="button">
        ← Башкы бет
      </button>

      <header className="page-header">
        <div className="page-icon" aria-hidden="true">
          {module.icon}
        </div>
        <div>
          <span className="section-kicker">{t.modules}</span>
          <h1>{module.title[language]}</h1>
          <p>{module.description[language]}</p>
        </div>
      </header>

      <section className="progress-card">
        <div>
          <span>{t.progress}</span>
          <strong>{progressPercent}%</strong>
        </div>
        <div className="progress-track" aria-hidden="true">
          <span style={{ width: `${progressPercent}%` }} />
        </div>
        <p>
          {completedCount} / {missions.length} {t.missions}
        </p>
      </section>

      {notice && <div className="success-message">{notice}</div>}

      <section className="missions-layout">
        {missions.map((mission, index) => (
          <MissionCard
            key={mission.id}
            language={language}
            mission={mission}
            index={index}
            t={t}
            onClick={() => onOpenMission(mission)}
          />
        ))}
      </section>
    </section>
  )
}

export default BankPage
