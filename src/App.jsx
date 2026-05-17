import { useEffect, useMemo, useState } from 'react'
import BottomNav from './components/BottomNav.jsx'
import HomePage from './pages/HomePage.jsx'
import BankPage from './pages/BankPage.jsx'
import MissionPage from './pages/MissionPage.jsx'
import OnboardingPage from './pages/OnboardingPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import ResultPage from './pages/ResultPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import RatingPage from './pages/RatingPage.jsx'
import MenuPage from './pages/MenuPage.jsx'
import { initialProgress, missions, modules } from './data/mockData.js'
import { translations } from './i18n/translations.js'

const PROGRESS_KEY = 'finlingvo-progress'
const THEME_KEY = 'finlingvo-theme'
const LANGUAGE_KEY = 'finlingvo-language'
const AUTH_KEY = 'finlingvo-authenticated'
const USER_NAME_KEY = 'finlingvo-user-name'
const USER_KEY = 'finlingvo-user'
const ONBOARDING_KEY = 'finlingvo-onboarding-completed'
const STREAK_KEY = 'finlingvo-streak'
const initialStreak = {
  streakCount: 0,
  lastStudyDate: '',
}
const moduleOrder = modules.map((module) => module.id)

const screens = {
  home: 'home',
  module: 'module',
  mission: 'mission',
  result: 'result',
  profile: 'profile',
  rating: 'rating',
  menu: 'menu',
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

function readJson(key, fallback) {
  try {
    const saved = localStorage.getItem(key)
    return saved ? { ...fallback, ...JSON.parse(saved) } : fallback
  } catch {
    return fallback
  }
}

function normalizeProgress(savedProgress) {
  const legacyMissionIds = {
    1: 'bank-1',
    2: 'bank-2',
    3: 'bank-3',
    4: 'bank-4',
    5: 'bank-5',
    6: 'bank-6',
  }
  const missionIds = new Set(missions.map((mission) => mission.id))
  const completedMissionIds = (savedProgress.completedMissionIds || [])
    .map((id) => legacyMissionIds[id] || id)
    .filter((id) => missionIds.has(id))

  return {
    ...initialProgress,
    ...savedProgress,
    completedMissionIds: completedMissionIds.length
      ? [...new Set(completedMissionIds)]
      : initialProgress.completedMissionIds,
    capital: Number.isFinite(savedProgress.capital) ? savedProgress.capital : initialProgress.capital,
    reputation: clamp(
      Number.isFinite(savedProgress.reputation) ? savedProgress.reputation : initialProgress.reputation,
      0,
      100,
    ),
  }
}

function getLevel(completedCount) {
  if (completedCount >= 16) return 5
  if (completedCount >= 12) return 4
  if (completedCount >= 8) return 3
  if (completedCount >= 4) return 2
  return 1
}

function getModuleMissions(moduleId) {
  return missions.filter((mission) => mission.moduleId === moduleId)
}

function getModuleStatus(moduleId, completedMissionIds) {
  const index = moduleOrder.indexOf(moduleId)
  const moduleMissions = getModuleMissions(moduleId)
  const completedCount = moduleMissions.filter((mission) =>
    completedMissionIds.includes(mission.id),
  ).length

  if (completedCount === moduleMissions.length) return 'completed'
  if (index === 0) return 'active'

  const previousModuleId = moduleOrder[index - 1]
  const previousMissions = getModuleMissions(previousModuleId)
  const previousCompleted = previousMissions.every((mission) =>
    completedMissionIds.includes(mission.id),
  )

  return previousCompleted ? 'active' : 'locked'
}

function getMissionsWithStatus(moduleId, completedMissionIds) {
  const moduleMissions = getModuleMissions(moduleId)
  const firstIncomplete = moduleMissions.find(
    (mission) => !completedMissionIds.includes(mission.id),
  )

  return moduleMissions.map((mission) => {
    if (completedMissionIds.includes(mission.id)) return { ...mission, status: 'completed' }
    if (firstIncomplete?.id === mission.id) return { ...mission, status: 'active' }
    return { ...mission, status: 'locked' }
  })
}

function getDateKey(date = new Date()) {
  return date.toISOString().slice(0, 10)
}

function getYesterdayKey() {
  const date = new Date()
  date.setDate(date.getDate() - 1)
  return getDateKey(date)
}

function normalizeStreak(savedStreak) {
  const today = getDateKey()
  const yesterday = getYesterdayKey()
  const streakCount = Number.isFinite(savedStreak?.streakCount) ? savedStreak.streakCount : 0
  const lastStudyDate = savedStreak?.lastStudyDate || ''

  if (lastStudyDate === today) {
    return { streakCount, lastStudyDate, studiedToday: true }
  }

  if (lastStudyDate && lastStudyDate !== yesterday) {
    return { streakCount: 0, lastStudyDate, studiedToday: false }
  }

  return { streakCount, lastStudyDate, studiedToday: false }
}

function App() {
  const [screen, setScreen] = useState(screens.home)
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem(AUTH_KEY) === 'true',
  )
  const [onboardingCompleted, setOnboardingCompleted] = useState(
    () => localStorage.getItem(ONBOARDING_KEY) === 'true',
  )
  const [userName, setUserName] = useState(() => {
    const savedUser = readJson(USER_KEY, null)
    return savedUser?.name || localStorage.getItem(USER_NAME_KEY) || ''
  })
  const [progress, setProgress] = useState(() =>
    normalizeProgress(readJson(PROGRESS_KEY, initialProgress)),
  )
  const [streak, setStreak] = useState(() => normalizeStreak(readJson(STREAK_KEY, initialStreak)))
  const [theme, setTheme] = useState(() => localStorage.getItem(THEME_KEY) || 'light')
  const [language, setLanguage] = useState(() => localStorage.getItem(LANGUAGE_KEY) || 'ky')
  const [currentModuleId, setCurrentModuleId] = useState('bank')
  const [currentMissionId, setCurrentMissionId] = useState('bank-2')
  const [missionResult, setMissionResult] = useState(null)
  const [notice, setNotice] = useState('')
  const [previousScreen, setPreviousScreen] = useState(screens.home)

  const t = translations[language]
  const completedCount = progress.completedMissionIds.length
  const level = getLevel(completedCount)
  const totalMissions = missions.length
  const displayName = userName || t.defaultUserName

  const moduleStates = useMemo(
    () =>
      modules.map((module) => {
        const moduleMissions = getModuleMissions(module.id)
        const completed = moduleMissions.filter((mission) =>
          progress.completedMissionIds.includes(mission.id),
        ).length
        return {
          ...module,
          status: getModuleStatus(module.id, progress.completedMissionIds),
          completedCount: completed,
          totalCount: moduleMissions.length,
          progressPercent: Math.round((completed / moduleMissions.length) * 100),
        }
      }),
    [progress.completedMissionIds],
  )

  const currentModule = moduleStates.find((module) => module.id === currentModuleId) || moduleStates[0]
  const currentMissions = getMissionsWithStatus(currentModule.id, progress.completedMissionIds)
  const activeMission = currentMissions.find((mission) => mission.status === 'active')
  const currentMission =
    currentMissions.find((mission) => mission.id === currentMissionId) || activeMission

  const nextActionLabel = useMemo(() => {
    if (!missionResult?.mission) return t.nextMission
    const resultModuleId = missionResult.mission.moduleId
    const resultMissions = getMissionsWithStatus(resultModuleId, progress.completedMissionIds)
    const hasNextMission = resultMissions.some((mission) => mission.status === 'active')
    if (hasNextMission) return t.nextMission

    const resultModuleIndex = moduleOrder.indexOf(resultModuleId)
    if (moduleOrder[resultModuleIndex + 1]) return t.nextModule
    return t.allModulesDone
  }, [missionResult, progress.completedMissionIds, t])

  useEffect(() => {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress))
  }, [progress])

  useEffect(() => {
    localStorage.setItem(
      STREAK_KEY,
      JSON.stringify({
        streakCount: streak.streakCount,
        lastStudyDate: streak.lastStudyDate,
      }),
    )
  }, [streak])

  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme)
    document.documentElement.dataset.theme = theme
  }, [theme])

  useEffect(() => {
    localStorage.setItem(LANGUAGE_KEY, language)
  }, [language])

  useEffect(() => {
    localStorage.setItem(AUTH_KEY, String(isAuthenticated))
  }, [isAuthenticated])

  useEffect(() => {
    localStorage.setItem(ONBOARDING_KEY, String(onboardingCompleted))
  }, [onboardingCompleted])

  useEffect(() => {
    if (userName) localStorage.setItem(USER_NAME_KEY, userName)
  }, [userName])

  const openModule = (module) => {
    if (module.status === 'locked') return
    setCurrentModuleId(module.id)
    setNotice('')
    setScreen(screens.module)
  }

  const openMission = (mission) => {
    if (mission.status !== 'active') return
    setCurrentMissionId(mission.id)
    setScreen(screens.mission)
  }

  const finishMission = (mission) => {
    const alreadyCompleted = progress.completedMissionIds.includes(mission.id)
    const rewardCapital = alreadyCompleted ? 0 : mission.rewardCapital
    const rewardReputation = alreadyCompleted ? 0 : mission.rewardReputation

    if (!alreadyCompleted) {
      setProgress((current) => ({
        ...current,
        completedMissionIds: [...current.completedMissionIds, mission.id],
        capital: current.capital + rewardCapital,
        reputation: clamp(current.reputation + rewardReputation, 0, 100),
      }))
      setStreak((current) => {
        const today = getDateKey()
        const yesterday = getYesterdayKey()

        if (current.lastStudyDate === today) {
          return { ...current, studiedToday: true }
        }

        if (current.lastStudyDate === yesterday) {
          return {
            streakCount: current.streakCount + 1,
            lastStudyDate: today,
            studiedToday: true,
          }
        }

        return {
          streakCount: 1,
          lastStudyDate: today,
          studiedToday: true,
        }
      })
    }

    setMissionResult({ mission, rewardCapital, rewardReputation })
    setScreen(screens.result)
  }

  const handleWrongAnswer = () => {
    setProgress((current) => ({
      ...current,
      reputation: clamp(current.reputation - 1, 0, 100),
    }))
  }

  const goNext = () => {
    const updatedCompleted = progress.completedMissionIds
    const updatedMissions = getMissionsWithStatus(currentModuleId, updatedCompleted)
    const nextMission = updatedMissions.find((mission) => mission.status === 'active')

    if (nextMission) {
      setCurrentMissionId(nextMission.id)
      setScreen(screens.mission)
      return
    }

    const moduleIndex = moduleOrder.indexOf(currentModuleId)
    const nextModuleId = moduleOrder[moduleIndex + 1]
    if (nextModuleId) {
      const nextModule = moduleStates.find((module) => module.id === nextModuleId)
      setCurrentModuleId(nextModuleId)
      setNotice(nextModule?.status === 'locked' ? t.allMissionsDone : '')
      setScreen(screens.module)
      return
    }

    setNotice(t.allModulesDone)
    setScreen(screens.module)
  }

  const resetProgress = () => {
    const shouldReset = window.confirm(t.resetConfirm)
    if (!shouldReset) return
    localStorage.removeItem(PROGRESS_KEY)
    setProgress(initialProgress)
    setCurrentModuleId('bank')
    setCurrentMissionId('bank-2')
    setMissionResult(null)
    setNotice('')
    setScreen(screens.home)
  }

  const restoreReputation = () => {
    setProgress((current) => ({
      ...current,
      reputation: clamp(current.reputation + 2, 0, 100),
    }))
  }

  const completeOnboarding = () => {
    setOnboardingCompleted(true)
  }

  const registerUser = (user) => {
    const normalizedUser = {
      name: user.name || t.defaultUserName,
      email: user.email,
    }
    localStorage.setItem(USER_KEY, JSON.stringify(normalizedUser))
    localStorage.setItem(USER_NAME_KEY, normalizedUser.name)
    setUserName(normalizedUser.name)
    setIsAuthenticated(true)
    setScreen(screens.home)
  }

  const loginUser = (user) => {
    const savedUser = readJson(USER_KEY, null)
    const nextUser = savedUser || {
      name: user.email.split('@')[0] || t.defaultUserName,
      email: user.email,
    }
    localStorage.setItem(USER_KEY, JSON.stringify(nextUser))
    localStorage.setItem(USER_NAME_KEY, nextUser.name)
    setUserName(nextUser.name)
    setIsAuthenticated(true)
    setScreen(screens.home)
  }

  const logout = () => {
    setIsAuthenticated(false)
    localStorage.setItem(AUTH_KEY, 'false')
    setScreen(screens.home)
  }

  const openMenu = () => {
    setPreviousScreen(screen === screens.menu ? previousScreen : screen)
    setScreen(screens.menu)
  }

  const closeMenu = () => {
    setScreen(previousScreen || screens.home)
  }

  if (!isAuthenticated && !onboardingCompleted) {
    return (
      <OnboardingPage
        language={language}
        t={t}
        theme={theme}
        onChangeLanguage={setLanguage}
        onComplete={completeOnboarding}
        onToggleTheme={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      />
    )
  }

  if (!isAuthenticated) {
    return (
      <RegisterPage
        language={language}
        t={t}
        theme={theme}
        onChangeLanguage={setLanguage}
        onLogin={loginUser}
        onRegister={registerUser}
        onToggleTheme={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      />
    )
  }

  return (
    <div className={`app-shell screen-${screen}`}>
      <main className="app-main">
        {screen === screens.home && (
          <HomePage
            language={language}
            modules={moduleStates}
            progress={{ ...progress, level }}
            streak={streak}
            t={t}
            onOpenMenu={openMenu}
            onOpenModule={openModule}
          />
        )}

        {screen === screens.module && (
          <BankPage
            language={language}
            missions={currentMissions}
            module={currentModule}
            notice={notice}
            t={t}
            onBack={() => setScreen(screens.home)}
            onOpenMission={openMission}
          />
        )}

        {screen === screens.mission && currentMission && (
          <MissionPage
            language={language}
            mission={currentMission}
            missionIndex={currentMissions.findIndex((mission) => mission.id === currentMission.id) + 1}
            totalMissions={currentMissions.length}
            t={t}
            onBack={() => setScreen(screens.module)}
            onSubmit={finishMission}
            onWrongAnswer={handleWrongAnswer}
          />
        )}

        {screen === screens.result && (
          <ResultPage
            language={language}
            nextActionLabel={nextActionLabel}
            progress={{ ...progress, level }}
            result={missionResult}
            t={t}
            onBackToModule={() => setScreen(screens.module)}
            onContinue={goNext}
          />
        )}

        {screen === screens.profile && (
          <ProfilePage
            progress={{ ...progress, level }}
            t={t}
            streak={streak}
            totalCompletedMissions={completedCount}
            totalMissions={totalMissions}
            userName={displayName}
            onBack={() => setScreen(previousScreen === screens.menu ? screens.menu : screens.home)}
            onOpenMenu={openMenu}
            onLogout={logout}
            onResetProgress={resetProgress}
            onRestoreReputation={restoreReputation}
          />
        )}

        {screen === screens.rating && (
          <RatingPage
            progress={progress}
            streak={streak}
            t={t}
            userName={displayName}
            onOpenMenu={openMenu}
          />
        )}

        {screen === screens.menu && (
          <MenuPage
            language={language}
            streak={streak}
            t={t}
            theme={theme}
            onChangeLanguage={setLanguage}
            onClose={closeMenu}
            onLogout={logout}
            onOpenProfile={() => {
              setPreviousScreen(screens.menu)
              setScreen(screens.profile)
            }}
            onToggleTheme={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          />
        )}
      </main>

      {(screen === screens.home || screen === screens.rating) && (
        <BottomNav
          currentScreen={screen}
          t={t}
          onGoHome={() => setScreen(screens.home)}
          onGoModules={() => setScreen(screens.module)}
          onGoRating={() => setScreen(screens.rating)}
        />
      )}
    </div>
  )
}

export default App
