import { useState } from 'react'

function OnboardingPage({ language, t, theme, onChangeLanguage, onComplete, onToggleTheme }) {
  const [slideIndex, setSlideIndex] = useState(0)
  const slides = [
    {
      icon: '◼',
      title: t.onboardingTitle1,
      description: t.onboardingText1,
    },
    {
      icon: '◆',
      title: t.onboardingTitle2,
      description: t.onboardingText2,
    },
    {
      icon: '●',
      title: t.onboardingTitle3,
      description: t.onboardingText3,
    },
  ]
  const currentSlide = slides[slideIndex]
  const isFirst = slideIndex === 0
  const isLast = slideIndex === slides.length - 1

  return (
    <main className="auth-shell">
      <section className="onboarding-card">
        <div className="auth-topbar">
          <div className="welcome-brand">
            <span className="brand-mark">FL</span>
            <strong>{t.appTitle}</strong>
          </div>
          <div className="header-controls">
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

        <div className="onboarding-visual" aria-hidden="true">
          <span>{currentSlide.icon}</span>
        </div>

        <div className="onboarding-copy">
          <h1>{currentSlide.title}</h1>
          <p>{currentSlide.description}</p>
        </div>

        <div className="onboarding-dots" aria-label={t.onboardingProgress}>
          {slides.map((slide, index) => (
            <button
              className={index === slideIndex ? 'dot active' : 'dot'}
              key={slide.title}
              onClick={() => setSlideIndex(index)}
              type="button"
              aria-label={`${index + 1}`}
            />
          ))}
        </div>

        <div className="onboarding-actions">
          <button className="secondary-button" onClick={onComplete} type="button">
            {t.skip}
          </button>
          <div>
            {!isFirst && (
              <button
                className="secondary-button"
                onClick={() => setSlideIndex((current) => current - 1)}
                type="button"
              >
                {t.back}
              </button>
            )}
            <button
              className="primary-button"
              onClick={() => (isLast ? onComplete() : setSlideIndex((current) => current + 1))}
              type="button"
            >
              {isLast ? t.start : t.next}
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}

export default OnboardingPage
