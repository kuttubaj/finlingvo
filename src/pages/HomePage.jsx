import BuildingCard from '../components/BuildingCard.jsx'

function HomePage({ language, modules, recommendedMission, t, onOpenModule, userName }) {
  return (
    <section className="page">
      <header className="home-intro">
        <span className="section-kicker">{t.home}</span>
        <h1>{t.greeting}, {userName}</h1>
        <p>{t.homePrompt}</p>
      </header>

      <section className="section-block">
        <div className="section-heading">
          <div>
            <span>{t.modules}</span>
            <h2>{t.modules}</h2>
          </div>
        </div>

        <div className="modules-grid">
          {modules.map((module) => (
            <BuildingCard
              key={module.id}
              language={language}
              module={module}
              t={t}
              onClick={() => onOpenModule(module)}
            />
          ))}
        </div>
      </section>

      <section className="recommended-card">
        <div>
          <span className="section-kicker">{t.recommendedMission}</span>
          <h2>{recommendedMission ? recommendedMission.title[language] : t.allModulesDone}</h2>
          <p>{recommendedMission ? recommendedMission.description[language] : t.noActiveMission}</p>
        </div>
      </section>
    </section>
  )
}

export default HomePage
