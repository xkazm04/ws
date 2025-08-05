import { useState, useMemo } from 'react'
import { MdCode, MdCheckbox, MdList, MdImage } from './md'
import { WorkshopRegistration } from './WorkshopRegistration'

interface MarkdownRendererProps {
  content: string
}

interface ParsedElement {
  type: 'header' | 'paragraph' | 'code' | 'list' | 'checkbox' | 'bold' | 'link' | 'inline-code' | 'aside' | 'divider' | 'image' | 'component'
  content: string
  level?: number
  language?: string
  checked?: boolean
  id?: string
  href?: string
  alt?: string
  componentName?: string
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const [checkboxStates, setCheckboxStates] = useState<Record<string, boolean>>({})
  const [animatingCheckboxes, setAnimatingCheckboxes] = useState<Set<string>>(new Set())

  const toggleCheckbox = (id: string) => {
    setCheckboxStates(prev => {
      const newState = !prev[id]
      
      // Add animation if becoming checked
      if (newState) {
        setAnimatingCheckboxes(current => new Set([...current, id]))
        setTimeout(() => {
          setAnimatingCheckboxes(current => {
            const newSet = new Set(current)
            newSet.delete(id)
            return newSet
          })
        }, 400)
      }
      
      return {
        ...prev,
        [id]: newState
      }
    })
  }

  const parsedElements = useMemo(() => {
    const lines = content.split('\n')
    const elements: ParsedElement[] = []
    let currentList: string[] = []
    let checkboxCounter = 0

    const flushList = () => {
      if (currentList.length > 0) {
        elements.push({
          type: 'list',
          content: currentList.join('\n')
        })
        currentList = []
      }
    }

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      if (!line) {
        flushList()
        continue
      }

      // Divider
      if (line === '---') {
        flushList()
        elements.push({
          type: 'divider',
          content: ''
        })
      }
      // Aside blocks (tip boxes)
      else if (line === '<aside>') {
        flushList()
        let asideContent = ''
        i++
        
        while (i < lines.length && lines[i].trim() !== '</aside>') {
          asideContent += lines[i] + '\n'
          i++
        }
        
        elements.push({
          type: 'aside',
          content: asideContent.trim()
        })
      }
      // Headers
      else if (line.startsWith('###')) {
        flushList()
        elements.push({
          type: 'header',
          level: 3,
          content: line.replace(/^### /, '').replace(/^\*\*(.*?)\*\*$/, '$1') // Remove bold markers from headers
        })
      } else if (line.startsWith('##')) {
        flushList()
        elements.push({
          type: 'header',
          level: 2,
          content: line.replace(/^## /, '').replace(/^\*\*(.*?)\*\*$/, '$1') // Remove bold markers from headers
        })
      } else if (line.startsWith('#')) {
        flushList()
        elements.push({
          type: 'header',
          level: 1,
          content: line.replace(/^# /, '').replace(/^\*\*(.*?)\*\*$/, '$1') // Remove bold markers from headers
        })
      }
      // Code blocks
      else if (line.startsWith('```')) {
        flushList()
        const language = line.replace('```', '') || 'javascript'
        let codeContent = ''
        i++
        
        while (i < lines.length && !lines[i].trim().startsWith('```')) {
          codeContent += lines[i] + '\n'
          i++
        }
        
        elements.push({
          type: 'code',
          language,
          content: codeContent.replace(/\n$/, '') // Remove trailing newline
        })
      }
      // Checkboxes
      else if (line.match(/^- \[(x| )\]/)) {
        flushList()
        const checked = line.includes('[x]')
        const text = line.replace(/^- \[(x| )\] /, '')
        const id = `checkbox-${checkboxCounter++}`
        
        elements.push({
          type: 'checkbox',
          content: text,
          checked,
          id
        })
      }
      // Regular list items
      else if (line.startsWith('- ')) {
        currentList.push(line.replace(/^- /, ''))
      }
      // Numbered list items
      else if (line.match(/^\d+\. /)) {
        currentList.push(line.replace(/^\d+\. /, ''))
      }
      // Images - standalone images on their own line (with optional whitespace)
      else if (line.match(/^\s*\[([^\]]*)\]\(([^)]+)\)\s*$/)) {
        flushList()
        const match = line.match(/^\s*\[([^\]]*)\]\(([^)]+)\)\s*$/)
        if (match) {
          elements.push({
            type: 'image',
            content: match[2].trim(), // URL
            alt: match[1].trim() // Alt text
          })
        }
      }
      // React components - <component>ComponentName</component>
      else if (line.match(/^\s*<component>([^<]+)<\/component>\s*$/)) {
        flushList()
        const match = line.match(/^\s*<component>([^<]+)<\/component>\s*$/)
        if (match) {
          elements.push({
            type: 'component',
            content: match[1].trim(),
            componentName: match[1].trim()
          })
        }
      }
      // Regular paragraphs
      else {
        flushList()
        elements.push({
          type: 'paragraph',
          content: line
        })
      }
    }
    
