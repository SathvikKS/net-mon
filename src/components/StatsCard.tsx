import { useMemo } from "react"
import { Zap, CheckCircle2, XCircle, RefreshCcw } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import type { SessionStats } from "@/types"

interface StatsCardProps {
  stats: SessionStats
}

export const StatsCard = ({ stats }: StatsCardProps) => {
  // Memoize uptime percentage
  const uptimePercentage = useMemo(() => {
    return stats.total > 0
      ? Number(((stats.online / stats.total) * 100).toFixed(1))
      : 0
  }, [stats.total, stats.online])

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm tracking-wider text-muted-foreground uppercase">
          Session Stats
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-border bg-muted/50 p-3">
            <div className="mb-1 flex items-center text-[11px] text-muted-foreground">
              <Zap className="mr-1 h-3 w-3" /> Total
            </div>
            <div className="font-mono text-xl font-semibold">{stats.total}</div>
          </div>
          <div className="rounded-lg border border-emerald-100 bg-emerald-50 p-3 dark:border-emerald-500/20 dark:bg-emerald-500/10">
            <div className="mb-1 flex items-center text-[11px] text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="mr-1 h-3 w-3" /> Success
            </div>
            <div className="font-mono text-xl font-semibold text-emerald-700 dark:text-emerald-400">
              {stats.online}
            </div>
          </div>
          <div className="rounded-lg border border-red-100 bg-red-50 p-3 dark:border-red-500/20 dark:bg-red-500/10">
            <div className="mb-1 flex items-center text-[11px] text-red-600 dark:text-red-400">
              <XCircle className="mr-1 h-3 w-3" /> Failed
            </div>
            <div className="font-mono text-xl font-semibold text-red-700 dark:text-red-400">
              {stats.offline}
            </div>
          </div>
          <div className="rounded-lg border border-orange-100 bg-orange-50 p-3 dark:border-orange-500/20 dark:bg-orange-500/10">
            <div className="mb-1 flex items-center text-[11px] text-orange-600 dark:text-orange-400">
              <RefreshCcw className="mr-1 h-3 w-3" /> Skipped
            </div>
            <div className="font-mono text-xl font-semibold text-orange-700 dark:text-orange-400">
              {stats.skipped}
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-medium">
            <span className="text-muted-foreground">Uptime Reliability</span>
            <span
              className={
                uptimePercentage >= 95
                  ? "text-emerald-500"
                  : uptimePercentage >= 80
                    ? "text-orange-500"
                    : "text-red-500"
              }
            >
              {uptimePercentage}%
            </span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
            <div
              className={`h-full transition-all duration-500 ${
                stats.total === 0
                  ? "bg-transparent"
                  : uptimePercentage >= 95
                    ? "bg-emerald-500"
                    : uptimePercentage >= 80
                      ? "bg-orange-500"
                      : "bg-red-500"
              }`}
              style={{ width: `${uptimePercentage}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
