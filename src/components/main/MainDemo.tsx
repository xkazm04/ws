import React, { useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRightIcon, ArrowLeftIcon, GripVerticalIcon, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MainDemoProps {
  demoGifUrl: string
  chapterTitle: string
  isExpanded: boolean
  onToggleExpanded: (expanded: boolean) => void
  demoWidth: number
  onWidthChange: (width: number) => void
}

export function MainDemo({
  demoGifUrl,
  chapterTitle,
  isExpanded,
  onToggleExpanded,
  demoWidth,
  onWidthChange
}: MainDemoProps) {
  const [isResizing, setIsResizing] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [imageError, setImageError] = useState(false)
  const resizeRef = useRef<HTMLDivElement>(null)

  // Resize handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setIsResizing(true)
  }, [])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizing || !resizeRef.current) return

    const container = resizeRef.current.parentElement
    if (!container) return

    const containerRect = container.getBoundingClientRect()
    const mouseX = e.clientX - containerRect.left
    // Calculate width from the right side for better space utilization
    const newWidth = Math.max(25, Math.min(70, ((containerRect.width - mouseX) / containerRect.width) * 100))
    
    onWidthChange(newWidth)
  }, [isResizing, onWidthChange])

  const handleMouseUp = useCallback(() => {
    setIsResizing(false)
  }, [])

  // Add event listeners for resize
  React.useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = 'col-resize'
      document.body.style.userSelect = 'none'
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
        document.body.style.cursor = ''
        document.body.style.userSelect = ''
      }
    }
  }, [isResizing, handleMouseMove, handleMouseUp])

  const handleImageClick = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleModalClick = (e: React.MouseEvent) => {
    // Close modal when clicking on backdrop
    if (e.target === e.currentTarget) {
      handleCloseModal()
    }
  }

  const handleImageError = () => {
    setImageError(true)
  }

  if (!isExpanded) {
    return (
      <motion.div 
        className="fixed right-4 top-20 z-10"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 100, opacity: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 30,
          duration: 0.3 
        }}
      >
        <Button
          variant="outline"
          size="sm"
          onClick={() => onToggleExpanded(true)}
          className="shadow-lg bg-card/95 backdrop-blur-sm border border-border/50 hover:bg-card flex items-center gap-2 hover:scale-105 transition-transform duration-200"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span className="text-xs">Show Demo</span>
        </Button>
      </motion.div>
    )
  }

  return (
    <>
      <motion.div
        className="flex shrink-0"
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: "100%", opacity: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 30,
          duration: 0.4 
        }}
        style={{ width: `${demoWidth}%`, minWidth: '320px', maxWidth: '70%' }}
      >
        {/* Resize Handle */}
        <motion.div
          ref={resizeRef}
          className={cn(
            "w-1 bg-border hover:bg-primary/50 cursor-col-resize transition-colors flex items-center justify-center group shrink-0",
            isResizing && "bg-primary"
          )}
          onMouseDown={handleMouseDown}
          whileHover={{ backgroundColor: "hsl(var(--primary) / 0.5)" }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            whileHover={{ scale: 1.2 }}
            transition={{ duration: 0.2 }}
          >
            <GripVerticalIcon className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors" />
          </motion.div>
        </motion.div>

        {/* Demo Content - Fixed to right side */}
        <motion.div
          className="bg-card border-l border-border flex flex-col justify-start flex-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          <div className="bg-muted px-4 py-3 border-b border-border flex items-center justify-between">
            <h3 className="text-sm font-medium text-foreground">Demo Preview</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onToggleExpanded(false)}
              className="flex items-center gap-2 text-xs"
            >
              <ArrowRightIcon className="w-3 h-3" />
              Hide
            </Button>
          </div>
          
          <motion.div 
            className="flex-1 p-4 flex flex-col items-center justify-start bg-muted/20 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            {imageError ? (
              <motion.div 
                className="flex flex-col items-center justify-center h-32 bg-muted rounded-lg border border-border w-full"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-muted-foreground text-sm">Failed to load demo</span>
                <span className="text-muted-foreground text-xs mt-1 opacity-70">Check the GIF file</span>
              </motion.div>
            ) : (
              <motion.div 
                className="relative w-full cursor-pointer hover:opacity-90 transition-opacity rounded-lg overflow-hidden shadow-lg"
                onClick={handleImageClick}
                title="Click to enlarge"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Image
                  src={demoGifUrl}
                  alt={`${chapterTitle} demo`}
                  width={800}
                  height={600}
                  className="w-full h-auto object-contain"
                  onError={handleImageError}
                  priority
                  unoptimized // For GIFs to maintain animation
                />
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            onClick={handleModalClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div 
              className="relative max-w-[95vw] max-h-[95vh] overflow-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <motion.button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors duration-200"
                title="Close"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={24} />
              </motion.button>
              <Image
                src={demoGifUrl}
                alt={`${chapterTitle} demo (enlarged)`}
                width={1200}
                height={900}
                className="w-full h-auto rounded-lg shadow-2xl object-contain"
                style={{
                  maxWidth: '100%',
                  maxHeight: '95vh'
                }}
                unoptimized // For GIFs to maintain animation
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
} 