    flushList()
    return elements
  }, [content])



  const renderInlineContent = (text: string) => {
    // Process in order: bold first, then italic (since bold uses ** and italic uses *)
    // Bold text - match **text** and replace with <strong> without showing the asterisks
    let processed = text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
    
    // Italic text - Simple approach: replace single * that isn't preceded or followed by another *
    // Split by existing <strong> tags to avoid affecting already processed bold text
    const parts = processed.split(/(<strong[^>]*>.*?<\/strong>)/g)
    processed = parts.map(part => {
      if (part.includes('<strong')) {
        return part // Don't process parts that contain bold tags
      }
      return part.replace(/\*([^*\n]+?)\*/g, '<em class="italic">$1</em>')
    }).join('')
    
    // Inline code
    processed = processed.replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-muted text-sm font-mono">$1</code>')
    
    // Links
    processed = processed.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary hover:text-accent underline transition-colors" target="_blank" rel="noopener noreferrer">$1</a>')
    
    return <span dangerouslySetInnerHTML={{ __html: processed }} />
  }

  return (
    <div className="prose prose-gray max-w-none">
      {parsedElements.map((element, index) => {
        switch (element.type) {
          case 'header':
            const headerClasses = {
              1: 'text-3xl font-bold text-foreground mb-6 mt-0',
              2: 'text-2xl font-bold text-foreground mb-6 mt-10',
              3: 'text-xl font-semibold text-foreground mb-4 mt-8'
            }
            const HeaderElement = element.level === 1 ? 'h1' : element.level === 2 ? 'h2' : 'h3'
            return (
              <HeaderElement key={index} className={headerClasses[element.level as keyof typeof headerClasses]}>
                {element.content}
              </HeaderElement>
            )

          case 'code':
            return (
              <MdCode 
                key={index}
                content={element.content}
                language={element.language || 'javascript'}
                index={index}
              />
            )

          case 'checkbox':
            const isChecked = checkboxStates[element.id!] ?? element.checked
            const isAnimating = animatingCheckboxes.has(element.id!)
            return (
              <MdCheckbox
                key={index}
                content={element.content}
                checked={element.checked}
                id={element.id!}
                renderInlineContent={renderInlineContent}
                onToggle={toggleCheckbox}
                isChecked={isChecked}
                isAnimating={isAnimating}
              />
            )

          case 'list':
            return (
                          <MdList
              key={index}
              content={element.content}
              renderInlineContent={renderInlineContent}
            />
            )

          case 'aside':
            return (
              <div key={index} className="my-6 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                    <span className="text-blue-600 text-sm font-semibold">💡</span>
                  </div>
                  <div className="text-blue-800 space-y-2 flex-1">
                    {element.content.split('\n').map((line, lineIndex) => {
                      const trimmedLine = line.trim()
                      if (!trimmedLine) return null
                      
                      // Handle headers within aside blocks - remove the ### and ** formatting
                      if (trimmedLine.startsWith('###')) {
                        const headerText = trimmedLine.replace(/^### /, '').replace(/^\*\*(.*?)\*\*$/, '$1')
                        return (
                          <h4 key={lineIndex} className="font-semibold text-blue-900 text-lg mb-2 mt-1">
                            {headerText}
                          </h4>
                        )
                      }
                      
                      return (
                        <p key={lineIndex} className="leading-relaxed">
                          {renderInlineContent(trimmedLine)}
                        </p>
                      )
                    })}
                  </div>
                </div>
              </div>
            )

          case 'divider':
            return (
              <hr key={index} className="my-8 border-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
            )

          case 'image':
            return (
                          <MdImage 
              key={index}
              content={element.content}
              alt={element.alt}
            />
            )

          case 'component':
            // Render React components based on componentName
            switch (element.componentName) {
              case 'WorkshopRegistration':
                return <WorkshopRegistration key={index} />
              default:
                return (
                  <div key={index} className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600">Unknown component: {element.componentName}</p>
                  </div>
                )
            }

          case 'paragraph':
            return (
              <p key={index} className="text-foreground leading-relaxed mb-4">
                {renderInlineContent(element.content)}
              </p>
            )

          default:
            return null
        }
      })}
    </div>
  )
}