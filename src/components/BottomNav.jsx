function BottomNav({ currentScreen, t, onGoHome, onGoModules, onGoRating }) {
  const navItems = [
    {
      key: 'home',
      label: t.cityNav,
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 10.5 12 3l9 7.5" />
          <path d="M5 9.5V21h14V9.5" />
          <path d="M9 21v-6h6v6" />
        </svg>
      ),
      onClick: onGoHome,
      active: currentScreen === 'home',
    },
    {
      key: 'missions',
      label: t.missions,
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3 4 7v10l8 4 8-4V7l-8-4Z" />
          <path d="M12 21V11" />
          <path d="m4 7 8 4 8-4" />
        </svg>
      ),
      onClick: onGoModules,
      active: currentScreen === 'module' || currentScreen === 'mission' || currentScreen === 'result',
    },
    {
      key: 'capital',
      label: t.capital,
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3v18" />
          <path d="M17 6.5c-1.2-1-2.7-1.5-5-1.5-3 0-5 1.3-5 3.5S9 12 12 12s5 1.3 5 3.5S15 19 12 19c-2.4 0-4.2-.6-5.5-1.8" />
        </svg>
      ),
      onClick: onGoHome,
      active: false,
    },
    {
      key: 'rating',
      label: t.rating,
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3Z" />
        </svg>
      ),
      onClick: onGoRating,
      active: currentScreen === 'rating',
    },
  ]

  return (
    <nav className="bottom-nav" aria-label={t.mainNavigation}>
      {navItems.map((item) => (
        <button
          className={item.active ? 'nav-item active' : 'nav-item'}
          key={item.key}
          onClick={item.onClick}
          type="button"
        >
          {item.icon}
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  )
}

export default BottomNav
