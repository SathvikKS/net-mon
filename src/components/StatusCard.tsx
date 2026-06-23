import { useMemo } from "react"
import { Wifi, WifiOff, Activity, Play, Square, Settings2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import type { ConnectionStatus } from "@/types"

interface StatusCardProps {
  currentStatus: ConnectionStatus
  isMonitoring: boolean
  toggleMonitoring: () => void
  tickSpeed: number
  setTickSpeed: (speed: number) => void
}

export const StatusCard = ({
  currentStatus,
  isMonitoring,
  toggleMonitoring,
  tickSpeed,
  setTickSpeed,
}: StatusCardProps) => {
  const display = useMemo(() => {
    switch (currentStatus) {
      case "online":
        return {
          title: "Online",
          subtitle: "Active Uplink Established",
          icon: <Wifi className="h-8 w-8 text-emerald-500 sm:h-10 sm:w-10" />,
          color: "text-emerald-500",
          bgRing: "bg-emerald-500/10",
          pulse: "animate-pulse",
        }
      case "offline":
        return {
          title: "Offline",
          subtitle: "No Active Uplink",
          icon: <WifiOff className="h-8 w-8 text-red-500 sm:h-10 sm:w-10" />,
          color: "text-red-500",
          bgRing: "bg-red-500/10",
          pulse: "",
        }
      default:
        return {
          title: "Standby",
          subtitle: "Monitoring Paused",
          icon: <Activity className="h-8 w-8 text-muted-foreground sm:h-10 sm:w-10" />,
          color: "text-foreground",
          bgRing: "bg-muted",
          pulse: "",
        }
    }
  }, [currentStatus])

  return (
    <Card className="overflow-hidden border-0 pt-0 shadow-md ring-1 ring-border">
      <div
        className={`h-1.5 w-full transition-colors duration-500 ${
          currentStatus === "online"
            ? "bg-emerald-500"
            : currentStatus === "offline"
              ? "bg-red-500"
              : "bg-muted"
        }`}
      />

      <CardContent className="p-6">
        <div className="mt-2 mb-6 flex flex-col items-center text-center">
          <div
            className={`relative mb-4 flex h-20 w-20 items-center justify-center rounded-full sm:h-24 sm:w-24 ${display.bgRing} transition-colors duration-500`}
          >
            {currentStatus === "online" && (
              <div
                className="absolute inset-0 animate-ping rounded-full border-2 border-emerald-500/30"
                style={{ animationDuration: `${tickSpeed}s` }}
              />
            )}
            <div className={display.pulse}>{display.icon}</div>
          </div>
          <h2
            className={`text-2xl font-bold tracking-tight sm:text-3xl ${display.color}`}
          >
            {display.title}
          </h2>
          <p className="mt-1 text-sm font-medium text-muted-foreground">
            {display.subtitle}
          </p>
        </div>

        <div className="space-y-5">
          <Button
            onClick={toggleMonitoring}
            variant={isMonitoring ? "outline" : "default"}
            className="w-full text-base shadow-sm sm:text-sm"
          >
            {isMonitoring ? (
              <>
                <Square className="mr-2 h-4 w-4" /> Stop Monitor
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" /> Start Monitor
              </>
            )}
          </Button>

          <div className="rounded-xl border border-border bg-muted/50 p-4">
            <div className="mb-3 flex items-center justify-between">
              <label className="flex items-center text-sm font-semibold text-foreground">
                <Settings2 className="mr-1.5 h-4 w-4 text-muted-foreground" />
                Tick Interval
              </label>
              <span className="rounded border border-border bg-background px-2 py-0.5 font-mono text-sm font-medium text-muted-foreground shadow-sm">
                {tickSpeed}s
              </span>
            </div>

            <div className="px-1 py-2">
              <Slider
                min={1}
                max={100}
                value={[tickSpeed]}
                onValueChange={(val) => setTickSpeed(val[0])}
              />
            </div>
            <div className="mt-1.5 flex justify-between px-1 text-[11px] font-medium text-muted-foreground">
              <span>Fast (1s)</span>
              <span>Slow (100s)</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
