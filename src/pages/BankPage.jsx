import MissionCard from '../components/MissionCard.jsx'

const moduleSubtitles = {
  bank: {
    ky: 'Финансы, доходы, расходы и бюджет',
    ru: 'Финансы, доходы, расходы и бюджет',
    en: 'Finance, income, expenses, and budget',
  },
  shop: {
    ky: 'Продажи, клиенты, прибыль и реклама',
    ru: 'Продажи, клиенты, прибыль и реклама',
    en: 'Sales, customers, profit, and ads',
  },
  office: {
    ky: 'Команда, управление и решения',
    ru: 'Команда, управление и решения',
    en: 'Team, management, and decisions',
  },
  investments: {
    ky: 'Риск, активы и капитал',
    ru: 'Риск, активы и капитал',
    en: 'Risk, assets, and capital',
  },
}

const moduleCopy = {
  progressTitle: { ky: 'Прогресс раздела', ru: 'Прогресс раздела', en: 'Section progress' },
  missions: { ky: 'Миссии', ru: 'Миссии', en: 'Missions' },
  doneText: {
    ky: (done, total) => `${done} из ${total} миссий пройдено`,
    ru: (done, total) => `${done} из ${total} миссий пройдено`,
    en: (done, total) => `${done} of ${total} missions completed`,
  },
}

function BankPage({ language, missions, module, notice, t, onBack, onOpenMission }) {
  const completedCount = missions.filter((mission) => mission.status === 'completed').length
  const progressPercent = Math.round((completedCount / missions.length) * 100)
  const subtitle = moduleSubtitles[module.id]?.[language] || module.description[language]

  return (
    <section className={`module-app-screen module-screen-${module.id}`}>
      <header className="module-topbar">
        <button className="module-back-button" onClick={onBack} type="button" aria-label={t.back}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19 12H5" />
            <path d="m12 19-7-7 7-7" />
          </svg>
        </button>

        <div className="module-title-block">
          <h1>{module.title[language]}</h1>
          <p>{subtitle}</p>
        </div>
      </header>

      <section className="module-hero" aria-hidden="true">
        <span className="module-skyline" />
        <span className="module-hero-glow" />
        <span className="module-hero-shadow" />
        <img src={module.image} alt="" loading="lazy" />
      </section>

      <section className="module-progress-card">
        <div className="module-progress-head">
          <span>{moduleCopy.progressTitle[language]}</span>
          <strong>{progressPercent}%</strong>
        </div>
        <div className="module-progress-track" aria-hidden="true">
          <span style={{ width: `${progressPercent}%` }} />
        </div>
        <p>{moduleCopy.doneText[language](completedCount, missions.length)}</p>
      </section>

      {notice && <div className="success-message">{notice}</div>}

      <section className="module-missions-section">
        <h2>{moduleCopy.missions[language]}</h2>
        <div className="module-missions-list">
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
        </div>
      </section>
    </section>
  )
}

export default BankPage
