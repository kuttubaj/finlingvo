function BottomNav({ currentScreen, t, onGoHome, onGoModules, onGoProfile }) {
  return (
    <nav className="bottom-nav" aria-label={t.mainNavigation}>
      <button
        className={currentScreen === 'home' ? 'nav-item active' : 'nav-item'}
        onClick={onGoHome}
        type="button"
      >
        {t.home}
      </button>
      <button
        className={currentScreen === 'module' ? 'nav-item active' : 'nav-item'}
        onClick={onGoModules}
        type="button"
      >
        {t.modules}
      </button>
      <button
        className={currentScreen === 'profile' ? 'nav-item active' : 'nav-item'}
        onClick={onGoProfile}
        type="button"
      >
        {t.profile}
      </button>
    </nav>
  )
}

export default BottomNav
