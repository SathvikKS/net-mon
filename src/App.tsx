import { useState, useEffect, useRef, useCallback } from "react"
import { Activity } from "lucide-react"
import { ThemeModeSwitch } from "@/components/ThemeModeSwitch"
import { StatusCard } from "@/components/StatusCard"
import { StatsCard } from "@/components/StatsCard"
import { TickLog } from "@/components/TickLog"
import type { TickData, SessionStats, ConnectionStatus } from "@/types"

export default function App() {
  const [isMonitoring, setIsMonitoring] = useState<boolean>(false)
  const [currentStatus, setCurrentStatus] = useState<ConnectionStatus>("idle")
  const [history, setHistory] = useState<TickData[]>([])
  const [stats, setStats] = useState<SessionStats>({
    total: 0,
    online: 0,
    offline: 0,
    skipped: 0,
  })
  const [tickSpeed, setTickSpeed] = useState<number>(1)

  const isCheckingRef = useRef<boolean>(false)
  const wasMonitoringRef = useRef<boolean>(false)

  useEffect(() => {
    fetch("https://www.google.com/generate_204", {
      mode: "no-cors",
      cache: "no-store",
    }).catch(() => {})
  }, [])

  const performCheck = useCallback(async () => {
    if (isCheckingRef.current) {
      setStats((prev) => ({ ...prev, skipped: prev.skipped + 1 }))
      return
    }

    isCheckingRef.current = true
    const startTime = Date.now()
    let isOnline = false

    try {
      await fetch("https://www.google.com/generate_204", {
        mode: "no-cors",
        cache: "no-store",
      })
      isOnline = true
    } catch {
      isOnline = false
    } finally {
      const endTime = Date.now()
      const latency = endTime - startTime
      const timestamp = new Date().toLocaleTimeString([], {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })

      setCurrentStatus(isOnline ? "online" : "offline")

      setStats((prev) => ({
        ...prev,
        total: prev.total + 1,
        online: isOnline ? prev.online + 1 : prev.online,
        offline: !isOnline ? prev.offline + 1 : prev.offline,
      }))

      setHistory((prev) => {
        const newHistory = [
          { id: Date.now(), timestamp, isOnline, latency },
          ...prev,
        ]
        return newHistory.slice(0, 100)
      })

      isCheckingRef.current = false
    }
  }, [])

  useEffect(() => {
    if (isMonitoring) {
      if (!wasMonitoringRef.current) performCheck()
      const intervalId = setInterval(performCheck, tickSpeed * 1000)
      wasMonitoringRef.current = true
      return () => clearInterval(intervalId)
    } else {
      wasMonitoringRef.current = false
    }
  }, [isMonitoring, tickSpeed, performCheck])

  const toggleMonitoring = useCallback(() => {
    setIsMonitoring((prev) => {
      const next = !prev
      if (!next) {
        setCurrentStatus("idle")
      }
      return next
    })
  }, [])

  const clearHistory = useCallback(() => {
    setHistory([])
    setStats({ total: 0, online: 0, offline: 0, skipped: 0 })
    if (!isMonitoring) {
      setCurrentStatus("idle")
    }
  }, [isMonitoring])

  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-muted">
      {/* HEADER */}
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background/80 px-4 py-4 backdrop-blur-md sm:px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Activity className="h-5 w-5 text-primary-foreground" />
          </div>
          <h1 className="text-lg font-bold tracking-tight">NetMonitor</h1>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeModeSwitch />
          <div className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
            v{__APP_VERSION__}
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-6 p-4 sm:p-6 lg:flex-row lg:p-8">
        {/* LEFT COLUMN: Controls & Stats */}
        <div className="flex h-fit w-full flex-col gap-6 lg:sticky lg:top-24 lg:w-[380px] lg:shrink-0">
          <StatusCard
            currentStatus={currentStatus}
            isMonitoring={isMonitoring}
            toggleMonitoring={toggleMonitoring}
            tickSpeed={tickSpeed}
            setTickSpeed={setTickSpeed}
          />
          <StatsCard stats={stats} />
        </div>

        {/* RIGHT COLUMN: History Log */}
        <TickLog history={history} clearHistory={clearHistory} />
      </main>
    </div>
  )
}
