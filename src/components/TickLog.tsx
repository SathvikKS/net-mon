import { List, Trash2, Clock } from "lucide-react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TickRow } from "./TickRow"
import type { TickData } from "@/types"

interface TickLogProps {
  history: TickData[]
  clearHistory: () => void
}

export const TickLog = ({ history, clearHistory }: TickLogProps) => {
  return (
    <div className="flex flex-1 flex-col">
      <Card className="flex min-h-[500px] flex-1 flex-col gap-0 py-0 shadow-sm lg:h-full lg:min-h-0">
        {/* TICK LOG HEADER */}
        <CardHeader className="relative z-10 !space-y-0 rounded-t-xl border-b border-slate-100 bg-white px-4 !py-3 shadow-sm sm:px-6 dark:border-slate-800 dark:bg-slate-950">
          <div className="flex w-full flex-row items-center justify-between gap-2">
            <div className="flex flex-col gap-1 overflow-hidden sm:flex-row sm:items-center sm:gap-4">
              <div className="flex shrink-0 items-center gap-2">
                <List className="h-4 w-4 text-slate-500" />
                <CardTitle className="text-base sm:text-lg">Tick Log</CardTitle>
                <Badge variant="secondary" className="font-mono text-[10px]">
                  {history.length} / 100
                </Badge>
              </div>
              <div className="hidden h-4 w-px shrink-0 bg-slate-200 sm:block dark:bg-slate-800" />
              <CardDescription className="truncate text-xs sm:text-sm">
                Live network latency history
              </CardDescription>
            </div>

            <Button
              variant="destructive"
              size="sm"
              onClick={clearHistory}
              disabled={history.length === 0}
              className="h-9 shrink-0 px-3"
            >
              <Trash2 className="h-4 w-4 sm:mr-1.5" />
              <span className="hidden sm:inline">Clear Log</span>
            </Button>
          </div>
        </CardHeader>

        <CardContent className="relative flex-1 overflow-hidden bg-slate-50/30 p-0 dark:bg-slate-950">
          {history.length === 0 ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-slate-400">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                <Clock className="h-8 w-8 opacity-40" />
              </div>
              <p className="font-medium text-slate-600 dark:text-slate-300">
                Awaiting Data
              </p>
              <p className="mt-1 max-w-[200px] text-sm">
                Start the monitor to record network latency ticks here.
              </p>
            </div>
          ) : (
            <div className="custom-scrollbar absolute inset-0 space-y-2 overflow-y-auto p-3 sm:p-4">
              {history.map((tick, index) => (
                <TickRow key={tick.id} tick={tick} isFirst={index === 0} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .custom-scrollbar::-webkit-scrollbar {
              width: 6px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: transparent;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background-color: #cbd5e1;
              border-radius: 10px;
            }
            .dark .custom-scrollbar::-webkit-scrollbar-thumb {
              background-color: #334155;
            }
          `,
        }}
      />
    </div>
  )
}
