const languages = ['ky', 'ru', 'en']

function MenuPage({
  language,
  streak,
  t,
  theme,
  onChangeLanguage,
  onClose,
  onLogout,
  onOpenProfile,
  onToggleTheme,
}) {
  const activeDots = Math.min(streak.streakCount, 7)
  const streakText = t.streakDays.replace('{days}', streak.streakCount)
  const serviceItems = [
    { icon: 'P', title: t.profile, subtitle: t.profileSubtitle, onClick: onOpenProfile },
    { icon: '!', title: t.notifications, subtitle: t.notificationsSubtitle },
    { icon: '?', title: t.helpSupport, subtitle: t.helpSupportSubtitle },
    { icon: 'i', title: t.aboutApp, subtitle: t.version },
    { icon: '§', title: t.termsPrivacy, subtitle: t.termsPrivacySubtitle },
    { icon: '@', title: t.contactUs, subtitle: t.contactUsSubtitle },
  ]

  return (
    <section className="menu-app-screen">
      <header className="menu-header">
        <h1>{t.menu}</h1>
        <button className="menu-close-button" type="button" onClick={onClose} aria-label={t.back}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </header>

      <section className="menu-control-card">
        <span className="menu-control-icon" aria-hidden="true">◎</span>
        <div className="menu-control-content">
          <h2>{t.changeLanguage}</h2>
          <div className="menu-segmented">
            {languages.map((item) => (
              <button
                className={language === item ? 'active' : ''}
                key={item}
                type="button"
                onClick={() => onChangeLanguage(item)}
              >
                {item.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="menu-control-card">
        <span className="menu-control-icon" aria-hidden="true">◌</span>
        <div className="menu-control-content">
          <h2>{t.changeTheme}</h2>
          <div className="menu-segmented two">
            <button className={theme === 'light' ? 'active' : ''} type="button" onClick={() => theme !== 'light' && onToggleTheme()}>
              ☼ {t.lightTheme}
            </button>
            <button className={theme === 'dark' ? 'active' : ''} type="button" onClick={() => theme !== 'dark' && onToggleTheme()}>
              ● {t.darkTheme}
            </button>
          </div>
        </div>
      </section>

      <section className={`menu-streak-card ${streak.studiedToday ? 'studied' : ''}`}>
        <div className="menu-fire" aria-hidden="true">🔥</div>
        <div className="menu-streak-copy">
          <h2>{streakText}</h2>
          <p>{t.streakMenuSubtitle}</p>
          <div className="menu-streak-dots" aria-hidden="true">
            {Array.from({ length: 7 }).map((_, index) => (
              <span className={index < activeDots ? 'active' : ''} key={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="menu-list">
        {serviceItems.map((item) => (
          <button className="menu-list-item" key={item.title} type="button" onClick={item.onClick}>
            <span className="menu-list-icon" aria-hidden="true">{item.icon}</span>
            <span>
              <strong>{item.title}</strong>
              <small>{item.subtitle}</small>
            </span>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        ))}

        <button className="menu-list-item logout" type="button" onClick={onLogout}>
          <span className="menu-list-icon" aria-hidden="true">↪</span>
          <span>
            <strong>{t.logout}</strong>
            <small>{t.logoutSubtitle}</small>
          </span>
        </button>
      </section>
    </section>
  )
}

export default MenuPage
