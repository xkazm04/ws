import React, { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ArrowLeftIcon, CheckIcon, ArrowRightIcon } from 'lucide-react'
import { Chapter, tutorialData } from '@/data/tutorialData'
import { MarkdownRenderer } from '@/components/MarkdownRenderer'
import { MainDemo } from '@/components/main/MainDemo'
import { DEMO_GIF_CONFIG } from '@/config/demoGifs'
import { cn } from '@/lib/utils'

// Helper function to flatten chapters from categories
const getAllChapters = () => {
  return tutorialData.categories.flatMap(category => category.chapters)
}

interface MainContentProps {
  chapter: Chapter
  onToggleProgress: (chapterId: string) => void
  isCompleted: boolean
  sidebarCollapsed: boolean
  onChapterSelect: (chapterId: string) => void
}

export function MainContent({
  chapter,
  onToggleProgress,
  isCompleted,
  sidebarCollapsed,
  onChapterSelect
}: MainContentProps) {
  // Check if current chapter has a demo GIF available
  const demoGifUrl = DEMO_GIF_CONFIG[chapter.id]
  const hasDemoGif = Boolean(demoGifUrl)
  
  const [demoExpanded, setDemoExpanded] = useState(hasDemoGif) // Show demo panel only if GIF exists
  const [demoWidth, setDemoWidth] = useState(50) // Percentage width
  
  // Update demo expansion state when chapter changes
  React.useEffect(() => {
    setDemoExpanded(hasDemoGif)
  }, [hasDemoGif])
  
  // Find current chapter index for navigation using flattened chapters
  const allChapters = getAllChapters()
  const currentIndex = allChapters.findIndex(ch => ch.id === chapter.id)
  const hasPreviousChapter = currentIndex > 0
  const hasNextChapter = currentIndex < allChapters.length - 1
  const previousChapter = hasPreviousChapter ? allChapters[currentIndex - 1] : null
  const nextChapter = hasNextChapter ? allChapters[currentIndex + 1] : null



  const goToPreviousChapter = () => {
    if (previousChapter) {
      onChapterSelect(previousChapter.id)
    }
  }

  const goToNextChapter = () => {
    if (nextChapter) {
      onChapterSelect(nextChapter.id)
    }
  }

  const handleCompleteAndNext = () => {
    onToggleProgress(chapter.id)
    if (nextChapter) {
      onChapterSelect(nextChapter.id)
    }
  }

  return (
    <div className="flex-1 flex relative">
      {/* Main Content Area */}
      <div className={cn(
        "flex flex-col transition-all duration-300 ease-in-out flex-1 min-w-0",
        hasDemoGif && demoExpanded && "flex-shrink"
      )}>
        <ScrollArea className="flex-1 h-full">
          <div className={cn(
            "max-w-4xl mx-auto px-8 py-8 pb-24 min-h-full",
            sidebarCollapsed && "max-w-5xl"
          )}>
            <MarkdownRenderer content={chapter.content} />
          </div>
        </ScrollArea>

        {/* Bottom Navigation */}
        <div className="bg-card border-t border-border px-8 py-4">
          <div className={cn(
            "max-w-4xl mx-auto flex items-center justify-between",
            sidebarCollapsed && "max-w-5xl"
          )}>
            <div>
              {hasPreviousChapter && (
                <Button
                  variant="outline"
                  onClick={goToPreviousChapter}
                  className="flex items-center gap-2"
                >
                  <ArrowLeftIcon className="w-4 h-4" />
                  Back
                </Button>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              {!isCompleted && (
                <Button
                  onClick={handleCompleteAndNext}
                  className="flex items-center gap-2"
                >
                  <CheckIcon className="w-4 h-4" />
                  Complete
                  {hasNextChapter && <span className="text-xs opacity-75">& Continue</span>}
                </Button>
              )}
              
              {isCompleted && hasNextChapter && (
                <Button
                  onClick={goToNextChapter}
                  className="flex items-center gap-2"
                >
                  Next Chapter
                  <ArrowRightIcon className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Demo Panel - only show if GIF is available */}
      <AnimatePresence>
        {hasDemoGif && (
          <MainDemo
            demoGifUrl={demoGifUrl}
            chapterTitle={chapter.title}
            isExpanded={demoExpanded}
            onToggleExpanded={setDemoExpanded}
            demoWidth={demoWidth}
            onWidthChange={setDemoWidth}
          />
        )}
      </AnimatePresence>
    </div>
  )
}