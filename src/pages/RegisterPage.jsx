import { useState } from 'react'

const initialForm = {
  name: '',
  email: '',
  password: '',
}

function RegisterPage({
  language,
  t,
  theme,
  onChangeLanguage,
  onLogin,
  onRegister,
  onToggleTheme,
}) {
  const [mode, setMode] = useState('register')
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState('')
  const isRegister = mode === 'register'

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
    setError('')
  }

  const validate = () => {
    if (isRegister && !form.name.trim()) return t.errorNameRequired
    if (!form.email.includes('@')) return t.errorEmailInvalid
    if (isRegister && form.password.length < 4) return t.errorPasswordShort
    if (!isRegister && !form.password) return t.errorPasswordRequired
    return ''
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const validationError = validate()
    if (validationError) {
      setError(validationError)
      return
    }

    if (isRegister) {
      onRegister({ name: form.name.trim(), email: form.email.trim() })
      return
    }

    onLogin({ email: form.email.trim() })
  }

  const switchMode = () => {
    setMode(isRegister ? 'login' : 'register')
    setError('')
  }

  return (
    <main className="auth-shell">
      <section className="auth-card">
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

        <div className="auth-heading">
          <span className="section-kicker">{isRegister ? t.register : t.login}</span>
          <h1>{isRegister ? t.registerTitle : t.loginTitle}</h1>
          <p>{isRegister ? t.registerSubtitle : t.loginSubtitle}</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {isRegister && (
            <label>
              <span>{t.name}</span>
              <input
                value={form.name}
                onChange={(event) => updateField('name', event.target.value)}
                placeholder={t.namePlaceholder}
              />
            </label>
          )}

          <label>
            <span>{t.email}</span>
            <input
              value={form.email}
              onChange={(event) => updateField('email', event.target.value)}
              placeholder="name@example.com"
              type="email"
            />
          </label>

          <label>
            <span>{t.password}</span>
            <input
              value={form.password}
              onChange={(event) => updateField('password', event.target.value)}
              placeholder={t.passwordPlaceholder}
              type="password"
            />
          </label>

          {error && <div className="form-error">{error}</div>}

          <button className="primary-button wide" type="submit">
            {isRegister ? t.register : t.login}
          </button>
        </form>

        <button className="auth-switch" onClick={switchMode} type="button">
          {isRegister ? t.alreadyHaveAccount : t.noAccount}
        </button>
      </section>
    </main>
  )
}

export default RegisterPage
