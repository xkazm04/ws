import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { ScrollArea } from '@/components/ui/scroll-area'
import { CircleIcon, ListIcon, XIcon, CheckIcon } from 'lucide-react'
import { Tutorial } from '@/data/tutorialData'
import { cn } from '@/lib/utils'

interface SidebarProps {
  tutorial: Tutorial
  activeChapterId: string
  onChapterSelect: (chapterId: string) => void
  chapterProgress: Record<string, boolean>
  collapsed: boolean
  onToggleCollapse: () => void
  progressPercentage: number
  completedCount: number
  totalCount: number
}

export function Sidebar({
  tutorial,
  activeChapterId,
  onChapterSelect,
  chapterProgress,
  collapsed,
  onToggleCollapse,
  progressPercentage,
  completedCount,
  totalCount
}: SidebarProps) {
  if (collapsed) {
    return (
      <div className="w-12 bg-card border-r border-border flex flex-col items-center py-4">
        <Button
          onClick={onToggleCollapse}
          variant="ghost"
          size="sm"
          className="p-2 h-8 w-8"
        >
          <ListIcon className="w-4 h-4" />
        </Button>
      </div>
    )
  }

  // Calculate chapter index across all categories
  let globalIndex = 0

  return (
    <div className="w-80 border-r border-border flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">
            {tutorial.title}
          </h2>
          <Button
            onClick={onToggleCollapse}
            variant="ghost"
            size="sm"
            className="p-2 h-8 w-8"
          >
            <XIcon className="w-4 h-4" />
          </Button>
        </div>

        <div className="text-sm text-muted-foreground mb-4">
          {typeof tutorial.description === 'string' ? (
            tutorial.description
          ) : (
            tutorial.description
          )}
        </div>

        {/* Progress Overview */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium text-foreground">
              {completedCount}/{totalCount} completed
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          <div className="text-xs text-muted-foreground">
            {progressPercentage}% complete
          </div>
        </div>
      </div>

      {/* Categories and Chapters */}
      <ScrollArea className="flex-1">
        <div className="p-4">
          {tutorial.categories.map((category) => (
            <div key={category.id} className="mb-6 last:mb-0">
              {/* Category Header */}
              <div className="mb-3">
                <h3 className="text-xs font-semibold text-muted-foreground tracking-wider uppercase mb-2">
                  {category.title}
                </h3>
                {/* Thin divider */}
                <div className="h-px bg-border" />
              </div>

              {/* Chapters in Category */}
              <div className="space-y-2">
                {category.chapters.map((chapter) => {
                  globalIndex++
                  const isActive = chapter.id === activeChapterId
                  const isCompleted = chapterProgress[chapter.id] || false

                  return (
                    <button
                      key={chapter.id}
                      onClick={() => onChapterSelect(chapter.id)}
                      className={cn(
                        "w-full text-left p-3 rounded-lg transition-all duration-200 group",
                        "hover:bg-accent/50 focus:outline-none focus:ring-2 focus:ring-ring",
                        isActive && "bg-accent/20 text-accent-foreground shadow-sm"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0">
                          {isCompleted ? (
                            <CheckIcon
                              className="w-5 h-5 text-primary"
                            />
                          ) : (
                            <CircleIcon
                              className={cn(
                                "w-5 h-5 transition-colors",
                                isActive ? "text-accent-foreground" : "text-muted-foreground"
                              )}
                            />
                          )}
                        </div>
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <span className={cn(
                            "text-xs font-mono px-1.5 py-0.5 rounded flex-shrink-0",
                            isActive
                              ? "bg-accent/50 text-accent-foreground"
                              : "bg-muted text-muted-foreground"
                          )}>
                            {String(globalIndex).padStart(2, '0')}
                          </span>
                          <h4 className={cn(
                            "font-medium text-sm leading-snug truncate",
                            isActive ? "text-accent-foreground" : "text-foreground"
                          )}>
                            {chapter.title}
                          </h4>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}