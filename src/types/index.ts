export interface TickData {
  id: number
  timestamp: string
  isOnline: boolean
  latency: number
}

export interface SessionStats {
  total: number
  online: number
  offline: number
  skipped: number
}

export type ConnectionStatus = "idle" | "online" | "offline"
