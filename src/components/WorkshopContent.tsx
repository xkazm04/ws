import { useState, useEffect } from 'react'
import { Sidebar } from './Sidebar'
import { MainContent } from './MainContent'
import { tutorialData } from '@/data/tutorialData'
import { UserProfileService } from '@/services/userProfileService'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { CopyIcon } from 'lucide-react'

// Helper function to flatten chapters from categories
const getAllChapters = () => {
  return tutorialData.categories.flatMap(category => category.chapters)
}

export function WorkshopContent() {
  const allChapters = getAllChapters()
  const [activeChapterId, setActiveChapterId] = useState(allChapters[0].id)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  
  // Track chapter progress with localStorage persistence
  const [chapterProgress, setChapterProgress] = useState<Record<string, boolean>>({})
  
  // Get user profile for personalized content
  const userProfile = UserProfileService.getUserProfile()

  // Load progress from localStorage on component mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('workshop-chapter-progress')
    if (savedProgress) {
      try {
        setChapterProgress(JSON.parse(savedProgress))
      } catch (error) {
        console.error('Error loading progress from localStorage:', error)
      }
    }
  }, [])

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('workshop-chapter-progress', JSON.stringify(chapterProgress))
  }, [chapterProgress])

  const toggleChapterProgress = (chapterId: string) => {
    setChapterProgress(prev => ({
      ...prev,
      [chapterId]: !prev[chapterId]
    }))
  }

  const activeChapter = allChapters.find(chapter => chapter.id === activeChapterId)
  
  const completedCount = Object.values(chapterProgress).filter(Boolean).length
  const totalCount = allChapters.length
  const progressPercentage = Math.round((completedCount / totalCount) * 100)

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast.success('Invitation link copied to clipboard!')
    } catch (err) {
      console.error('Failed to copy link', err)
      toast.error('Failed to copy link')
    }
  }

  // Create personalized tutorial data with user's invitation link if available
  const personalizedTutorial = userProfile ? {
    ...tutorialData,
    description: (
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">
          <span className="font-mono font-medium text-foreground">https://n8n-finance.groupondev.com/</span>
        </p>
        <p className="text-sm text-muted-foreground">
          Login: <span className="font-mono font-medium text-foreground">{userProfile.loginEmail}</span>
        </p>
      </div>
    )
  } : tutorialData

  return (
    <div className="flex h-full bg-gray-50">
      <Sidebar
        tutorial={personalizedTutorial}
        activeChapterId={activeChapterId}
        onChapterSelect={setActiveChapterId}
        chapterProgress={chapterProgress}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        progressPercentage={progressPercentage}
        completedCount={completedCount}
        totalCount={totalCount}
      />
      <MainContent
        chapter={activeChapter!}
        onToggleProgress={toggleChapterProgress}
        isCompleted={chapterProgress[activeChapterId] || false}
        sidebarCollapsed={sidebarCollapsed}
        onChapterSelect={setActiveChapterId}
      />
    </div>
  )
}