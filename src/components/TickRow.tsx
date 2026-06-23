import { memo } from "react"
import { Wifi, WifiOff } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { TickData } from "@/types"

interface TickRowProps {
  tick: TickData
  isFirst: boolean
}

export const TickRow = memo(({ tick, isFirst }: TickRowProps) => {
  return (
    <div
      className={`flex items-center justify-between rounded-xl border p-3 transition-all ${
        isFirst
          ? "border-border bg-card shadow-sm ring-1 ring-foreground/5"
          : "border-transparent bg-muted/50 hover:border-border"
      }`}
    >
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
          {tick.isOnline ? (
            <Wifi className="h-4 w-4 text-emerald-500" />
          ) : (
            <WifiOff className="h-4 w-4 text-red-500" />
          )}
        </div>
        <div className="flex flex-col">
          <span className="font-mono text-xs font-medium text-foreground sm:text-sm">
            {tick.timestamp}
          </span>
          <span className="text-[10px] text-muted-foreground sm:text-xs md:hidden">
            {tick.isOnline ? "Online" : "Offline"}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:block">
          {tick.isOnline ? (
            <Badge variant="success">Online</Badge>
          ) : (
            <Badge variant="destructive">Offline</Badge>
          )}
        </div>
        <div className="flex min-w-[70px] items-center justify-end font-mono text-sm font-semibold text-foreground sm:text-base">
          {tick.latency}
          <span className="ml-0.5 text-xs font-normal text-muted-foreground">ms</span>
        </div>
      </div>
    </div>
  )
})

TickRow.displayName = "TickRow"
