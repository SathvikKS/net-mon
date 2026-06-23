import { Check, Monitor, Moon, Sun } from "lucide-react"
import { useState } from "react"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

const modes = [
  { value: "light" as const, label: "Light", icon: Sun },
  { value: "dark" as const, label: "Dark", icon: Moon },
  { value: "system" as const, label: "System", icon: Monitor },
] as const

export function ThemeModeSwitch() {
  const { theme, setTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const current = modes.find((mode) => mode.value === theme) ?? modes[2]
  const CurrentIcon = current.icon

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          className="rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
          aria-label={`Theme: ${current.label}`}
        >
          <CurrentIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-36 p-1">
        {modes.map(({ value, label, icon: Icon }) => (
          <button
            key={value}
            type="button"
            onClick={() => {
              setTheme(value)
              setOpen(false)
            }}
            className={cn(
              "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-muted",
              theme === value && "bg-muted"
            )}
          >
            <Icon className="size-4 shrink-0 text-muted-foreground" />
            <span className="flex-1 text-left">{label}</span>
            {theme === value && <Check className="size-4 shrink-0" />}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  )
}
