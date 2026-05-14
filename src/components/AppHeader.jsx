function AppHeader({
  language,
  streak,
  t,
  theme,
  onChangeLanguage,
  onGoHome,
  onToggleTheme,
}) {
  const streakTitle = streak.studiedToday
    ? t.studiedToday
    : streak.streakCount > 0
      ? t.notStudiedToday
      : t.streakNotStarted

  return (
    <header className="app-header">
      <div className="app-header-main">
        <button className="brand-button" onClick={onGoHome} type="button">
          <span className="brand-mark">FL</span>
          <span>{t.appTitle}</span>
        </button>

        <div className="header-controls">
          <div
            className={streak.studiedToday ? 'streak-pill active' : 'streak-pill'}
            title={streakTitle}
            aria-label={streakTitle}
          >
            <span aria-hidden="true">🔥</span>
            <strong>{streak.streakCount}</strong>
          </div>
          <select
            aria-label={t.language}
            value={language}
            onChange={(event) => onChangeLanguage(event.target.value)}
          >
            <option value="ky">KY</option>
            <option value="ru">RU</option>
            <option value="en">EN</option>
          </select>
          <button className="icon-button" onClick={onToggleTheme} type="button" aria-label={t.theme}>
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>

    </header>
  )
}

export default AppHeader
